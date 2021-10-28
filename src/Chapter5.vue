<template>
    <div id="chapter5-container">
        <div v-if="step == 0">
            <p>18:17<br>Bratislava<br>Tvoj Barak</p>

            <p>Ked zaparkujes BMXku pred domov, vonku je uz riadna tma. Vsimnes si fajnovu vyrezanu tekvicu, v ktorej niekto zapalil sviecku. Skeri sa na teba jak Jakubec ked cape penisom po fejse dochodkynam. Fotrov cierny Pontiac je uz zaparkovany pred domom. Otvoris dvere a vojdes do kuchyne. Mama s tatkom uz su obleceni a nachystani na cintorin trip.</p>

            <p>Tatko sa hned na teba otoci.</p>

            <p>&quot;{{ player.name }}, konecne si doma. Kde sa suchces. Uz tu na teba chvilu cakame. Vyrazame na cintorin. Sup sup. Skoc sa hore do izby prezliect, si cely/-a nejaky/-a spinavy/-a.&quot;</p>

            <p>&quot;Dobre. Idem.&quot;</p>

            <p>Vyjdes hore na poschodie. Prejdes po horcicovom koberci a vojdes do izby. Stojis pred satnikom. Co si oblecies?</p>

            <div @click="$emit('setStep', 1); $emit('pickupItem', {items: ['Jedi-ska roba', 'kahance', 'zapalky']})" class="choice">Jedisku robu.</div>
            <div @click="$emit('setStep', 1); $emit('pickupItem', {items: ['Riflova bunda', 'tricko Rush', 'kahance', 'zapalky']});" class="choice">Riflovku a tricko Rush.</div>
            <div @click="$emit('setStep', 1)" class="choice">Vyzlecies sa do spodneho pradla a na brucho si namalujes s centrofixkou cicinu.</div>
        </div>
        <div v-if="step == 1">
            <div v-if="player.inventory.indexOf('Jedi-ska roba') == -1 && player.inventory.indexOf('Riflova bunda') == -1">
                <p>Nahodis outfit a ides dole za rodicmi.</p>
                <p>Hned ako ta zbadaju tak matka preguli oci. Tatko sa len chyti za celo.</p>
                <p>&quot;{{ player.name }}, s kokotom na bruchu nejdes na cintorin. Hybaj si dat nieco normalne.&quot;</p>
                <p>Vyzera to tak, ze tento outfit ti neprejde.</p>
                <span @click="$emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
            </div>
            <div v-else>
                <p>Nahodis outfit a ides dole za rodicmi. Mama sa na teba usmeje.</p>
                <p>&quot;No, paradicka!&quot; <br>&quot;Pome,&quot;, prida sa tatko a poda ti do ruky kahance a zapalky.</p>
                <p>Vyjdete von pred barak. Nasadnete do auta. Tatko nastartuje, zaflekuje jak Knight Rider a upaluje na Dubravsky cintorin.</p>
                <span @click="$emit('setStep', 2)" class="choice">{{ lang.continue }}</span>
            </div>
        </div>
        <div v-if="step == 2">
            <p>V dialke zbadas obrys kostola a cintorin. Pomaly sa k nemu blizite. Vonku sa riadne ochladilo. Citis to hlavne preto, lebo foter ma styl a ma pootvorene okna na aute. Fuka ti do fejsu chladny vzduch. Neni to nejako extra prijemne, ale si ticho. Rozmyslas stale nad tym, co ti povedal ten tajomny hlas v telefone rano po ranajkach.</p>

            <p>{{ player.name }}! Zahraj Nightcall od Kavinskeho na organe v kostole pri Dubravskom cintorine! Uz si splnil/-a takmer vsetko, toto je predposledna uloha, ktora ti zostava. Potom sa uz len treba nejako dostat do Kulturaku a dal/-a si to. Vratil/-a si casove linie na ich spravne miesto. Najprv vsak musis vymysliet ako sa dostanes do toho kostola.</p>

            <p>Tatko zaparkuje pred cintorinom. Mama vystupuje von a ty ich nasledujes.</p>

            <p>&quot;{{ player.name }}, pome.&quot;</p>

            <p>Kracas pomaly za rodicmi. Babka je pochovana na samotnom konci cintorina. Tiez si vedela vybrat miesto. Doteraz si pamatas jej posledne slova, &quot;{{ player.name }}, pocuvaj ma sem. Povedz potom mame nech sa ma neopovazi pochovat vedla toho mojho retardovaneho brata. Ani vedla suseda Fera nechcem byt. Na konec ma dajte. Nech nikeho z nich nevidim.&quot; Babka bola vzdy trocha ujebana. Kazdopadne kluckujete cez nahrobky jak Millennium Falcon az sa dostanete k nahrobku z fialoveho mramoru. Krizom cez cely kamen je obrovsky neonovy napis - BABKA.</p>

            <p>Vytiahnes z vrecka kahance a zapalky, nech ich mozes babke zapalit. Do akeho kreativneho vzoru ich zlozis?</p>

            <div @click="$emit('setStep', 3); $emit('pickupItem', {item: 'borovicka'}); $emit('removeItem', 'kahance');" class="choice">Velka cicina predsa.</div>
            <div @click="$emit('setStep', 3); $emit('pickupItem', {item: 'borovicka'}); $emit('removeItem', 'kahance');" class="choice">Pentagram kamo.</div>
            <div @click="$emit('setStep', 3); $emit('pickupItem', {item: 'borovicka'}); $emit('removeItem', 'kahance');" class="choice">Velke B ako Babka. Alebo Blade Runner.</div>
        </div>
        <div v-if="step == 3">
            <p>Zlozis kahance jak umelec a systematicky zapalis kazdu sviecku.</p>

            <p>Zrazu vidis ako velky blesk pretne oblohu niekde v dialke. DRRRRRRRRRRRBBBBBBB. Zaduni hrom. Nad babkinym hrobom sa zhmotni belasa ektoplazma, ktora postupne zacne naberat kontury babkinho fejsu.</p>

            <p>&quot;{{ player.name }}, ocuvaj sem ty soplak/soplanda. To som jaaa, tvoja babkaaaa. Viiim velmi dobre jaky kvest musis splnit. Rozhodla som sa ci pomooct zo zahrobaaa jak Jezis dopiceeee!&quot;</p>

            <p>Zrazu otvori jej obrovsku papulu a vyplazi von asi 3 metrovy sivy jazyk, ktory je zbaleny v kopke ako karimatka. Postupne ho zacne rozrolovavat. Na konci jazyka zbadas obrovsku 2 litrovu flasku borovicky. Dychne na teba hnilobnym dychom, az ti anal zcvrkne.</p>

            <p>&quot;Hen! Ber {{ player.name }}! Toto budes potrebuvat na tvojem kveste.&quot;</p>

            <p>Zoberes borovicku z babkinho obrovskeho jazyka.</p>

            <p>&quot;Velmi dobre {{ player.name }}. Drzim ci palce. Nech secko dobre dopadne. A nezabudni. Budz neposlusny/-a a rob kokociny. Slusnych ludzi nigdo aj tak nema rad, nudni kokoti. Kedy budes moct byt chuj ked ne teraz? Ver mi, po smrci uz ta nist dobre necaka. Celkovo. Po styricatke uz to ide dolu z kopca. Si pamatam, ze ani dzedovi uz dobre nestal. Ne jak kedysi. Nehehe. Ale to uz zabiham do nepodstatnych detailov.&quot;</p>

            <p>Opat oblohu pretne blesk, zaduni hrom a babkina obrovska hlava zmizne. Tvoji rodicia sa tvaria, ako keby nic nevedeli. Zafuka vietor a rozhrnie popadane listy. Zamrazi ta na zatylku od chladu. Sviecky jemne vzplanu a ty stojis nad hrobom svojej babky s 2 litrovou borovickou v ruke. Tatko a mama kukaju furt na hrob, vyzera to tak, ze este sa budu tejto naplnajucej aktivite hodnu chvilu venovat. Co ides robit zatial?</p>

            <div @click="$emit('setStep', 4)" class="choice">Idem ku kostolu.</div>
        </div>
        <div v-if="step == 4">
            <p>Vydas sa krizom cez cely cintorin naspat pred vchod. Po pravej strane vidis taky nejaky stredne velky <span class="choice" @click="$emit('note', 'Klasicky murovany kostol slovenskeho stylu. Nic extra.')">kostol</span>. Pred nim sa rozprestiera nieco, co funguje pocas krajsieho pocasia ako zeleny travnik. Na travniku zbadas nieco <span class="choice" @click="$emit('note', 'Prikrocis blizsie k niecomu &quot;hnedemu&quot;. Kedze si detektiv, nachystas si ukazovak a strcis ho do tajomneho objektu. Nieco sa ti nalepi na prst. Ovonias, oliznes. Chut je trpka, nasladla. Ano. Je to presne to, co si ocakaval, ze to bude. Prave si oblizol hovno kamo. Gratulujem ti. Keby mala nasa hra achievementy. Dostal/-a by si ten najkrajsi.')">hnede</span>. Do kopca vedie dlazdeny chodnik, ktory konci pri brane. Pred samotnou branou sedi na stolicke postarsi pan. Netvari sa moc priatelsky. Urcite preto, ze ta zatial nepozna.</p>
            <div @click="$emit('setStep', 5)" class="choice">Kracas po chodniku a ides dnu.</div>
        </div>
        <div v-if="step == 5">
            <p>Jak boss si to ides po chodniku. Dochodca pred vchodom, si odpluje na zem a potiahne si z balenej cigarety. Nadvihne jeho hunate obocie a oslovi ta prijemnym tonom.</p>

            <p>&quot;Ty co tu sces bazmek soplavy?&quot;</p>

            <div @click="$emit('setStep', 6)" class="choice">Dobry vecer ujo. Chcel/-a by som ist do kostola, troska si zahrat na organ.</div>
            <div @click="$emit('setStep', 7)" class="choice">Dobry vecer ujo. Chcem sa ist pomodlit k Jeziskovi, sak dnes je vsechsvatych.</div>
            <div @click="$emit('setStep', 8)" class="choice">Dobry vecer ujo. Ako sa mate?</div>
        </div>
        <div v-if="step == 6">
            <p>Ujo len preguli oci, &quot;Na organe sa hraj doma ty uchylak. Tahaj prec.&quot;</p>
            <div @click="$emit('setStep', 9)" class="choice">Nechcel som vas urazit ujo, volam sa {{ player.name }} a bol/-a som len zvedavy/-a jaky organ mate vo vnutri, som celkom nadsenec kostolnych nastrojov.</div>
        </div>
        <div v-if="step == 7">
            <p>Ujo len preguli oci,&quot;No urcite, ja mam jeziska v gacoch. Tahaj prec.&quot;</p>
            <div @click="$emit('setStep', 9)" class="choice">Nechcel som vas urazit ujo, volam sa {{ player.name }} a bol/-a som len zvedavy/-a jaky organ mate vo vnutri, som celkom nadsenec kostolnych nastrojov.</div>
        </div>
        <div v-if="step == 8">
            <p>Ujo sa letmo pousmeje,&quot; Co ci budem hovorit. Sedzim tu jak chuj, zima mi je a cekam na omsu, kedy budem moct zajebat riadne solo na organe. Jak sa volas inac?.&quot;</p>
            <div @click="$emit('setStep', 9)" class="choice">Volam sa {{ player.name }} a bol/-a som len zvedavy/-a jaky organ mate vo vnutri, som celkom nadsenec kostolnych nastrojov.</div>
        </div>
        <div v-if="step == 9">
            <p>&quot;V pohodicke nist sa nestalo. Volam sa Jano. Som lokalny organista. Ale seci moji kamosi ma volaju virtuoz Johny. Ked tak na teba kukam, tak vyzeras jak negdo, kto si lubi vypic. Aj ked teda, aby si ma nepochopil/-a zle. Vypadas na 12 ci na kolko ale vidzim ti v ococh, ze nepohrdnes poldecacikom neceho dobreho. Mam pravdu?&quot;</p>

            <div @click="$emit('setStep', 10)" class="choice">Ano ujo! Pijem jak troska!</div>
            <div @click="$emit('setStep', 10)" class="choice">Ano ujo! Bez alkoholu sa neoplati zit!</div>
            <div @click="$emit('setStep', 10)" class="choice">Ano ujo! Ked budem velky chcem byt alkoholik!</div>
        </div>
        <div v-if="step == 10">
            <p>&quot;To velmi rad ocujem. Jediny problem je ten, ze nemam co pit. Zozen nejaku flasu a pojdeme si podzemuvat na organ.&quot;</p>

            <div @click="$emit('setStep', 11); $emit('removeItem', 'borovicka');" class="choice">To je ale nahodicka, mam tu jednu taku malu flasku borovicky.</div>
            <div v-if="player.inventory.indexOf('flasa vodky') != -1" @click="$emit('setStep', 12); $emit('removeItem', 'borovicka'); $emit('removeItem', 'flasa vodky');" class="choice">To je ale nahodicka, mam tu jednu taku malu flasku borovicky a zaroven, kedze som gurman mam aj flasku vodky.</div>
        </div>
        <div v-if="step == 11">
            <p>&quot;Paradicka {{ player.name }}. Pome nutraj. Venku aj tak fuci jak hovado. Ukazem ci moj organ.&quot; Dufas, ze mysli hudobny nastroj a ides za nim dnu.</p>
            <span @click="$emit('setStep', 13)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 12">
            <p>&quot;Olalala, paradicka. Jaky gurman/gurmanka. Pome nutraj. Venku aj tak fuci jak hovado. Ukazem ci moj organ." Dufas, ze mysli hudobny nastroj a ides za nim dnu.&quot;</p>
            <span @click="$emit('setStep', 13)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 13">
            <p>Virtuoz Johny ta zobere dnu. Zaznes svetlo. Vsetko vo vnutri vyzera ako klasicky kostol, ktory si pamatas z detstva. Jezisko na krizi sa tvari jak keby ho niekto penetroval (a mozno aj). Vsetci svaty na farebnych freskach placu a omakavaju holubov az im z toho vlhnu kloaky. Krizom cez hlavny oltar je biely flakaty obrus. Nechces vediet od coho su flaky. Ale mas tusak, ze to bude starecke semeno.</p>

            <p>Nasledujes virtuoza Johnyho hore po schodoch na podium, kde sidli organ.</p>

            <p>&quot;No. Kukaj {{ player.name }}. Najprv ci zahram neco ja a potom pojdes na to ty. Uvidime, kto z nas to zadeli lepsi.&quot;</p>

            <p>Johny si sadne na stolicku a zacne hrat. Chvilu rozmyslas co to je. Vzapati si ale uvedomis, ze lokalny organista virtuoz prave zacal zajebavat Icebreaker od Grawlixa v kostolnom aranzma. Nechapacky.</p>

            <p>&quot;Dobre, ne? Pred nedavnom som zacal ocuvat one, ten syndvejv. Dost dobre to je. Pod mi scul ukazat ty neco.&quot;</p>
            <span @click="$emit('setStep', 14)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 14">
            <p>Dobre kamosko. Mas pred sebou dalsiu mini-hru. Musis zajebat Kavinskeho Nightcall. Na obrazovke sa ti budu zjavovat kombinacie klaves, ktore musis stlacat. Ked to das. Zahras to jak pan. Ked ne. Virtuoz Johny bude smutny.</p>
            <span @click="$emit('setStep', 100); disableMenu(true)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 15">
            <p>&quot;Ale no tak. {{ player.name }}. Sak sa snaz. To takto nachuja nehra ani moj tlsty sused Tibor.</p>
            <span @click="$emit('setStep', 100); disableMenu(true)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 16">
            <p>&quot;Fuha! To bolo {{ player.name }}. Paradicka. Dobre sa mi tu s tebu dzemuje, ale cas nas tlaci. Tusim ta negdo hlada.&quot;</p>
            <p>Pocujes z vonku hlas tvojho tatka.</p>
            <p>&quot;{{ player.name }}! {{ player.name }}! Kde si? Do kostola urcite neisiel/-la, nevymyslaj. Co by tam robil/-a?&quot;</p>
            <p>&quot;Tatko! Som v kostole, idem von!&quot;</p>
            <span @click="$emit('setStep', 17); $emit('pickupItem', {item: 'Arturia JUP-8 V'})" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 17">
            <p>Vyjdes von z kostola. Foter s mamkou uz netrpezlivo preslapuju pri aute. Rozbehnes sa za nimi. Zacne ta vsak ovladat nejaka nadprirodzena sila. Vsimnes si jeden konkretny hrob hned na okraji cintorinu, velmi blizko kostola. Zbadas nahrobok. Meky Zbirka. Mramorovy poklop praskne a do vzduchu vyleti ruka jak keby ju Romero reziroval. V nej Jup-8 V od Arturie. Co ti jebe.</p>
            <p>V hlave zacujes slova:</p>
            <p>Zem pradávnych sĺnk
