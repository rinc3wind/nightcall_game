<template>
    <div id="app">
        <div v-if="isMobileBrowser">V tejto hre su minihry, ktore na mobile nedas kamo. Zapni si to na normalnom compe.</div>
        <div v-else>
            <div class="settings">
                <b>Moznosti</b><br><br>
                <table style="width:100%">
                    <tr class="setting" :class="{ 'disabled': disabled.new }" @click="newGame()">
                        <td><img class="menu-item-image" src="icons/new_game.jpg"></td>
                        <td>Nova hra</td>
                    </tr>
                    <tr class="setting" :class="{ 'disabled': disabled.save }" @click="saveProgress()">
                        <td><img class="menu-item-image" src="icons/save.jpg"></td>
                        <td>Ulozit hru</td>
                    </tr>
                    <tr class="setting" :class="{ 'disabled': disabled.load }" @click="loadProgress()">
                        <td><img class="menu-item-image" src="icons/load.jpg"></td>
                        <td>Nacitat hru</td>
                    </tr>
                    <!-- <tr class="setting" @click="showRadio = true">
                        <td><img class="menu-item-image" src="icons/sound.jpg"></td>
                        <td>Radio</td>
                    </tr> -->
                </table>
            </div>

            <div v-if="player.inventory.length > 0" class="inventory">
                <b>Tvoj inventar</b><br><br>

                <table style="width:100%">
                    <tr class="inventory-item" v-for="item in player.inventory" :key="item">
                        <td>
                            <img class="inventory-item-image" v-if="item=='walkman'" src="icons/walkman.jpg">
                            <img class="inventory-item-image" v-else-if="item=='cigarety & zapalovac'" src="icons/cigi.jpg">
                            <img class="inventory-item-image" v-else-if="item=='slanina'" src="icons/bacon.jpg">
                            <img class="inventory-item-image" v-else-if="item=='Colgate Herbal'" src="icons/pasta.jpg">
                            <img class="inventory-item-image" v-else-if="item=='3 litrova Arcade Watch zbrnda'" src="icons/aw_pitie.jpg">
                            <img class="inventory-item-image" v-else-if="item=='bejzbolka'" src="icons/bejsbolka.jpg">
                            <img class="inventory-item-image" v-else-if="item=='borovicka'" src="icons/borovicka.jpg">
                            <img class="inventory-item-image" v-else-if="item=='70 halierov'" src="icons/centy.jpg">
                            <img class="inventory-item-image" v-else-if="item=='ocurana cigareta'" src="icons/ciga4.jpg">
                            <img class="inventory-item-image" v-else-if="item=='flaska coca coly'" src="icons/cola.jpg">
                            <img class="inventory-item-image" v-else-if="item=='sojovy jogurt'" src="icons/jogurt.jpg">
                            <img class="inventory-item-image" v-else-if="item=='3 litrova priesvitna Kobra Gang kokotina'" src="icons/kobra_pitie.jpg">
                            <img class="inventory-item-image" v-else-if="item=='kartonova krabica'" src="icons/krabica.jpg">
                            <img class="inventory-item-image" v-else-if="item=='mapa'" src="icons/mapa.jpg">
                            <img class="inventory-item-image" v-else-if="item=='3 litrova Nightcall Cola'" src="icons/nc_pitie.jpg">
                            <img class="inventory-item-image" v-else-if="item=='parok'" src="icons/parek.jpg">
                            <img class="inventory-item-image" v-else-if="item=='prak'" src="icons/prak.jpg">
                            <img class="inventory-item-image" v-else-if="item=='sekera'" src="icons/sekera.jpg">
                            <img class="inventory-item-image" v-else-if="item=='flasa vodky'" src="icons/vodka.jpg">
                            <img class="inventory-item-image" v-else-if="item=='Riflova bunda'" src="icons/riflovka1.jpg">
                            <img class="inventory-item-image" v-else-if="item=='kahance'" src="icons/kahance.jpg">
                            <img class="inventory-item-image" v-else-if="item=='zapalky'" src="icons/zapalky.jpg">
                            <img class="inventory-item-image" v-else-if="item=='tricko Rush'" src="icons/tricko.jpg">
                            <img class="inventory-item-image" v-else-if="item=='Jedi-ska roba'" src="icons/jedi_roba.jpg">
                            <img class="inventory-item-image" v-else-if="item=='Arturia JUP-8 V'" src="icons/syntak.jpg">
                            <img class="inventory-item-image" v-else src="icons/vodka.jpg">
                        </td>
                        <td class="choice" @click="showRadio = true" v-if="item == 'walkman'">{{ item }}</td>
                        <td v-else>{{ item }}</td>
                    </tr>
                </table>
            </div>

            <div class="note" v-if="note != null">
                <div class="note_content">
                    <div style="margin-bottom: 50px;">
                        {{ note }}
                    </div>
                    <div @click="note = null" class="choice" style="text-align: center;">
                        {{ lang.continue }}
                    </div>
                </div>
            </div>

            <radio v-show="showRadio == true" @hide="showRadio = false"></radio>

            <character-creation
                v-if="chapter == 0"
                :player="player"
                :step="step"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </character-creation>

            <chapter1
                v-if="chapter == 1"
                :player="player"
                :step="step"
                @setDisabled="setDisabled($event)"
                @note="note = $event"
                @pickupItem="pickupItem($event)"
                @removeItem="removeItem($event)"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </chapter1>

            <chapter2
                v-if="chapter == 2"
                :player="player"
                :step="step"
                @setDisabled="setDisabled($event)"
                @note="note = $event"
                @pickupItem="pickupItem($event)"
                @removeItem="removeItem($event)"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </chapter2>

            <chapter3
                v-if="chapter == 3"
                :player="player"
                :step="step"
                @setDisabled="setDisabled($event)"
                @note="note = $event"
                @pickupItem="pickupItem($event)"
                @removeItem="removeItem($event)"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </chapter3>

            <chapter4
                v-if="chapter == 4"
                :player="player"
                :step="step"
                @setDisabled="setDisabled($event)"
                @note="note = $event"
                @pickupItem="pickupItem($event)"
                @removeItem="removeItem($event)"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </chapter4>

            <chapter5
                v-if="chapter == 5"
                :player="player"
                :step="step"
                @setDisabled="setDisabled($event)"
                @note="note = $event"
                @pickupItem="pickupItem($event)"
                @removeItem="removeItem($event)"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </chapter5>

            <finale
                v-if="chapter == 6"
                :note="note"
                :player="player"
                :step="step"
                :game_loaded="game_loaded"
                @mounted="game_loaded = false"
                @setDisabled="setDisabled($event)"
                @note="note = $event"
                @pickupItem="pickupItem($event)"
                @removeItem="removeItem($event)"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </finale>

            <credits
                v-if="chapter == 'credits'"
                :player="player"
                :step="step"
                @note="note = $event"
                @setStep="step = $event"
                @setChapter="chapter = $event">
            </credits>
        </div>
        <!-- <div v-if="page_ready == false" class="loading">
                NACITAVAM
            </div> -->
    </div>
