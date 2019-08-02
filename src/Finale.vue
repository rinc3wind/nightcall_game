<template>
    <div>
        <div v-show="step == 0">
            <p>Hned po prichode domov si vybehol do izby. Musis pockat, kym sa doma ukludni situacia, aby si sa vedel vysneakovat z domu bez toho, ze ta niekto zbada. Zaciatok party je sice uz o 20:00 ale to vies uz teraz, ze nedas. Ani tatko, ani mama ta urcite vecer do mesta nepustia. Nemaju tucha, ze len a len na tvojich pleciach lezi osud vsetkych casovych sfer. Krista boha. Pockas par hodin a okolo 11 nakuknes von z izby.</p>

            <p>Jemne ich pootvoris na malu skaru. Vsade tma a ticho. Vzduch je cisty. Pre istotu si vsak opat nasadis tvoju vernu krabicu a ides sa sneakovat. Keby nahodou. A zaroven sa mozes posledny krat citit jak Solid Snake.</p>
            <div @click="$emit('setStep', 1)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 1">
            <sneaking-game @win="$emit('setStep', 3)" @fail="$emit('setStep', 2)" :player="player" :speed="0.65" :reactionTime="700">
            </sneaking-game>
        </div>
        <div v-show="step == 2">
            <p>Vyjebes sa po schodoch jak po flaske borovicky. Toto nebolo moc smooth. Pre istotu nachvilu zalezies naspat do izby a nacuvas. Vzduch je cisty, nikoho si nezobudil. Ides to vyskusat znova.</p>
            <div @click="$emit('setStep', 1)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 3">
            <p>Stojis pred barakom. Vonku je chladna oktobrova Halloweenska noc. Tekvica uz dohorela. Civi do tmy jak bezdomovci na Bratislavskej vlakovej stanici. Nasadnes na BMXku. <span v-if="player.inventory.indexOf('walkman') != -1">Nastavis si opat walkmana. A pustis {{ player.song }}. </span>Zafuka vietor, zhlboka sa nadychnes a slapnes na pedal. Pedalujes na Ventursku do Re:Freshu. Citis sa jak Luke Skywalker, ked upaloval na X-Wingu zachranit jeho kamosov na Bespin. Namiesto Darth Vadera ta vsak caka nieco ovela lepsie. Dalsi Nightcall! Nemas na vyber kamosko, pridas a ficis jak uragan.</p>

            <p>Vies, ze Nightcall bez teba nema zmysel.</p>
            <div @click="$emit('setStep', 4)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 4">
            <p>Prichadzas na Ventursku. Kluckujes na bajku cez davy ozratych britskych turistov, sprostuckych futbalovych chuliganov a vychrtle trafo pipky s civavami pod pazuchami. Skoro to najebes do asi 2.5 metroveho bezkrkeho typka s asi najhorsimi kerkami co si kedy videl. Cez jeho pravy biceps ma obrovsku karikaturu fejsu nejakej starej zenskej, hore nad nou je comic sansovy napis &quot;Manka&quot;. Len tak tak stihnes stocit bajk a missnes Manku asi o 2 centimetre.</p>

            <p>Zaflekujes pred Re:Freshom, hodis bajk na zem a vstupis dnu.</p>

            <div @click="$emit('setStep', 100)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 100">
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

            <div v-if="char.xp == 0" @click="$emit('setStep', 101)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 101">
            <div id="map-floor1" class="game-container"></div>
            <div id="console-container" class="game-container"></div>
        </div>
        <div v-if="step == 102">
            <combat :char="char" :enemies_prop="enemies" @win="combatFinished(char)">
            </combat>
        </div>
    </div>
</template>

