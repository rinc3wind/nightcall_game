<template>
    <div>
        <div v-show="step == 0">
            <p>Hned po prichode domov si vybehol do izby. Musis pockat, kym sa doma ukludni situacia, aby si sa vedel vysneakovat z domu bez toho, ze ta niekto zbada. Zaciatok party je sice uz o 20:00 ale to vies uz teraz, ze nedas. Ani tatko, ani mama ta urcite vecer do mesta nepustia. Nemaju tucha, ze len a len na tvojich pleciach lezi osud vsetkych casovych sfer. Krista boha. Pockas par hodin a okolo 11 nakuknes von z izby.</p>

            <p>Jemne ich pootvoris na malu skaru. Vsade tma a ticho. Vzduch je cisty. Pre istotu si vsak opat nasadis tvoju vernu krabicu a ides sa sneakovat. Keby nahodou. A zaroven sa mozes posledny krat citit jak Solid Snake.</p>
            <div @click="$emit('setStep', 1); disableMenu(true)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 1">
            <sneaking-game @win="$emit('setStep', 3); disableMenu(false)" @fail="$emit('setStep', 2); disableMenu(false)" :player="player" :speed="0.65" :reactionTime="700">
            </sneaking-game>
        </div>
        <div v-show="step == 2">
            <p>Vyjebes sa po schodoch jak po flaske borovicky. Toto nebolo moc smooth. Pre istotu nachvilu zalezies naspat do izby a nacuvas. Vzduch je cisty, nikoho si nezobudil. Ides to vyskusat znova.</p>
            <div @click="$emit('setStep', 1); disableMenu(true)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 3">
            <p>Stojis pred barakom. Vonku je chladna oktobrova Halloweenska noc. Tekvica uz dohorela. Civi do tmy jak bezdomovci na Bratislavskej vlakovej stanici. Nasadnes na BMXku. <span v-if="player.inventory.indexOf('walkman') != -1">Nastavis si opat walkmana. A pustis {{ player.song }}. </span>Zafuka vietor, zhlboka sa nadychnes a slapnes na pedal. Pedalujes na Ventursku do Re:Freshu. Citis sa jak Luke Skywalker, ked upaloval na X-Wingu zachranit jeho kamosov na Bespin. Namiesto Darth Vadera ta vsak caka nieco ovela lepsie. Dalsi Nightcall! Nemas na vyber kamosko, pridas a ficis jak uragan.</p>

            <p>Vies, ze Nightcall bez teba nema zmysel.</p>
            <div class="choice" @click="showMap()">Pozri do mapy.</div>
        </div>
        <div v-show="step == 4">
            <p>Prichadzas na Ventursku. Kluckujes na bajku cez davy ozratych britskych turistov, sprostuckych futbalovych chuliganov a vychrtle trafo pipky s civavami pod pazuchami. Skoro to najebes do asi 2.5 metroveho bezkrkeho typka s asi najhorsimi kerkami co si kedy videl. Cez jeho pravy biceps ma obrovsku karikaturu fejsu nejakej starej zenskej, hore nad nou je comic sansovy napis &quot;Manka&quot;. Len tak tak stihnes stocit bajk a missnes Manku asi o 2 centimetre.</p>

            <p>Zaflekujes pred Re:Freshom, hodis bajk na zem a vstupis dnu.</p>

            <div @click="$emit('setStep', 100)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 100">
            <div>
                <span>Strength: </span>
                <span>{{ player.char.strength }}</span>
                <span class="stat_span" @click="changeStats('strength', '+')">+</span>
                <span class="stat_span" @click="changeStats('strength', '-')">-</span>
            </div>

            <div>
                <span>Dexterity: </span>
                <span>{{ player.char.dexterity }}</span>
                <span class="stat_span" @click="changeStats('dexterity', '+')">+</span>
                <span class="stat_span" @click="changeStats('dexterity', '-')">-</span>
            </div>
            <div>
                <span>Synth power: </span>
                <span>{{ player.char.synth_power }}</span>
                <span class="stat_span" @click="changeStats('synth_power', '+')">+</span>
                <span class="stat_span" @click="changeStats('synth_power', '-')">-</span>
            </div>

            <div style="margin-top: 20px;">
                Points to allocate: {{ player.char.xp }}
            </div>

            <div style="margin-top: 20px;">
                <span>Hit points: </span>
                <span>{{ player.char.hp }}</span>
            </div>
            <div>
                <span>Synth power: </span>
                <span>{{ player.char.sp }}</span>
            </div>
            <div style="margin-bottom: 20px;">
                <span>Armor class: </span>
                <span>{{ player.char.ac }}</span>
            </div>

            <div v-if="player.char.xp == 0" @click="$emit('setStep', 101); generateCharacter(); startGame()" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-show="step == 101" id="outer-game-container">
            <div id="map-floor1" class="game-container"></div>
            <!-- <div id="console-container" class="game-container"></div> -->
            <div>HP: {{ player.char.hp }} / {{ player.char.max_hp }}</div>
            <div>SP: {{ player.char.sp }} / {{ player.char.max_sp }}</div>
            <div>Weapon: {{ player.char.weapon.name }}</div>
            <div>Beers: {{ player.char.beers }}</div>
        </div>
        <div v-if="step == 102">
            <combat :char="player.char" :enemies_prop="enemies" @win="combatFinished(player.char)" @fail="youDied" @gameWon="gameWon">
            </combat>
        </div>
        <div v-if="step == 103">
            <div id="you-died" class="choice" @click="refreshPage">YOU DIED</div>
        </div>
        <div v-if="step == 104">
            <div v-if="player.char.beers <= 0">
                Vidis pred sebou bar. Nemas vsak ziadne penaze. Ked vsak barman Szaki zbada, ze ti vytrca z vacku syntak, nacapuje ti pivecko for free.
                <div @click="$emit('setStep', 101); player.char.beers++" class="choice">{{ lang.continue }}</div>
            </div>
            <div v-else>
                Mozes vymenit item z inventara za pivo. Momentalne mas pri sebe {{ player.char.beers }}.
                <div v-for="item in inventoryWithoutMap" :key="item" class="choice" @click="player.char.beers++; $emit('removeItem', item)">
                    {{ item }}
                </div>
                <div style="margin-top: 50px;" @click="$emit('setStep', 101)" class="choice">{{ lang.continue }}</div>
            </div>
        </div>
        <div v-if="step == 105">
            <p>&quot;Kamosko. Vidime, ze nemas ani na vstupne podla toho ako vyzeras. Mame vsak pre teba exkluzivnu ponuku. Daj kolko chces, ak mas penaze kludne daj penaze, ak ne. Daj neco za barter. Kludne aj parek alebo slaninu.&quot;</p>
            <div v-for="item in player.inventory" :key="item" @click="$emit('setStep', 101); $emit('removeItem', item);" class="choice">{{ item }}</div>
            <!-- <div @click="$emit('setStep', 101)" class="choice">{{ lang.continue }}</div> -->
        </div>
        <div v-if="step == 106">
            <p>Po tom co si vyjebal Kavinskeho, bol chudak z toho tak strasne v prdeli, ze pustil Wild Boys od Duran Duran. Necakal si na nic. Schmatol si prve pivo, ktore si videl v dosahu. Cas sa spomalil. Citis sa jak Neo v Matrixe. Vyhodis pohar do vzduchu. Spenene kvapky letia vzduchom a ty skocis rovno do ich cesty.</p>

            <p>Wsssssplash!</p>

            <p>Zareves na cele pluca &quot;NIGHTCALL DO PICEEEEEEE!!!&quot;</p>

            <p>3000 hromov zaduni vzduchom, ktory voni ako dymostroj a cigaretovy dym. Zrazu sa pred tebou zhmotni Arnold Schwarzenegger v malych cervenych slipkach.</p>

            <p>&quot;{{ player.name }}! Dal si to. Cely cas som ti veril. To ja som pravy hlas a duch Nightcallu.&quot;</p>

            <p>Napne biceps.</p>

            <p>&quot;Gratulujem. Vratil si vsetky casove sfery doporiadku. Vidime sa na party. Nezabudni na seba zajebat ten najlepsi kostym co mas doma. A ked nahodou ziaden nemas, stale mozes ist v podobnom outfite ako ja dnes.&quot;</p>

            <p>Zmurkne na teba.</p>

            <p>Zrazu si uvedomis, ze znova sedis pred pocitacom vo svojej izbe. Vsetko sa vratilo do normalu. Zdanlivo. Stale vsak v hlbke kosti citis, ze Halloweensky Nightcall nemozes vynechat. Vidime sa kamosko! Ak sa ti hra pacila, urcite nam o tom napis, lebo Nightcall neni len partia sockarov co spravila tuto trapnu hru. Nightcall je kazdy jeden z vas co chodi na akcie. Nightcall si ty! Nighcall do pice!</p>

            <p>31 oktobra, Re:Fresh Club na Venturskej, 20.00</p>
            <p>Kod - {{ code }}</p>
            <div @click="$emit('setStep', 0); $emit('setChapter', 'credits')" class="choice">{{ lang.continue }}</div>
        </div>
    </div>
