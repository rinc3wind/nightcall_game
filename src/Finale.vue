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
                },
                floor1: {
                    start: { x: 6, y: 15 },
                    layout: [
                        "############",
                        "##.S..B#####",
                        "##.S..B#####",
                        "##.....#####",
                        "##.S....D###",
                        "#####..#####",
                        "#####V.#####",
                        "#####..#####",
                        "##....S....+",
                        "##.S...#####",
                        "##.S.....W##",
                        "##.S.....W##",
                        "#######.####",
                        "##B......S##",
                        "##B......S##",
                        "##B......S##",
                        "##B......S##",
                        "############"
                    ],
                },
                floor2: {
                    start: { x: 0, y: 7 },
                    layout: [
                        "##########################",
                        "#W#W######################",
                        "#...........###BBBBBBBB###",
                        "##S########.###........###",
                        "#SSS#######.###.......S###",
                        "###########.###.......S###",
                        "###########.###........###",
                        "+.....................S###",
                        "##############.........###",
                        "##############S.......S###",
                        "##############.........###",
                        "##############S.......S###",
                        "##############.........###",
                        "##############.........###",
                        "##############.........###",
                        "##########......SSSSSSS###",
                        "##########....SSSSSSSSS###",
                        "##########################"
                    ]
                },
                mapCharToType: {
                    '#': 'wall',
                    '.': 'floor',
                    '+': 'door',
                    'S': 'table',
                    'B': 'bar',
                    'W': 'wc',
                    'V': 'vyhadzovaci',
                    'D': 'locked_door'
                },
                entityCharToType: {
                    'Z': 'zombie'
                },
                keyBindings: {
                    up: ['UP_ARROW', 'K', 'W'],
                    down: ['DOWN_ARROW', 'J', 'S'],
                    left: ['LEFT_ARROW', 'H', 'A'],
                    right: ['RIGHT_ARROW', 'L', 'D'],
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
            loadFloor(floor) {
                var game = this.game
                game.map.loadTilesFromArrayString(floor.layout, this.mapCharToType, 'floor');
                game.entityManager.loadFromArrayString(floor.layout, this.entityCharToType);
                game.setMapSize(game.map.width, game.map.height);
                game.input.addBindings(this.keyBindings);
                game.player.x = floor.start.x;
                game.player.y = floor.start.y;
                game.renderer.resize(30, 20);
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
                var mapContainerEl = document.getElementById('example-map-container');
                var consoleContainerEl = document.getElementById('example-console-container');
                mapContainerEl.appendChild(this.game.renderer.canvas);
                consoleContainerEl.appendChild(this.game.console.el);
                this.game.start();
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

            this.game = new RL.Game();
            this.loadFloor(this.floor1)
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