<template>
    <div>
        <div v-show="step == 0">

            <div>
                <span>Strength: </span>
                <span>{{ char.strength }}</span>
                <span class="stat_span" @click="changeStats('strength', '+')">+</span>
                <span class="stat_span" @click="changeStats('strength', '-')">-</span>
            </div>

            <div>
                <span>Dexterity: </span>
                <span>{{ char.dexterity }}</span>
                <span class="stat_span" @click="changeStats('dexterity', '+')">+</span>
                <span class="stat_span" @click="changeStats('dexterity', '-')">-</span>
            </div>
            <div>
                <span>Synth power: </span>
                <span>{{ char.synth_power }}</span>
                <span class="stat_span" @click="changeStats('synth_power', '+')">+</span>
                <span class="stat_span" @click="changeStats('synth_power', '-')">-</span>
            </div>

            <div style="margin-top: 20px;">
                Points to allocate: {{ char.xp }}
            </div>

            <div style="margin-top: 20px;">
                <span>Hit points: </span>
                <span>{{ char.hp }}</span>
            </div>
            <div>
                <span>Synth power: </span>
                <span>{{ char.sp }}</span>
            </div>
            <div style="margin-bottom: 20px;">
                <span>Armor class: </span>
                <span>{{ char.ac }}</span>
            </div>

            <div v-if="char.xp == 0" @click="$emit('setStep', 1)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 1">
            <div id="example-map-container" class="game-container"></div>
            <div id="example-console-container" class="game-container"></div>
        </div>
        <div v-if="step == 2">
            COMBAT
            <div @click="$emit('setStep', 1)" class="choice">{{ lang.continue }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['player', 'step'],
        data() {
            return {
                game: null,
                char: {
                    name: null,
                    xp: 6,
                    strength: 2,
                    dexterity: 2,
                    synth_power: 2,
                    hp: 6,
                    sp: 6,
                    ac: 2,
                    inventory: []
                }
            }
        },
        methods: {
            changeStats(stat, which) {
                if (which == '+' && this.char.xp > 0) {
                    this.char[stat]++
                    this.char.xp--
                }
                if (which == '-' && this.char.xp <= 6 && this.char[stat] > 2) {
                    this.char[stat]--
                    this.char.xp++
                }
                this.char.hp = this.char.strength * 3
                this.char.sp = this.char.synth_power * 3
                this.char.ac = this.char.dexterity
            },
            diceRoll(sides) {
                return Math.floor(Math.random() * sides) + 1
            }
        },
        mounted() {
            this.char.name = this.player.name
            this.char.inventory = this.player.inventory

            bus.$on('start_combat', () => {
                this.$emit('setStep', 2)
            })
            // create the game instance
            this.game = new RL.Game();
            var game = this.game

            // var mapData = [
            //     "#####################",
            //     "#.........#.........#",
            //     "#....Z....#....##...#",
            //     "#.........+....##...#",
            //     "#.........#.........#",
            //     "#.#..#..#.#.........#",
            //     "#.........#...####+##",
            //     "#.........#...#.....#",
            //     "#.........#...#.....#",
            //     "#.........#...#.....#",
            //     "#####################"
            // ];
            var mapData = [
                "############",
                "##.S..B#####",
                "##.S..B####",
                "##.....####",
                "##.S....D##",
                "#####..####",
                "#####V.####",
                "#####..####",
                "##....S...+",
                "##.S....#W+",
                "##.S....#W#",
                "#######.###",
                "##B......S#",
                "##B......S#",
                "##B......S#",
                "##B......S#",
                "###########"
            ];

            var mapCharToType = {
                '#': 'wall',
                '.': 'floor',
                '+': 'door',
                'S': 'table',
                'B': 'bar',
                'W': 'wc',
                'V': 'vyhadzovaci',
                'D': 'locked_door'
            };

            var entityCharToType = {
                'Z': 'zombie'
            };

            var keyBindings = {
                up: ['UP_ARROW', 'K', 'W'],
                down: ['DOWN_ARROW', 'J', 'S'],
                left: ['LEFT_ARROW', 'H', 'A'],
                right: ['RIGHT_ARROW', 'L', 'D'],
            };

            game.map.loadTilesFromArrayString(mapData, mapCharToType, 'floor');
            game.entityManager.loadFromArrayString(mapData, entityCharToType);

            // add some lights
            // game.lighting.set(3, 7, 255, 0, 0);
            // game.lighting.set(7, 7, 0, 0, 255);

            // generate and assign a map object (repaces empty default)
            game.setMapSize(game.map.width, game.map.height);

            // add input keybindings
            game.input.addBindings(keyBindings);

            // or just add by entity type
            //game.entityManager.add(5, 9, 'zombie');

            // set player starting position
            game.player.x = 6;
            game.player.y = 15;

            // make the view a little smaller
            game.renderer.resize(30, 20);

            // get existing DOM elements
            var mapContainerEl = document.getElementById('example-map-container');
            var consoleContainerEl = document.getElementById('example-console-container');

            // append elements created by the game to the DOM
            mapContainerEl.appendChild(game.renderer.canvas);
            consoleContainerEl.appendChild(game.console.el);

            game.renderer.layers = [
                new RL.RendererLayer(game, 'map', {
                    draw: false,
                    mergeWithPrevLayer: false
                }),
                new RL.RendererLayer(game, 'entity', {
                    draw: false,
                    mergeWithPrevLayer: true
                }),
                new RL.RendererLayer(game, 'lighting', {
                    draw: true,
                    mergeWithPrevLayer: false
                }),
                new RL.RendererLayer(game, 'fov', {
                    draw: true,
                    mergeWithPrevLayer: false
                }),
            ];

            game.console.log('The game starts.');
            // start the game
            game.start();

        }
    }
</script>

<style>
    .stat_span {
        padding-left: 10px;
        cursor: pointer;
        font-size: 25px;
    }
    .stat_span:hover {
        color: white;
    }
</style>