<script>
    import Combat from './Combat.vue'
    import SneakingGame from './SneakingGame.vue'

    export default {
        props: ['player', 'step'],
        components: {
            'combat': Combat,
            'sneaking-game': SneakingGame
        },
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
                    inventory: [],
                    weapon: {}
                },
                enemies: [],
                floor1: {
                    start: { x: 6, y: 15 },
                    layout: [
                        "####################################################################################",
                        "##.S..B####################################################W#W######################",
                        "##.S..B####################################################...........###BBBBBBBB###",
                        "##.....#####################################################S########.###........###",
                        "##.S....D##################################################SSS#######.###.......S###",
                        "#####..##############################################################.###.......S###",
                        "#####V.##############################################################.###........###",
                        "#####..###################################################......................S###",
                        "##........+▶############################################################.........###",
                        "##.S...#################################################################S.......S###",
                        "##.S.....W##############################################################.........###",
                        "##.S.....W##############################################################S.......S###",
                        "#######.################################################################.........###",
                        "##B......S##############################################################.........###",
                        "##B......S##############################################################.........###",
                        "##B......S##########################################################......SSSSSSS###",
                        "##B......S##########################################################....SSSSSSSSS###",
                        "####################################################################################"
                    ],
                },
                mapCharToType: {
                    '#': 'wall',
                    '.': 'floor',
                    '+': 'door',
                    'S': 'table',
                    'B': 'bar',
                    'W': 'wc',
                    'V': 'vyhadzovaci',
                    'D': 'locked_door',
                    '▶': 'exit'
                },
                entityCharToType: {
                    'Z': 'zombie'
                },
                keyBindings: {
                    up: ['UP_ARROW'],
                    down: ['DOWN_ARROW'],
                    left: ['LEFT_ARROW'],
                    right: ['RIGHT_ARROW']
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
            loadFloor(instance, floor) {
                instance.map.loadTilesFromArrayString(floor.layout, this.mapCharToType, 'floor');
                instance.entityManager.loadFromArrayString(floor.layout, this.entityCharToType);
                instance.setMapSize(instance.map.width, instance.map.height);
                instance.input.addBindings(this.keyBindings);
                instance.player.x = floor.start.x;
                instance.player.y = floor.start.y;
                instance.renderer.resize(30, 20);
                instance.renderer.layers = [
                    new RL.RendererLayer(instance, 'map', {
                        draw: false,
                        mergeWithPrevLayer: false
                    }),
                    new RL.RendererLayer(instance, 'entity', {
                        draw: false,
                        mergeWithPrevLayer: true
                    }),
                    new RL.RendererLayer(instance, 'lighting', {
                        draw: true,
                        mergeWithPrevLayer: false
                    }),
                    new RL.RendererLayer(instance, 'fov', {
                        draw: true,
                        mergeWithPrevLayer: false
                    }),
                ];

                instance.lighting.set(7, 16, 255, 252, 176);
                instance.lighting.set(77, 3, 255, 0, 255);
                instance.lighting.set(77, 14, 0, 208, 255);

                var mapContainerEl = document.getElementById('map-floor1');
                var consoleContainerEl = document.getElementById('console-container');
                mapContainerEl.appendChild(instance.renderer.canvas);
                consoleContainerEl.appendChild(instance.console.el);
                instance.player.wins = 0
                instance.player.character = this.char
                instance.start();
            },
            diceRoll(sides) {
                return Math.floor(Math.random() * sides) + 1
            },
            combatFinished(char) {
                this.game.player.character = char
                this.game.player.wins++
                this.$emit('setStep', 101)
            }
        },
        mounted() {
            this.char.name = this.player.name
            this.char.inventory = this.player.inventory

            if (this.player.inventory.indexOf('sekera') != -1) {
                this.char.weapon = {
                    name: 'sekera',
                    base_stat: 'strength',
                    dmg: 8
                }
            } else if (this.player.inventory.indexOf('bejzbolka') != -1) {
                this.char.weapon = {
                    name: 'bejzbolka',
                    base_stat: 'strength',
                    dmg: 6
                }
            } else if (this.player.inventory.indexOf('prak') != -1) {
                this.char.weapon = {
                    name: 'prak',
                    base_stat: 'dexterity',
                    dmg: 6
                }
            } else {
                this.char.weapon = {
                    name: 'unarmed',
                    base_stat: 'strength',
                    dmg: 4
                }
            }

            this.char = {
                ac:4,
                dexterity:4,
                max_hp: 120,
                hp:120,
                inventory: [],
                name:'grawlix',
                max_sp: 12,
                sp:12,
                strength:4,
                synth_power:4,
                weapon:{
                    name: 'sekera',
                    dmg: 8,
                    base_stat: 'strength'
                },
                status_effect: null,
                beers: 3
            }

            bus.$on('start_combat', (params) => {
                this.char = params.char
                this.enemies = params.enemies
                this.$emit('setStep', 102)
            })

            bus.$on('exit', (exit) => {
                this.game.renderer.setCenter(58, 7)
                this.game.player.moveTo(58, 7)
            })

            this.game = new RL.Game()
            this.loadFloor(this.game, this.floor1)
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
    canvas {
        border: solid 2px;
    }
    #map-floor1 {
        margin-left: -100px;
    }
    #map-floor2 {
        margin-left: -100px;
    }
</style>