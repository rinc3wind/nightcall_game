<template>
    <div>
        <div v-if="step == 0">
            <p>18:17<br>Bratislava<br>Tvoj Barak</p>

            <p>Ked zaparkujes BMXku pred domom, vonku je uz riadna tma. Vsimnes si fajnovu vyrezanu tekvicu, v ktorej niekto zapalil sviecku. Skeri sa na teba jak Jakubec. Fotrov cierny Pontiac je uz zaparkovany pred domom. Otvoris dvere a vojdes do kuchyne. Mama s tatkom uz su obleceni a nachystani na cintorin trip.</p>

            <p>Tatko sa hned na teba otoci.</p>

            <p>&quot;{{ player.name }}, konecne si doma. Kde sa suchces. Uz tu na teba chvilu cakame. Vyrazame na cintorin. Sup sup. Skoc sa hore do izby prezliect, si cely nejaky spinavy.&quot;</p>

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
                <p>&quot;{{ player.name }}, s falusom na bruchu nejdes na cintorin. Hybaj si dat nieco normalne.&quot;</p>
                <p>Vyzera to tak, ze tento outfit ti neprejde.</p>
                <span @click="$emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
            </div>
            <div v-else>
                <p>Nahodis outfit a ides dole za rodicmi. Mama sa na teba usmeje.</p>
                <p>&quot;No, jaky si fesak.&quot; <br>&quot;Pome.&quot;, prida sa tatko a poda ti do ruky kahance a zapalky.</p>
                <p>Vyjdete von pred barak. Nasadnete do auta. Tatko nastartuje, zaflekuje jak Knight Rider a upaluje na Dubravsky cintorin.</p>
                <span @click="$emit('setStep', 2)" class="choice">{{ lang.continue }}</span>
            </div>
        </div>
        <div v-if="step == 2">
            <p>V dialke zbadas obrys kostola a cintorin. Pomaly sa k nemu blizite. Vonku sa riadne ochladilo. Citis to hlavne preto, lebo Foter ma styl a ma pootvorene okna na aute. Fuka ti do fejsu chladny vzduch. Neni to nejako extra prijemne, ale si ticho. Rozmyslas stale nad tym, co ti povedal ten tajomny hlas v telefone rano po ranajkach.</p>

            <p>{{ player.name }}! Zahraj Nightcall od Kavinskeho na organe v kostole pri Dubravskom cintorine! Uz si splnil takmer vsetko, toto je predposledna uloha, ktora ti zostava. Potom sa uz len treba nejako dostat do Re:Freshu a dal si to. Vratil si casove linie na ich spravne miesto. Najprv vsak musis vymysliet ako sa dostanes do toho kostola.</p>

            <p>Tatko zaparkuje pred cintorinom. Mama vystupuje von a ty ich nasledujes.</p>

            <p>&quot;{{ player.name }}, pome.&quot;</p>

            <p>Kracas pomaly za rodicmi. Babka je pochovana na samotnom konci cintorina. Tiez si vedela vybrat miesto. Doteraz si pamatas jej posledne slova, &quot;{{ player.name }}, pocuvaj ma sem. Povedz potom mame nech sa ma neopovazi pochovat vedla toho mojho retardovaneho brata. Ani vedla suseda Fera nechcem byt. Na konec ma dajte.&quot; Babka bola vzdy trocha ujebana. Kazdopadne kluckujete cez nahrobky jak Millennium Falcon az sa dostanete k nahrobku z fialoveho mramoru. Krizom cez cely kamen je obrovsky neonovy napis - BABKA.</p>

            <p>Vytiahnes z vrecka kahance a zapalky, nech ich mozes babke zapalit. Do ake kreativneho vzoru ich zlozis?</p>

            <div @click="$emit('setStep', 3)" class="choice">Velka cicina predsa.</div>
            <div @click="$emit('setStep', 3)" class="choice">Pentagram kamo.</div>
            <div @click="$emit('setStep', 3)" class="choice">Velke B ako Babka. Alebo Blade Runner.</div>
        </div>
        <div v-if="step == 3">
            <p>Zlozis kahance jak pan umelec a systematicky zapalis kazdu sviecku.</p>

            <p>Zrazu vidis ako velky blesk pretne oblohu niekde v dialke. DRRRRRRRRRRRBBBBBBB. Zaduni hrom. Nad babkinym hrobom sa zhmotni belasa ektoplazma, ktora postupne zacne naberat kontury babkinho fejsu.</p>

            <p>&quot;{{ player.name }}, ocuvaj sem, ty harant. To som jaaa, tvoja babkaaaa. Viiim velmi dobre jaky kvest musis splnit. Rozhodla som sa ci pomooct zo zahrobaaa!&quot;</p>

            <p>Zrazu otvori jej obrovsku papulu a vyplazi von asi 3 metrovy jazyk, ktory je zbaleny v kopke ako karimatka. Postupne ho zacne rozrolovavat. Na konci jazyka zbadas obrovsku 2 litrovu flasku borovicky.</p>

            <p>&quot;Hen! Ber {{ player.name }}! Toto budes potrebuvat na tvojem kveste.&quot;</p>

            <p>Zoberes borovicku z babkinho obrovskeho jazyka.</p>

            <p>&quot;Velmi dobre {{ player.name }}. Drzim ci palce. Nech secko dobre dopadne. A nezabudni. Budz neposlusny a rob kokociny. Slusnych ludzi nigdo aj tak nema rad. Kedy budes moct byt chuj ked ne teraz? Ver mi, po smrci uz ta nist dobre necaka.&quot;</p>

            <p>Opat oblohu pretne blesk, zaduni hrom a babkina obrovska hlava zmizne. Tvoji rodicia sa tvaria, ako keby nic nevedeli. Zafuka vietor a rozhrnie popadane listy. Zamrazi ta na zatylku od chladu. Sviecky jemne vzplanu a ty stojis nad hrobom svojej babky s 2 litrovou borovickou v ruke. Tatko a mama kukaju furt na hrob, vyzera to tak, ze este sa budu tejto naplnajucej aktivite hodnu chvilu venovat. Co ides robit zatial?</p>

            <div @click="$emit('setStep', 4)" class="choice">Idem ku kostolu.</div>
        </div>
        <div v-if="step == 4">
            <p>Vydas sa krizom cez cely cintorin naspat pred vchod. Po pravej strane vidis taky nejaky stredne velky <span class="choice" @click="$emit('note', 'Klasicky murovany kostol slovenskeho stylu. Nic extra.')">kostol</span>. Pred nim sa rozprestiera nieco, co funguje pocas krajsieho pocasia ako zeleny travnik. Na travniku zbadas nieco <span class="choice" @click="$emit('note', 'Prikrocis blizsie k niecomu &quot;hnedemu&quot;. Kedze si detektiv, nachystas si ukazovak a strcis ho do tajomneho objektu. Nieco sa ti nalepi na prst. Ovonias, oliznes. Chut je trpka, nasladla. Ano. Je to presne to, co si ocakaval, ze to bude. Prave si oblizol hovno kamo. Gratulujem ti. Keby mala nasa hra achievementy. Dostal by si ten najkrajsi.')">hnede</span>. Do kopca vedie dlazdeny chodnik, ktory konci pri brane. Pred samotnou branou sedi na stolicke postarsi pan. Netvari sa moc priatelsky. Urcite preto, ze ta zatial nepozna.</p>
            <div @click="$emit('setStep', 5)" class="choice">Kracas po chodniku a ides dnu.</div>
        </div>
        <div v-if="step == 5">
            <p>Jak boss si to ides po chodniku. Dochodca pred vchodom, si odchrachli na zem a potiahne si z balenej cigarety. Nadvihne jeho hunate obocie a oslovi ta prijemnym tonom.</p>

            <p>&quot;Ty co tu sces bazmek?&quot;</p>

            <div @click="$emit('setStep', 6)" class="choice">Dobry vecer ujo. Chcel by som ist do kostola, troska si zahrat na organ.</div>
            <div @click="$emit('setStep', 7)" class="choice">Dobry vecer ujo. Chcem sa ist pomodlit k Jeziskovi, sak dnes je vsechsvatych.</div>
            <div @click="$emit('setStep', 8)" class="choice">Dobry vecer ujo. Ako sa mate?</div>
        </div>
        <div v-if="step == 6">
            <p>Ujo len preguli oci, &quot;Na organe sa hraj doma ty uchylak. Tahaj prec.&quot;</p>
            <div @click="$emit('setStep', 9)" class="choice">Nechcel som vas urazit ujo, volam sa {{ player.name }} a bol som len zvedavy jaky organ mate vo vnutri, som celkom nadsenec kostolnych nastrojov.</div>
        </div>
        <div v-if="step == 7">
            <p>Ujo len preguli oci,&quot;No urcite, ja mam jeziska v gacoch. Tahaj prec.&quot;</p>
            <div @click="$emit('setStep', 9)" class="choice">Nechcel som vas urazit ujo, volam sa {{ player.name }} a bol som len zvedavy jaky organ mate vo vnutri, som celkom nadsenec kostolnych nastrojov.</div>
        </div>
        <div v-if="step == 8">
            <p>Ujo sa letmo posumeje,&quot; Co ci budem hovorit synak. Sedzim tu jak chuj a cekam na omsu, kedy budem moct zajebat riadne solo na organe. Jak sa volas inac?.&quot;</p>
            <div @click="$emit('setStep', 9)" class="choice">Volam sa {{ player.name }} a bol som len zvedavy jaky organ mate vo vnutri, som celkom nadsenec kostolnych nastrojov.</div>
        </div>
        <div v-if="step == 9">
            <p>&quot;V pohodicke synak. Volam sa Jano. Som lokalny organista. Ale seci moji kamosi ma volaju virtuoz Johny. Ked tak na teba kukam, tak vyzeras jak negdo, kto si lubi vypic. Aj ked teda, aby si ma nepochopil zle. Vypadas na 12 ci na kolko ale vidzim ti v ococh, ze nepohrdnes poldecacikom neceho dobreho. Mam pravdu?&quot;</p>

            <div @click="$emit('setStep', 10)" class="choice">Ano ujo! Pijem jak troska!</div>
            <div @click="$emit('setStep', 10)" class="choice">Ano ujo! Bez alkoholu sa neoplati zit!</div>
            <div @click="$emit('setStep', 10)" class="choice">Ano ujo! Ked budem velky chcem byt alkoholik!</div>
        </div>
        <div v-if="step == 10">
            <p>&quot;To velmi rad ocujem. Jediny problem je ten, ze nemam co pit. Zozen nejaku flasu a pojdeme si podzemuvat na organ.&quot;</p>

            <div @click="$emit('setStep', 11)" class="choice">To je ale nahodicka, mam tu jednu taku malu flasku borovicky.</div>
            <div v-if="player.inventory.indexOf('flasa vodky') != -1" @click="$emit('setStep', 12)" class="choice">To je ale nahodicka, mam tu jednu taku malu flasku borovicky a zaroven, kedze som gurman mam aj flasku vodky.</div>
        </div>
        <div v-if="step == 11">
            <p>&quot;Paradicka {{ player.name }}. Pome nutraj. Venku aj tak fuci jak hovado. Ukazem ci moj organ.&quot; Dufas, ze mysli hudobny nastroj a ides za nim dnu.</p>
            <span @click="$emit('setStep', 13)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 12">
            <p>&quot;Olalala, paradicka. Taky mlady. A taky sikovny. Pome nutraj. Venku aj tak fuci jak hovado. Ukazem ci moj organ.&quot; Dufas, ze mysli hudobny nastroj a ides za nim dnu.&quot;</p>
            <span @click="$emit('setStep', 13)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 13">
            <p>Virtuoz Johny ta zobere dnu. Zaznes svetlo. Vsetko vo vnutri vyzera ako klasicky kostol, ktory si pamatas z detstva. Jezisko na krizi sa tvari jak keby ho niekto penetroval. Vsetci svati na farebnych freskach placu a omakavaju holubov. Krizom cez hlavny oltar je biely flakaty obrus. Nechces vediet od coho su flaky.</p>

            <p>Nasledujes virtuoza Johnyho hore po schodoch na podium kde sidli organ.</p>

            <p>&quot;No. Kukaj {{ player.name }}. Najprv ci zahram neco ja a potom pojdes na to ty. Uvidime kto z nas to zadeli lepsi.&quot;</p>

            <p>Johny si sadne na stolicku a zacne hrat. Chvilu rozmyslas co to je. Vzapati si ale uvedomis, ze lokalny organista virtuoz prave zacal zajebavat Turbo Killera od Carpenter Brut v kostolnom aranzma. Nechapacky.</p>

            <p>&quot;Dobre ne? Pred nedavnom som zacal ocuvat one, ten syndvejv. Dost dobre to je. Pod mi scul ukazat ty neco.&quot;</p>
            <span @click="$emit('setStep', 14)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 14">
            <p>Dobre kamosko. Mas pred sebou dalsiu mini-hru. Musis zajebat Kavinskeho Nightcall. Na obrazovke sa ti budu zjavovat kombinacie klaves, ktore musis stlacat. Ked to das. Zahras to jak pan. Ked ne. Virtuoz Johny bude smutny.</p>
            <span @click="$emit('setStep', 100)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 15">
            <p>&quot;Ale no tak. {{ player.name }}. Sak sa snaz. To takto nachuja nehra ani moj tlsty sused Tibor.</p>
            <span @click="$emit('setStep', 100)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 16">
            <p>&quot;Fuha! To bolo {{ player.name }}. Paradicka. Dobre sa mi tu s tebu dzemuje ale cas nas tlaci. Tusim ta negdo hlada.&quot;</p>
            <p>Pocujes z vonku hlas tvoj tatka.</p>
            <p>&quot;{{ player.name }}! {{ player.name }}! Kde si? Do kostola urcite neisiel, nevymyslaj. Co by tam robil?&quot;</p>
            <p>&quot;Tatko! Som v kostole, idem von!&quot;</p>
            <span @click="$emit('setStep', 17); $emit('pickupItem', {item: 'Arturia JUP-8 V'})" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 17">
            <p>Vyjdes von z kostola. Foter s mamkou uz netrpezlivo preslapuju pri aute. Rozbehnes sa za nimi. Zacne ta vsak ovladat nejaka nadprirodzena sila. Vsimnes si jeden konkretny hrob hned na okraji cintorinu, velmi blizko kostola. Zbadas nahrobok. Vaso Patejdl. Mramorovy poklop praskne a do vzduchu vyleti ruka jak keby ju Romero reziroval. V nej Jup-8 V od Arturie. Co ti jebe.</p>
            <p>V hlave zacujes slova:</p>
            <p>Bud stastna nepriznana. Vek sluzi omsu za nas. Maj co si tajne zelas. Ja viem...</p>
            <p>Schmatnes syntak a bezis do auta. Syntak spokojne vo vacku. Tatko soferuje domov a ty mas pred sebou poslednu ulohu. Dostat sa do Re:Freshu na ten vyjebany Nightcall.</p>
        </div>
        <div v-if="step == 100">
            <span v-if="audio_loaded == false" @click="test">START</span>
            <span v-else @click="play">PLAY</span>
            <div style="position: absolute;" :style="{ left: noteCode * 10 + 'px'  }">{{ note }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['player', 'step'],
        mounted() {
        },
        data() {
            return {
                interval: null,
                currentTime: 0,
                sound: null,
                audio_loaded: false,
                toneVisible: false,
                note: null,
                noteCode: null
            }
        },
        computed: {
        },
        methods: {
            start() {
                this.sound = new Howl({
                    src: ['mp3/nightcall.mp3']
                })
                this.sound.once('load', () => {
                    this.audio_loaded = true
                    // this.interval = setInterval(() => {
                    //     this.currentTime = Math.floor(this.sound.seek() * 10) / 10

                    //     if (this.midi[this.currentTime]) {
                    //         this.toneVisible = true
                    //         setTimeout(() => {
                    //             this.toneVisible = false
                    //         }, 200)
                    //     }

                    // }, 50)
                })
            },
            play() {
                this.sound.play()
            },
            test() {
                var self = this
                MIDI.loadPlugin({
                    instruments: ['bass', 'synth_drum', 'acoustic_grand_piano'],
                    onsuccess: function() {
                        MIDI.Player.loadFile('mp3/nightcall.mid', () => {
                            MIDI.Player.addListener(function(data) { // set it to your own function!
                                var now = data.now; // where we are now
                                var end = data.end; // time when song ends
                                var channel = data.channel; // channel note is playing on
                                var message = data.message; // 128 is noteOff, 144 is noteOn
                                var note = data.note; // the note
                                var velocity = data.velocity; // the velocity of the note

                                if (channel == 0) {
                                    self.note = MIDI.noteToKey[note]
                                    self.noteCode = note
                                }
                            });
                            MIDI.Player.start()
                        })
                    }
                })
            }
        },
        watch:{
        }
    }
</script>

<style>

</style>