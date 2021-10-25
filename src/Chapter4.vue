<template>
    <div>
        <div v-if="step == 0">
            <p>Arkadova herna v Bratislave kamosko. V 80 rokoch. Pedalujes na Grosslingovu jak uragan. Podla mapy by sa mala nachadzat presne tam, kde si pamatas, ze by sa malo nachadzat Gymnazium Grosslingova.</p>
            <span @click="$emit('setStep', 1)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 1">
            <p>Cele to je nejake divne. Toto urcite nieje socialisticke Cesko-Slovensko. Nieco je inak. Nehrozi, ze by komousi takymto sposobom prijali imperialisticku kulturu. Kazdopadne. Nestazujes sa a si zvedavy co to bude zac.</p>

            <p>Zrazu zbadas v dialke tu vysnivanu budovu. Uz ako decko si snival o tom, ze raz pojdes do poriadnej Arkadovej herne. Najblizsie k tomu, vsak bol ten jeden automat v lokalnom senku so soliterom. Na streche je obrovsky napis

            <span class="choice" @click="$emit('note', 'Obrovsky neonovy vulgarny napis. Vyzera cool.')">"U dojebaneho ovladaca"</span>

            Vsetko svieti fialovym neonom. Vpredu je odparkovanych asi 20
            <span class="choice" @click="$emit('note', 'Cca 20 pestrofarebnych bicyklov oblepenych rozlicnymi samolepkami stoji zaparkovanych pred hernou. Jeden krajsi ako druhy. Chvilu rozmyslas, ze jeden ukradnes. V tom si ale uvedomis, ze sak mas svoju BMXku a nebudes chuj, lebo len chuji kradnu bajky.')">BMXiek</span>
            a z vnutra sa ozivaju zname tony chiptunovej muziky. Si doma..</p>

            <span @click="$emit('setStep', 2)" class="choice">Zaparkujes BMXku</span>
        </div>
        <div v-if="step == 2">
            <p>Najdes volne miesto medzi bajkami. Odstavis ho na stojan a pripnes zamkom.</p>
            <p>Vojdes dnu do herne.</p>
            <p>Vstupis dnu. Vsetky tvoje zmysly naraz atakuje milion rozlicnych veci. Vona popkornu a rozliatej Coca Coly sa miesa s analogovymi tonmi, ktore vydava desiatka arkadovych masin naraz. Hned oproti tebe je skupinka starsich deti, ktore sa striedaju pri Street Fighterovi. V dialke vidis unudeneho bradateho a riadne chlpateho prevadzkara, ktory pospava a opiera sa o pult. Co spravis?</p>

            <div @click="$emit('setStep', 3)" class="choice">Prejdes sa po herni a skusis najst Space Invaders.</div>
            <div @click="$emit('setStep', 4)" class="choice">Skusis sa prihovorit k starsim deckam a spytas sa ich, kde je Space Invaders.</div>
            <div @click="$emit('setStep', 5)" class="choice">Ides sa prihovorit prevadzkarovi, mozno ti bude vediet poradit.</div>
        </div>

        <div v-if="step == 3">
            <p>Kracas cez ulicky lemovane automatmi. Pozeras dolava, doprava. Pomalicky systematicky prejdes cez celu hernu. Ale Space Invaders nevidis nikde. Ako keby ho nejaky chuj skryl. Chapes to kamo.</p>
            <span @click="$emit('setStep', 2)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 4">
            <p>Pridas sa k skupine decak pri Street Fighterovi.</p>
            <p>&quot;Hej, kamoskovci. Kde najdem Space Invaders?&quot;</p>
            <p>Otoci sa na teba jebakovy chudy chalan s okuliarmi.</p>
            <p>&quot;Space Invaders? Musis sa spytat chlpateho Dusana,&quot; ukaze rukou na prispateho prevadzkara. &quot;Je to jeho oblubena hra a drzi ju na tajnom mieste. A aj ked tak nevyzera, je v tom celkom vyskillovany.&quot;</p>
            <p>&quot;Diky kamo.&quot;</p>
            <span @click="$emit('setStep', 2)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 5">
            <p>Prides k pultu a prihovoris sa k prevadzkarovi.</p>
            <p>&quot;Ehm, dobry den?&quot;</p>
            <p>&quot;Dobry, dobryyy.&quot; Zamrmle, odchrachli a utre si sopel do chlpov na vrchnej strane ruky.</p>
            <p>&quot;Prosim vas, kde najdem Space Invaders? Potrebujem tam zadelit high score a zachranit svet.&quot;</p>
            <p>Vyguli na teba cervene a jednoznacne sfajcene oci.</p>
            <p>&quot;Hm. Space Invaders mam zamknute vzadu v kumbale. Nedavam to zahrat len tak kazdemu. Ale. Vis co. Vyzeras celkom sympaticky. Dohodnime sa takto. Akurat mi dosli cigosky a nemozem odtialto odijst. Ked mi doneses cigu. Dovolim ti zahrat Space Invaders. Co ty na to?&quot;</p>
            <p>&quot;Ok. Vybavim, jasnacka.&quot;</p>

            <div v-if="player.inventory.indexOf('cigarety & zapalovac') != -1" @click="$emit('setStep', 6)" class="choice">Vyberes cigu z vacku a podas ju prevadzkarovi.</div>
            <div @click="$emit('setStep', 7); $emit('pickupItem', {item: 'ocurana cigareta'})" class="choice">Ides naspat pred Arkadovu hernu.</div>
            <div @click="$emit('setStep', 8)" class="choice">Skusis sa spytat chalanov pri Street Fighterovi ci nemaju cigu.</div>
        </div>
        <div v-if="step == 6">
            <p>Vyberes z vrecka svoje cigarety a jednu z nich podas chlpatemu prevadzkarovi.</p>
            <p>&quot;Paradicka. Ako sa volas?&quot;</p>
            <p>&quot;{{ player.name }}&quot;</p>
            <p>&quot;Dobre {{ player.name }}. Pod za mnou, som zvedavy ci prebijes moje skore.&quot;</p>
            <p>Typek sa postavi od pultu a odomkne miestnost za nim.</p>
            <span @click="$emit('setStep', 11)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 7">
            <p>Vyjdes von pred Arkadovu hernu. Zbadas, ze v kanali pred hernou je napadanych vela spakov. Zacnes sa medzi nimi prehrabovat, lebo nemas ziaden self respect a uz si robil/-a ovela horsie veci. Po par minutach najdes jednu takmer novu cigu. Vyzera sice, ze ju daco ocuralo. Ale to ta az tak netrapi, kedze ty ju fajcit nebudes.</p>
            <div @click="$emit('setStep', 9); $emit('removeItem', 'ocurana cigareta')" class="choice">Daj ocuranu cigu prevadzkarovi.</div>
        </div>
        <div v-if="step == 8">
            <p>&quot;Chalani, nemate nahodou cigu?&quot;</p>
            <p>&quot;Nemame kamo. My sme slusne deti a nefajcime. Ale skus sa kuknut pred hernou. Sem tam-tam niekomu vypadne ciga na zem a potom ju ocura.&quot;</p>
            <span @click="$emit('setStep', 10)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 9">
            <p>Vyberes z vrecka ocuranu cigaretu a podas ju chlpatemu prevadzkarovi.</p>
            <p>&quot;Hm. Nejako divne to voni kamo, ako keby to niekto ocural. Ale jebat. Ako sa volas?&quot;</p>
            <p>&quot;{{ player.name }}&quot;</p>
            <p>&quot;Dobre {{ player.name }}. Pod za mnou, som zvedavy ci prebijes moje skore.&quot;</p>
            <p>Typek sa postavi od pultu a odomkne miestnost za nim.</p>
            <span @click="$emit('setStep', 11)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 10">
            <div v-if="player.inventory.indexOf('cigarety & zapalovac') != -1" @click="$emit('setStep', 6)" class="choice">Vyberes cigu z vacku a podas ju prevadzkarovi.</div>
            <div @click="$emit('setStep', 7); $emit('pickupItem', {item: 'ocurana cigareta'})" class="choice">Ides naspat pred Arkadovu hernu.</div>
            <div @click="$emit('setStep', 8)" class="choice">Skusis sa spytat chalanov pri Street Fighterovi ci nemaju cigu.</div>
        </div>
        <div v-if="step == 11">
            <p>Vojdes dnu do tmavej miestnosti. Ma asi tak 3x3 metre. Vsetko smrdi jak ganja a pot a usny maz a zhorene chlpy. Uprostred miestnosti svieti nabliskany Space Invaders automat.</p>
            <p>&quot;{{ player.name }}, som zvedavy ako si na tom. Moje high score je 110,510.&quot; prihovori sa ti prevadzkar.</p>
            <p>Kamosko. Je to na tebe. Osud vsetkych casovych sfer lezi na tvojich pleciach.</p>
            <div @click="$emit('setStep', 12)" class="choice">HRAJ</div>
        </div>
        <div v-if="step == 12">
            <p>Kamosko, ides si zahrat prave Space Invaders. Musis zadelit najvyssie high score. Hra sa hra velmi primitivnym sposobom. Vzdy zbadas na obrazovke bud nejaky sled znakov alebo slov. Zapne sa timer. A ides na to. Musis opisat co najrychlejsie to, co vidis na obrazovke. Ked sa ti to podari. Ides do dalsieho levelu. Ak nie, zacinas uplne od zaciatku. Snaz sa do pici. Nemozes nechat chlpateho Dusana aby ta porazil.</p>
            <span @click="startLevel()" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 13">
            <span class="typed-chars">{{ textAlreadyTyped }}</span>
            <span class="not-yet-typed-chars">{{ textToType }}</span>
            <div class="timer">{{ timer }}</div>
        </div>
        <div v-if="step == 14">
            <p>GAME OVER</p>
            <span @click="$emit('setStep', 12)" class="choice">{{ lang.continue }}</span>
        </div>

        <div v-if="step == 15">
            <p>Chlpaty Dusan sa len usmeje. &quot;Keby si nedal tutorial, tak si fakt chuj.&quot;</p>
            <span @click="startLevel()" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 16">
            <p>&quot;Ano, dal si prvy level. Gratulujem. Si super.&quot; Povie ti Dusan. Z nejakeho dovodu mas vsak tusak, ze to nemysli uprimne.</p>
            <span @click="startLevel()" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 17">
            <p>Dusan si len odchrachli a nijako na teba nereaguje.</p>
            <span @click="startLevel()" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 18">
            <p>&quot;Paradicka. Scul si taky dobry ako moja babka.&quot;</p>
            <span @click="startLevel()" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 19">
            <p>Ides na posledny level. Na Dusanovi je vidno, ze je troska nervozny, zapali si cigu a prisunie sa k tebe blizsie aby ta znervoznoval. Citis jeho pupok na chrbte, jeho pazuchove chlpy v uchu a jeho smradlavy dych na zatylku. Boha jeho. Chytas flashbacky na cas kedy si ministroval v kostole a ked ti pan Fararko omylom pokladal jeho fialoveho hada na citanku.</p>
            <span @click="startLevel()" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 20">
            <p>&quot;Hm. Dal si to. Gratulujem. Si dobry kamosko. To som fakt necakal. Kazdopadne. Drzim palce.&quot;</p>
            <p>Podarilo sa ti zajebat najvyssie high score v Space Invaders. Mas reflexy jak tvojka manka ked si jej coroval cigarety z kabelky.</p>

            <div v-if="player.finished_chapters.indexOf(2) != -1 && player.finished_chapters.indexOf(3) != -1">
                <p>&quot;Uz je tolko hodin krista boha. Tatko pride zachvilu domov a pojdete palit babke sviecku. Upaluj domov.&quot;</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
            <div v-else>
                <p>Je vsak treba pokracovat dalej. Do vecera este casu. Kam sa vydas teraz?</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['player', 'step'],
        data() {
            return {
                timer: 0,
                interval: null,
                textToType: '',
                textAlreadyTyped: '',
                level: 0,
                //⬅ ➡ ⬆ ⬇
                levels: [
                    {
                        time: 10,
                        length: 4,
                        text: '←→↓↑najtkol'
                    },
                    {
                        time: 6,
                        length: 8,
                        text: '←→↓↑←→↓↑najktol'
                    },
                    {
                        time: 7,
                        length: 12,
                        text: '←→↓↑↓↑↓↑→→↓↑najtkol'
                    },
                    {
                        time: 9,
                        length: 20,
                        text: '←←→→↓↑→←→↓↑→←najtkol→↓↑→←→→'
                    },
                    {
                        time: 11,
                        length: 30,
                        // text: 'zem pradavnych slnk v chladnom tieni tajomstiev na mapach jej davno niet zem pradavnych slnk nepoznas jej zalospev more nevyda viac ten svet kamosko→→→→'
                        text: '111111111111111111111111111111'
                    },
                    {
                        time: 14,
                        length: 40,
                        //text: 'ked som bol maly tak som nasiel v skrini velky cierny vibrator spytal som sa mami mama co to je preco to mas v skrini mama sa len usmiala a zacala ma s vibratorom nahanat↑'
                        text: '1111111111111111111111111111111111111111'
                    }
                ]
            }
        },
        mounted() {
            window.addEventListener('keyup', (e) => {
                this.keyUp(e)
            })

            bus.$on('map/clicked/4', (destination) => {
                if (this.player.finished_chapters.indexOf(2) != -1 && this.player.finished_chapters.indexOf(3) != -1) {
                    if (destination == 'domov') {
                        this.$emit('setChapter', 5)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(4)
                        bus.$emit('closeMap')
                    } else {
                        bus.$emit('map/changeLabel', 'Musis ist domov, kamosko.')
                    }
                }
                else if (destination == 'mur') {
                    if (this.player.finished_chapters.indexOf(3) != -1) {
                        bus.$emit('map/changeLabel', 'Tam sme uz boli, kamosko.')
                    } else {
                        this.$emit('setChapter', 3)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(4)
                        bus.$emit('closeMap')
                    }
                } else if (destination == 'ihrisko') {
                    if (this.player.finished_chapters.indexOf(2) != -1) {
                        bus.$emit('map/changeLabel', 'Tam sme uz boli, kamosko.')
                    } else {
                        this.$emit('setChapter', 2)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(4)
                        bus.$emit('closeMap')
                    }
                } else if (destination == 'ovladac') {
                    bus.$emit('map/changeLabel', 'Tu sa nachadzas.')
                } else {
                    bus.$emit('map/changeLabel', 'Zatial nie, kamosko.')
                }
            })
        },
        methods: {
            startTimer() {
                this.$emit('setDisabled', {
                    new: true,
                    save: true,
                    load: true
                })
                this.interval = setInterval(() => {
                    if (this.player.cheats_enabled == false) this.timer--
                    if (this.timer == 0) {
                        this.$emit('setStep', 14)
                        this.stopTimer()
                        this.textAlreadyTyped = '',
                        this.textToType = this.levels[this.level].text
                        this.level = 1
                        this.$emit('setDisabled', {
                            new: false,
                            save: false,
                            load: false
                        })
                    }
                }, 1000)
            },
            stopTimer() {
                clearInterval(this.interval)
                this.$emit('setDisabled', {
                    new: false,
                    save: true,
                    load: false
                })
            },
            startLevel() {
                this.$emit('setStep', 13)

                var level = this.levels[this.level]
                var max = Math.floor(Math.random() * (level.length))
                var text = ''
                var arrows = ['←', '→', '↓', '↑']
                for (let i = 0; i <= max; i++) {
                    text += arrows[Math.floor(Math.random() * 4)]
                }

                var words = ['najtkol', 'najtkol', 'najtlok', 'najktol']
                var word = words[Math.floor(Math.random() * words.length)]
                text += word

                max = level.length + word.length - text.length
                for (let i = 1; i <= max; i++) {
                    text += arrows[Math.floor(Math.random() * 4)]
                }

                this.textToType = text
                this.timer = this.levels[this.level].time
                this.startTimer()
            },
            keyUp(e) {
                //⬅ ➡ ⬆ ⬇
                if (e.key == this.textToType[0] ||
                    (e.key == 'ArrowLeft' && this.textToType[0] == '←') ||
                    (e.key == 'ArrowRight' && this.textToType[0] == '→') ||
                    (e.key == 'ArrowUp' && this.textToType[0] == '↑') ||
                    (e.key == 'ArrowDown' && this.textToType[0] == '↓')) {
                    this.textAlreadyTyped += this.textToType[0]
                    this.textToType = this.textToType.substr(1)
                }

                if (this.textAlreadyTyped.length == this.levels[this.level].length + 7) {
                    this.stopTimer()
                    this.$emit('setStep', this.level + 15)
                    if (this.level == 5) {
                        this.$emit('setDisabled', {
                            new: false,
                            save: false,
                            load: false
                        })
                    }
                    // this.$emit('setStep', this.level + 20)
                    this.textAlreadyTyped = ''
                    this.level++
                }
            },
            showMap() {
                bus.$emit('openMap')
            }
        },
        watch: {
            step: function() {
                //this.stopTimer()
            }
        }
    }
</script>

<style>
    .typed-chars {
        color: black;
        background-color: white;
        font-size: 32px;
    }
    .not-yet-typed-chars {
        font-size: 32px;
    }
    .timer {
        float: right;
        font-size: 50px;
    }
</style>