</template>

<script>
    import Combat from './Combat.vue'
    import SneakingGame from './SneakingGame.vue'

    export default {
        props: ['player', 'step', 'note', 'game_loaded'],
        components: {
            'combat': Combat,
            'sneaking-game': SneakingGame
        },
        data() {
            return {
                code: null,
                gameWonTrigger: false,
                game: null,
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
                        "#####..##############################################################.###........###",
                        "#####..###################################################......................S###",
                        "##.......V+▶############################################################.........###",
                        "##.S...#################################################################S.......S###",
                        "##.S.....W##############################################################.........###",
                        "##.S.....W##############################################################S.......S###",
                        "#######.################################################################.........###",
                        "##B......S##############################################################.........###",
                        "##B......S##############################################################.....K...###",
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
                    '▶': 'exit',
                    'K': 'kavinsky'
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
            refreshPage() {
                location.reload()
            },
            showMap() {
                bus.$emit('openMap')
            },
            generateCode() {
                var result = ''
                var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

                for ( var i = 0; i < 4; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length))
                }
                result += '-'
                for ( var i = 0; i < 4; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length))
                }
                result += '-'
                for ( var i = 0; i < 4; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * characters.length))
                }
                return result
            },
            sendCode() {
                var name = this.player.name
                var code = this.generateCode()
                this.code = code
                var xmlHttp = new XMLHttpRequest()
                xmlHttp.open('GET', 'http://nightcall.sk/text_adventure/sendmail.php?name='+name+'&code='+code, false)
                xmlHttp.send(null)
                return xmlHttp.responseText
            },
            generateCharacter() {
                this.player.char.max_hp = this.player.char.hp
                this.player.char.max_sp = this.player.char.sp
                this.player.char.name = this.player.name
                this.player.char.inventory = this.player.inventory

                if (this.player.inventory.indexOf('sekera') != -1) {
                    this.player.char.weapon = {
                        name: 'sekera',
                        base_stat: 'strength',
                        dmg: 8
                    }
                } else if (this.player.inventory.indexOf('bejzbolka') != -1) {
                    this.player.char.weapon = {
                        name: 'bejzbolka',
                        base_stat: 'strength',
                        dmg: 6
                    }
                } else if (this.player.inventory.indexOf('prak') != -1) {
                    this.player.char.weapon = {
                        name: 'prak',
                        base_stat: 'dexterity',
                        dmg: 6
                    }
                } else {
                    this.player.char.weapon = {
                        name: 'unarmed',
                        base_stat: 'strength',
                        dmg: 4
                    }
                }
            },
            startGame() {
                if (this.game != null) return
                var count = 0
                window.addEventListener('keydown', (e) => {
                    if (this.note != null) {
                        count++
                        if (count == 2) {
                            this.$emit('note', null)
                            count = 0
                        }
                    }

                    this.player.char.x = this.game.player.x
                    this.player.char.y = this.game.player.y
                })
                this.game = new RL.Game()
                this.loadFloor(this.game, this.floor1)
            },
            changeStats(stat, which) {
                if (which == '+' && this.player.char.xp > 0) {
                    this.player.char[stat]++
                    this.player.char.xp--
                }
                if (which == '-' && this.player.char.xp <= 6 && this.player.char[stat] > 2) {
                    this.player.char[stat]--
                    this.player.char.xp++
                }
                this.player.char.hp = this.player.char.strength * 5
                this.player.char.sp = this.player.char.synth_power * 5
                this.player.char.ac = this.player.char.dexterity
            },
            setLights(instance) {
                instance.lighting.set(7, 16, 255, 252, 176)
                instance.lighting.set(77, 3, 255, 0, 255)
                instance.lighting.set(80, 14, 0, 208, 255)
                instance.lighting.set(74, 14, 0, 208, 255)

                instance.lighting.set(3, 13, 252, 169, 3)
                instance.lighting.set(3, 16, 252, 169, 3)
                instance.lighting.set(9, 8, 252, 169, 3)
                instance.lighting.set(5, 7, 252, 169, 3)
                instance.lighting.set(5, 1, 252, 169, 3)

                instance.lighting.set(58, 7, 252, 169, 3)
                instance.lighting.set(69, 2, 252, 169, 3)
                instance.lighting.set(60, 2, 252, 169, 3)
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
                this.setLights(instance)
                var mapContainerEl = document.getElementById('map-floor1');
                //var consoleContainerEl = document.getElementById('console-container');
                mapContainerEl.appendChild(instance.renderer.canvas);
                //consoleContainerEl.appendChild(instance.console.el);
                instance.player.wins = 0
                instance.player.character = this.player.char
                instance.start();
            },
            diceRoll(sides) {
                return Math.floor(Math.random() * sides) + 1
            },
            combatFinished(char) {
                this.game.player.character = char
                this.game.player.wins++
                this.player.char.wins = this.game.player.wins

                if (this.gameWonTrigger == true) {
                    this.$emit('setStep', 106)
                    this.sendCode()
                } else {
                    this.$emit('setStep', 101)
                }
                this.disableMenu(false)
            },
            youDied() {
                this.$emit('setStep', 103)
            },
            gameWon() {
                this.gameWonTrigger = true
            },
            disableMenu(value) {
                this.$emit('setDisabled', {
                    new: value,
                    save: value,
                    load: value
                })
            }
        },
        computed: {
            inventoryWithoutMap: function() {
                return this.player.inventory.filter(item => {
                    return item != 'mapa'
                })
            }
        },
        mounted() {
            if (this.player.cheats_enabled == true) {
                this.player.char.xp = 30
            }

            bus.$on('map/clicked/6', (destination) => {
                if (destination == 'refresh') {
                    this.$emit('setStep', 4)
                    bus.$emit('closeMap')
                } else {
                    bus.$emit('map/changeLabel', 'To uz nema zmysel, kamosko.')
                }
            })

            bus.$on('start_combat', (params) => {
                this.player.char = params.char
                this.enemies = params.enemies
                this.disableMenu(true)
                this.$emit('setStep', 102)
            })

            bus.$on('start_combat_boss', (params) => {
                this.player.char = params.char
                var enemy_list = ['Computerboy', 'Synthmage', 'Grawlix', 'Thrivefool', 'Daniel Jackson', 'Vektoroskop']
                this.player.char.kills.forEach(kill => {
                    if (enemy_list.indexOf(kill) != -1) enemy_list.splice(enemy_list.indexOf(kill), 1)
                })
                this.enemies = [enemy_list[this.diceRoll(enemy_list.length) - 1]]
                this.disableMenu(true)
                this.$emit('setStep', 102)
            })

            bus.$on('exit', (exit) => {
                this.game.renderer.setCenter(58, 7)
                this.game.player.moveTo(58, 7)
            })
            bus.$on('note', (text) => {
                this.$emit('note', text)
            })
            bus.$on('dialogue', (value) => {
                if (value == 'bar') this.$emit('setStep', 104)
                else if (value == 'vyhadzovac') this.$emit('setStep', 105)
            })

            if (this.game_loaded == true && this.step == 101) {
                this.startGame()
                this.game.player.character = this.player.char
                this.game.player.wins = this.player.char.wins ? this.player.char.wins : 0
                if (this.player.char.x && this.player.char.y) {
                    this.game.renderer.setCenter(this.player.char.x, this.player.char.y)
                    this.game.player.moveTo(this.player.char.x, this.player.char.y)
                }
            }
            this.$emit('mounted')

            bus.$on('App/GameLoaded', () => {
                if (this.step == 101) {
                    setTimeout(() => {
                        this.startGame()
                        this.game.player.character = this.player.char
                        this.game.player.wins = this.player.char.wins ? this.player.char.wins : 0
                        if (this.player.char.x && this.player.char.y) {
                            this.game.renderer.setCenter(this.player.char.x, this.player.char.y)
                            this.game.player.moveTo(this.player.char.x, this.player.char.y)
                        }
                    }, 10)
                }
            })
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
        /* margin-left: -100px; */
    }
    #you-died {
        font-size: 80px;
        position: absolute;
        top: 40%;
        left: 37%;
    }
    canvas {
        width: 95%;
    }
    #outer-game-container {
        position: fixed;
    }
</style>