V chladnom tieni tajomstiev
Na mapách jej dávno niet
Zem pradávnych sĺnk
Nepoznáš jej žalospev
More nevydá viac ten svet</p>
            <p>Schmatnes syntak a bezis do auta. Syntak spokojne vo vacku. Tatko soferuje domov a ty mas pred sebou poslednu ulohu. Dostat sa do Kulturaku na ten vyjebany Nightcall.</p>
            <div @click="$emit('setChapter', 6); $emit('setStep', 0)" class="choice">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 100" id="synth-hero-container">
            <div style="float: left; font-size: 23px;">
                <div v-if="loading && (mp3_loaded == false || midi_loaded == false)">
                    LOADING...
                </div>
                <div v-else>
                    <span v-if="mp3_loaded == false || midi_loaded == false" @click="load">START</span>
                    <span v-else :style="{'visibility': playing ? 'hidden' : 'visible'}" @click="play" class="choice">PLAY</span>
                </div>

                <pre style="height: 200px;">
                    {{ playground }}
                </pre>

                <pre>
 _______________________________________
|  | | | |  |  | | | | | |  |  | | | |  |
|  | | | |  |  | | | | | |  |  | | | |  |
|  | | | |  |  | | | | | |  |  | | | |  |
|  |_| |_|  |  |_| |_| |_|  |  |_| |_|  |
|   |   |   |   |   |   |   |   |   |   |
| <span :class="{ 'key-pressed': keyPressed == 'a' }">A</span> | <span :class="{ 'key-pressed': keyPressed == 's' }">S</span> | <span :class="{ 'key-pressed': keyPressed == 'd' }">D</span> | <span :class="{ 'key-pressed': keyPressed == 'f' }">F</span> |   |   |   |   |   |   |
|___|___|___|___|___|___|___|___|___|___|
                </pre>
                <div style="position: absolute; font-size: 30px;" >HITS: {{ numberOfHits }}</div>
            </div>
            <progress class="success-bar" :value="success" max="100"></progress>
        </div>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
    export default {
        props: ['player', 'step'],
        mounted() {
            window.addEventListener('keyup', (e) => {
                this.keyUp(e)
            })
            window.addEventListener('keydown', (e) => {
                this.keyDown(e)
            })
            this.load()
        },
        data() {
            return {
                cheating: false,
                cheating_count: 0,
                interval: null,
                numberOfHits: 0,
                playing: false,
                currentTime: 0,
                sound: null,
                mp3_loaded: false,
                midi_loaded: false,
                loading: false,
                note: null,
                noteCode: null,
                keyPressed: null,
                visibleNotes: [],
                success: 100,
                playground: `
  |   |    |  |   |   |   |   |   |   |
  |   |    |  |   |   |   |   |   |   |
  |   |    |  |   |   |   |   |   |   |
  |   |    |  |   |   |   |   |   |   |
  |   |    |  |   |   |   |   |   |   |
  |   |    |  |   |   |   |   |   |   |
  |   |    |  |   |   |   |   |   |   |
  |   |    |  |   |   |   |   |   |   |
`
            }
        },
        computed: {
        },
        methods: {
            keyDown(e) {
                setTimeout(() => {
                    this.cheating = false
                }, 60)
                if (this.cheating) this.cheating_count++

                this.keyPressed = e.key
                this.visibleNotes.forEach(visibleNote => {
                })
                var now = MIDI.Player.currentTime
                for (let index = 0; index < this.visibleNotes.length; index++) {
                    var note = this.visibleNotes[index]
                    if (note.timeSignature <= now && note.char.toLowerCase() == this.keyPressed) {
                        this.numberOfHits++
                        this.sound.volume(1)
                        this.noteClear(note.timeSignature)
                        break
                    }
                }
                this.cheating = true
            },
            keyUp(e) {
                this.keyPressed = null
            },
            load() {
                var self = this
                this.loading = true
                this.sound = new Howl({
                    src: ['mp3/nightcall.mp3'],
                    onend: function() {
                        self.$emit('setStep', 16)
                        self.sound.stop()
                        MIDI.Player.stop()
                        self.disableMenu(false)
                        self.cheating_count = 0
                    }
                })
                this.sound.once('load', () => {
                    this.mp3_loaded = true
                    console.log('mp3 loaded')
                })

                MIDI.Player.BPM = 91
                //MIDI.Player.BPM = 17
                var self = this
                MIDI.loadPlugin({
                    //instruments: ['bass', 'synth_drum', 'acoustic_grand_piano'],
                    onsuccess: function() {
                        MIDI.setVolume(0, 0);
                        MIDI.Player.loadFile('mp3/nightcall_1track.mid', () => {
                            self.midi_loaded = true
                            console.log('midi loaded');

                            MIDI.Player.addListener(function(data) {
                                if (data.channel == 0) {
                                    if (data.message == 144) self.drawNote(data.note, data.now)
                                }
                            });
                        })
                    }
                })
            },
            drawNote(note, timeSignature) {
                //var note = 60
                // var conversion = {
                //     60: { index: 3, char: 'A'},
                //     62: { index: 7, char: 'S'},
                //     64: { index: 12, char: 'D'},
                //     65: { index: 15, char: 'F'},
                //     67: { index: 19, char: 'G'},
                //     69: { index: 23, char: 'H'},
                //     71: { index: 27, char: 'J'},
                //     72: { index: 31, char: 'K'},
                //     74: { index: 35, char: 'L'}
                // }
                var conversion = {
                    60: { index: 3, char: 'A'},
                    62: { index: 7, char: 'S'},
                    64: { index: 12, char: 'D'},
                    65: { index: 15, char: 'F'},

                    67: { index: 3, char: 'A'},
                    69: { index: 7, char: 'S'},
                    71: { index: 12, char: 'D'},
                    72: { index: 15, char: 'F'}
                }

                this.visibleNotes.push({
                    char: conversion[note].char,
                    timeSignature: timeSignature
                })

                var level = -1
                var subInterval = 0
                var interval = setInterval(() => {
                    if (level != -1) this.replaceAt(conversion[note].index + 40 * level, '|')
                    if (level >= 7) {
                        clearInterval(interval)
                    }
                    level++
                    if (level <= 7) this.replaceAt(conversion[note].index + 40 * level, conversion[note].char)
                    else {
                        this.visibleNotes.forEach(note => {
                            if (note.timeSignature == timeSignature) {
                                this.noteClear(note.timeSignature)
                                if (this.player.cheats_enabled == false) this.success = this.success - 1.5
                                this.sound.volume(0.2)
                            }
                        })
                    }
                // }, 700)
                }, 100)
            },
            noteClear(timeSignature) {
                this.visibleNotes = this.visibleNotes.filter(note => {
                    return note.timeSignature != timeSignature
                })
            },
            replaceAt(index, replace) {
                this.playground = this.playground.substring(0, index) + replace + this.playground.substring(index + 1);
            },
            play() {
                this.playing = true
                this.sound.play()
                setTimeout(() => {
                    MIDI.Player.start()
                }, 10725)
            },
            disableMenu(value) {
                this.$emit('setDisabled', {
                    new: value,
                    save: value,
                    load: value
                })
            }
        },
        watch:{
            // CHECK FOR FAIL
            success: function(value) {
                if (value < 1) {
                    this.playing = false
                    this.sound.stop()
                    MIDI.Player.stop()
                    this.success = 100
                    clearInterval(this.interval)
                    this.interval = null
                    this.visibleNotes = []
                    this.numberOfHits = 0
                    this.$emit('setStep', 15)
                    this.disableMenu(false)
                    this.cheating_count = 0
                }
            },
            cheating_count: function(value) {
                if (value > 100) {
                    this.$emit('note', 'Dobre si s tym vyjebal/-a kamosko.')
                    this.cheating_count = 0
                }
            }
        }
    }
</script>

<style>
    .key-pressed {
        background-color: white;
        color: black;
    }
    #chapter5-container progress[value] {
        -webkit-appearance: none;
        appearance: none;
        width: 410px;
        height: 30px;
        transform: rotate(270deg);
        -webkit-transform: rotate(270deg); /*Webkit*/
        -moz-transform: rotate(270deg); /*FireFox*/
        position: absolute;
        top: 267px;
        left: 350px;
    }
    #chapter5-container progress[value]::-webkit-progress-bar {
        background-color: black;
        border: 2px solid;
        border-color: yellowgreen;
    }
    #synth-hero-container {
        position: fixed;
        width: 100%;
    }
</style>