</template>

<script>

    import CharacterCreation from './CharacterCreation.vue'
    import Chapter1 from './Chapter1.vue'
    import Chapter2 from './Chapter2.vue'
    import Chapter3 from './Chapter3.vue'
    import Chapter4 from './Chapter4.vue'
    import Chapter5 from './Chapter5.vue'
    import Finale from './Finale.vue'
    import Credits from './Credits.vue'
    import Radio from './Radio.vue'

    export default {
        name: 'app',
        components: {
            'character-creation': CharacterCreation,
            'chapter1': Chapter1,
            'chapter2': Chapter2,
            'chapter3': Chapter3,
            'chapter4': Chapter4,
            'chapter5': Chapter5,
            'finale'  : Finale,
            'credits' : Credits,
            'radio' : Radio
        },
        data() {
            return {
                game_loaded: false,
                showRadio: false,
                page_ready: false,
                player: {
                    name: null,
                    family_status: null,
                    family_status_m: null,
                    family_status_o: null,
                    song: null,
                    inventory: [],
                    finished_chapters: [],
                    states: [],
                    cheats_enabled: false,
                    char: {
                        name: null,
                        xp: 6,
                        strength: 2,
                        dexterity: 2,
                        synth_power: 2,
                        hp: 6,
                        sp: 6,
                        ac: 2,
                        max_hp: 6,
                        max_sp: 6,
                        inventory: [],
                        beers: 0,
                        status_effect: null,
                        weapon: {},
                        kills: []
                    }
                },
                chapter: 0,
                step: 0,
                note: null,
                audio_player: null,
                disabled: {
                    save: false,
                    load: false,
                    new: false
                },
                useItem: false
            }
        },
        computed: {
            isMobileBrowser: function() {
                if (typeof window.orientation !== 'undefined') return true
                else return false
            }
        },
        mounted() {
            //var self = this
            this.audio_player = document.getElementById('audio_player')
            document.querySelector('#app').style.display = 'block'
            bus.$on('Combat/useItem', () => {
                this.useItem = true
            })
            // setTimeout(() => {
            //     this.openFullscreen(document.querySelector('html'))
            // }, 2000)
        },
        methods: {
            pickupItem(data) {
                if (data.item) this.player.inventory.push(data.item)
                else if (data.items) {
                    data.items.forEach(item => {
                        this.player.inventory.push(item)
                    })
                }
                if (data.note != null) this.note = data.note
            },
            removeItem(item) {
                var index = this.player.inventory.indexOf(item)
                if (index != -1) this.player.inventory.splice(index, 1)
            },
            saveProgress() {
                if (this.disabled.save == true) return
                localStorage.setItem('player', JSON.stringify(this.player))
                localStorage.setItem('chapter', this.chapter)
                localStorage.setItem('step', this.step)
                localStorage.setItem('finished_chapters', this.finished_chapters)
                localStorage.setItem('states', this.states)
                this.note = 'Hra ulozena'
            },
            loadProgress() {
                if (this.disabled.load == true) return
                if (localStorage.player && localStorage.step && localStorage.chapter) {
                    this.player = JSON.parse(localStorage.player)
                    this.step = parseFloat(localStorage.step)
                    this.chapter = localStorage.chapter
                    this.finished_chapters = localStorage.finished_chapters
                    this.states = localStorage.states
                    this.note = 'Hra nacitana'
                    this.setDisabled({
                        new: false,
                        load: false,
                        save: false
                    })
                    bus.$emit('App/GameLoaded')
                    this.game_loaded = true
                } else {
                    this.note = 'Nie je ulozena ziadna pozicia'
                }
            },
            newGame() {
                if (this.disabled.new == true) return
                this.player = {
                    name: null,
                    family_status: null,
                    family_status_m: null,
                    family_status_o: null,
                    song: null,
                    inventory: [],
                    finished_chapters: [],
                    states: [],
                    char: {
                        name: null,
                        xp: 6,
                        strength: 2,
                        dexterity: 2,
                        synth_power: 2,
                        hp: 6,
                        sp: 6,
                        ac: 2,
                        max_hp: 6,
                        max_sp: 6,
                        inventory: [],
                        beers: 0,
                        status_effect: null,
                        weapon: {},
                        kills: []
                    }
                },
                this.chapter = 0
                this.step = 0
                this.setDisabled({
                    new: false,
                    load: false,
                    save: false
                })
                setTimeout(() => {
                    document.querySelector('input').focus()
                }, 100)
            },
            setDisabled(items) {
                this.disabled = items
            },
            useItemAction(item) {
                if (this.useItem == true) {
                    bus.$emit('App/useItem', item)
                    this.useItem = false
                }
            },
            openFullscreen(element) {
                var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

                if (requestMethod) { // Native full screen.
                    requestMethod.call(element);
                } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript !== null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            }
        }
    }
</script>

<style>
    @font-face {
        font-family: pixel_font;
        src: url(assets/pixel.ttf);
    }

    html {
        background: url(assets/grain.jpg) no-repeat center center fixed;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        height: 100%;
    }

    #app {
        width: 660px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 60px;
        text-align: justify;
        font-family: pixel_font;
        font-size: 18px;
        color: greenyellow;
        overflow-wrap: break-word;
    }

    input {
        width: 100%;
        background: black;
        color: greenyellow;
        font-family: pixel_font;
        font-size: 18px;
    }

    .choice {
        font-weight: bold;
        cursor: pointer;
        color: white;
        padding: 5px;
    }
    .choice:hover {
        background-color: white;
        color: black;
    }

    .inventory {
        position: absolute;
        width: 300px;
        left: 10px;
    }

    .settings {
        position: absolute;
        right: 10px;
    }

    .note {
        position: fixed;
        z-index: 1001;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
    }

    .note_content {
        margin: 15% auto;
        padding: 20px;
        border: 1px solid greenyellow;
        width: 30%;
        background-color: rgba(0, 0, 0, 0.8);

    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: pixel_font;
        font-size: 18px;
        color: greenyellow;
        margin-top: 20%;
    }

    .setting {
        cursor: pointer;
    }
    .setting:hover {
        color: white;
    }
    .disabled {
        color: grey;
        cursor: not-allowed;
    }
    .inventory-item {
        display: block;
        width: 100%;
        /* height: 30px; */
        margin-bottom: 5px;
    }
    .inventory-item-image {
        /* float: left; */
    }
    .inventory-item-text {
        /* float: left; */
        padding-top: 7px;
        padding-left: 9px;
    }
    .active-item {
        cursor: pointer;
    }
    .active-item:hover {
        background-color: white;
        color: black;
    }
</style>