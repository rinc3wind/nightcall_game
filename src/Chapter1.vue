<template>
    <div>
        <div v-if="step == 0">
            <b>Bratislava, 1987<br>
                9:42<br>
            </b>
            <br>
            Zvoni ti budik kamosko. Ticho v izbe pretne hlavna tema k Halloween od Johna Carpentera. Otvaras zalepene hnede karpinove oci a snazis sa nahmatat tvoj smartfon. Neni na policke pri posteli. Neni na stole. Co. Gde je? Vstanes a chyta ta jemna panika. Nemas telefoncek do pici. Tvoj cely zivot je prec. Panic pokracuje. O to vacsie prekvapenie ti rozvibruje analik, ked si uvedomis, ze tvoja izba vyzera inak.<br>
            <br>
            Niekto ta musel uniest. Si sice vo svojej izbe. Ale nie je to vlastne tvoja izba. Vsetko ako keby zostarlo. Ale zaroven je zname? Ako pocas detstva, ktore si nikdy nemal/a, ale vzdy chcel/a mat. Nechapacky. Kazdopadne. Napadla ti skvela vec. Ides otvorit okno, kuknes sa ven a potom sa rozhodnes co budes robit. Ulica vyzera presne tak ako si ju pamatas. Pokojne oktobrove rano v Dubravke. Na zemi su popadane zhnite listy a vzduch vonia presne ako jesen. Rozhliadnes sa lepsie po izbe.<br>
            <br>
            Po tvojom laptope ani stopy.

            Na stole zostal len

            <span v-if="player.inventory.indexOf('walkman') == -1">
                <span class="choice"
                    @click="$emit('pickupItem', {item: 'walkman', note: 'Das si walkmana do vacku, sluchadla okolo krku. (walkman sa da pustit kliknutim na predmet walkman v inventari)'})">
                    walkman
                </span>
                ,
            </span>

            <span v-if="player.inventory.indexOf('cigarety & zapalovac') == -1">
                <span class="choice"
                    @click="$emit('pickupItem', {item: 'cigarety & zapalovac', note: 'Zoberes zo stolu cigy a zapik. Stale fajcis, aj ked by si nemal/-a. Urcite sa zidu.'})">
                    cigarety & zapalovac
                </span>
                a
            </span>
            tlaceny plagat na Nightcall, ktory sa odohrava dnes vecer, v pravom hornom rohu vidis Kulturak, Bratislava, 1987.<br>

            <br>
            Vsetky tvoje videoherne plagaty su prec. Zostal len The Thing od Carpentera a Star Wars. V rohu
            miestnosti sa zjavil stary televizor a k nemu pripojene NESko. Na boku telky je velka <span class="choice" @click="$emit('note', 'Je to cisto biela samolepka, na ktorej je fixou naskrabane - Ivanov televizor, nechytat lebo ti donesem domov dalsie tri.')">samolepka</span>.<br>
            <br>
            Rozmyslas co budes robit. Zavetris vsak velmi prijemnu vec. Slaninka a vajicka. Pomarancovy dzusik a kava. Niekto robi ranajky. A ty slintas jak Ibi Maiga nad jeho bronzovou bustou.<br>
            <br>
            Co urobis, kamosko?<br>
            <br>
            <div class="choice" @click="$emit('setStep', 1)">Idem do kuchyne, sak som hladny more.</div>
            <div class="choice" @click="$emit('setStep', 2)">Idem do kupelne, najprv hygiena potom jedlo.</div>
        </div>

        <div v-if="step == 1">
            <p>Otvoris dvere tvojej detskej izby. Vidis pred sebou staru znamu chodbu. Horcicovy chlpaty koberec,
                otapetovane steny. Po lavej strane je hned kupelna. Do tej vsak nejdes, lebo si prilis cool na
                umyvanie zubov. Mas rad/-a ked ti smrdi z papule. Prejdes po chodbe az na koniec a po schodoch zides dolu do kuchyne.</p>

            <div class="choice" @click="$emit('setStep', 3)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 2">
            <p>Otvoris dvere tvojej detskej izby. Vidis pred sebou staru znamu chodbu. Horcicovy chlpaty koberec, otapetovane steny. Po lavej strane je hned kupelna. Vojdes dnu. A skoro ta jebne. Zbadas totiz sameho seba v zrkadle. A nieco nesedi. Vyzeras na 13. Presne si pamatas ten tvoj idiotsky usmev z detskych fotiek.</p>

            <p> Okej. Sak ked sa horsie nestalo. Sak to neni uplne zle byt zase decko. Prikrocis k zrkadlu.
                Zeberes pastu

                <span v-if="player.inventory.indexOf('Colgate Herbal') == -1">
                    <span class="choice"
                        @click="$emit('pickupItem', {item: 'Colgate Herbal', note: 'Takto ujebavat z domu pastu, co ti poviem kamo. S cim si budu fotrovci teraz umyvat chrup s luntner pomazankou? Sa aspon tvoja mama hned aj naranajkuje. Kazdopadne, das si ju do vrecka.'})">
                        Colgate Herbal
                    </span>
                </span>
                <span v-else>
                    Colgate Herbal
                </span>

                , zajebes ju na kefku a suchas si zuby, az to prska kade-tade. Vydrzi ti to asi 30 sekund. Potom sa zacnes nudit. Kefku oplachnes a das ju naspat do poharika. Vyceris usmev do zrkadla jak Meky Zbirka na Ebi Roud a si ready na prazenicu.
            </p>

            <p>
                <span class="choice" @click="$emit('setStep', 2.5)">Idem do kuchyne.</span>
            </p>
        </div>

        <div v-if="step == 2.5">
            <p>Nachadzas sa pred kupelnou. Vidis pred sebou opat staru znamu chodbu. Horcicovy chlpaty koberec, otapetovane steny. Prejdes po chodbe az na koniec a po schodoch zides dolu do kuchyne.</p>
            <div class="choice" @click="$emit('setStep', 3)">{{ lang.continue }}</div>
        </div>

        <div v-if="step == 3">
            <p> Citis slaninku, vajicka a vonu kavy a cerstveho pomarancove dzusiku. Fajnove rano kamosko. Jak ked si bol maly. Akurat uz si stary. Sucks to be you.</p>

            <div v-if="player.family_status_m == true">
                <p> Vidis tvoju maminu, ktora obracia volske oka. Do toho jej hra Modern Talking - Cheri Cheri Lady. Ked ta zbada ako schadzas po schodoch, hned sa na teba otoci. {{ player.name }} ako si sa vyspal/-a? Das si vajicka?</p>
                <div class="choice" @click="$emit('setStep', 4)">Ano! Nakladaj!</div>
                <div class="choice" @click="$emit('setStep', 5)">Neee, chcem kornflejky!</div>
            </div>

            <div v-if="player.family_status_m == false">
                <p>Kuchyna je prazdna. Nikde nikoho. Na stole je tanier s vajickami & slaninkou a opecenym toastom. Vedla taniera je polozeny papier. Prides blizsie. Je to odkaz od tatka.</p>

                <p>{{ player.name }}, musel som utekat do prace. Spravil som ti vsak ranajky. V chladnicke najdes pomarancovy dzus. Pekne sa najedz. Hned jak dojdem z roboty, ideme na hroby. Pride aj tvoja mama. Bud ready a nehraj zase len NESko cely den.</p>

                <p> Ok. To znie celkom fajn. Vrhnes sa na jedlo. Vsetko zozeres ako keby si 100 rokov nejedol.
                </p>

                <div v-if="player.inventory.indexOf('Colgate Herbal') != -1">
                    <p> Dojedol si. Chces nakreslit so zubnou pastou na tanier curaka?</p>
                    <p><span class="choice" @click="$emit('setStep', 7)">ANO</span> / <span class="choice"
                            @click="$emit('setStep', 6)">NIE</span></p>
                </div>
                <div v-else class="choice" @click="$emit('setStep', 6)">{{ lang.continue }}</div>
            </div>
        </div>
        <div v-if="step == 4">
            <p>Mama ti nalozi na stol dve fajnove volske oka, ktore na teba zmurknu jak Pinokio na smirgel. Hned vedla nich je slaninka a opeceny toast. Vsetko zozeres ako keby si 100 rokov nejedol/nejedla. Hned ako dojes, mama ta oboznami s jej planom. Pojdeme na hroby zapalit dnes babke svicku. Chod sa teraz hrat alebo co. Zavolam ta potom. Pojde s nami aj tvoj tatko, len musime pockat kym sa vrati z roboty.&quot;</p>
            <div class="choice" @click="$emit('setStep', 6)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 5">
            <p>Krista boha {{ player.name }}. Kornflejky nemame. Prestan vymyslat. Nemas uz 5 rokov. Tu mas vajca a jedz. Mama ti nalozi na stol dve fajnove volske oka, ktore na teba zmurknu jak Pinokio na smirgel. Hned vedla nich je slaninka a opeceny toast. Vsetko zozeres ako keby si 100 rokov nejedol. Hned ako dojes, mama ta oboznami s jej planom. Pojdeme na hroby zapalit dnes babke sviecku. Chod sa teraz hrat alebo co. Zavolam ta potom. Pojde s nami aj tvoj tatko, len musime pockat kym sa vrati z roboty.&quot;</p>
            <div class="choice" @click="$emit('setStep', 6)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 6">
            <p>Dojedene. Co teraz? Mas pred sebou cely den flakania. Musis pockat kym sa tatko vrati z roboty. Sedis v kuchyni. V tom zazvoni telefon. Crrrn. Crrrrn. Vsimnes si, ze v kuchyni na stene mate velky oldskulovy telefon. Reagujes instinktivne. Postavis sa a zodvihnes ho.</p>

            <p> &quot;Halo. Tu {{ player.name }}.&quot;</p>

            <p> &quot;Nazdar {{ player.name }}. Tu Nightcall remaster.&quot;</p>

            <p> &quot;Co ti jebe, jak, ze Nightcall remaster?&quot;</p>

            <p> &quot;No normalne, vola ti Nightcall a kedze sme nestihali spravit regulerne pokracovanie tejto textovky, tak sme zbuchali aspon remaster. Ocuvaj teraz. Toto je dolezite. Nastal nejaky glitch ci co a omylom si sa dostal/-a do alternativnej minulosti. Si v Bratislave. V roku 1987. Vsetko je vsak troska ine. Kazdopadne. Casove dimenzie su skokotene a len ty ich mozes napravit. Lebo nikto nieje taky super ako ty kamosko. Musis spravit nasledujuce veci.</p>
            <p>Najdi velky Bratislavsky mur a ocuraj ho. Ocuraj ho poriadne! Urcite ale neocuraj Cyber Dzeremiho.
Zadel najvyssie high score v Space Invaders v lokalnej Arkadovej herni.
Zbi skulaveho Sama, ktory sikanuje vsetkych spoluziakov.
Zahraj Nightcall od Kavinskeho na organe v kostole pri Dubravskom cintorine.</p>

            <p>No ked toto vsetko spachas. Tak dojdi do Kulturaku. Pockaj ked bude akurat hrat Turbo Killer od Carpenter Brut, vylej na seba pivo a zakric "Nightcall dopiceeee!" a tym vratis vsetky sfery do poriadku. Chapeme sa {{ player.name }}? &quot;</p>
            <p>
            <div class="choice" @click="$emit('setStep', 8)">ANO</div>
            <div class="choice" @click="$emit('setStep', 9)">NIE</div>
        </div>
        <div v-if="step == 7">
            <p>Kedze si pravy umelec vyberes z vacku Colgate Herbal a na prazdny tanier nakreslis so zubnou pastou velku cicinu. Tatko sa potesi, ked to zbada. A keby existoval vtedy FPU aj grant by si dostal/-a.</p>
            <div class="choice" @click="$emit('setStep', 6)">{{ lang.continue }}</div>
        </div>

        <div v-if="step == 8">
            <p>Dobre, vybavene. Pokladame. Nightcall zacina o 20.00 v Kulturaku. Kulturak uz neni tam kde bol pred 2mi rokmi more, scul su kusek od vlakovej stanice. Dovtedy to musis vsetko stihnut kamosko. Ked ne, tak sa zmenis na stary mobilny telefon Nokia Cityman a cely tvoj zivot bude o tom, ze do teba budu ziapat a plut tlsti chlapi so zlatymi retazami na krku a to nechces.
            </p>
            <div class="choice" @click="$emit('setStep', 10)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 9">
            <p>Jak, ze sa nechapeme? More. Tak este raz.</p>

            <p>Najdi velky Bratislavsky mur a ocuraj ho. Ocuraj ho poriadne! Urcite ale neocuraj Cyber Dzeremiho.
Zadel najvyssie high score v Space Invaders v lokalnej Arkadovej herni.
Zbi skulaveho Sama, ktory sikanuje vsetkych spoluziakov.
Zahraj Nightcall od Kavinskeho na organe v kostole pri Dubravskom cintorine.</p>

            <p>No ked toto vsetko spachas. Tak dojdi do Kulturaku. Pockaj ked bude akurat hrat Turbo Killer od Carpenter Brut, vylej na seba pivo a zakric "Nightcall dopiceeee!" a tym vratis vsetky sfery do poriadku. Chapeme sa {{ player.name }}?</p>
            <div class="choice" @click="$emit('setStep', 10)">ANO</div>
        </div>
        <div v-if="step == 10">
            <p>Nightcall polozi telefon a tvoj den zacina, kamosko. Co ides robit?</p>
            <div class="choice" @click="$emit('setStep', 11)">Idem si zahrat NESko do izby.</div>
            <div class="choice" @click="$emit('setStep', 10.1)">Idem ocurat velky Bratislavsky mur.</div>
            <div class="choice" @click="$emit('setStep', 10.2)">Idem najst skulaveho Sama a zbit ho.</div>
            <div class="choice" @click="$emit('setStep', 10.3)">Idem do Arkadovej herne zajebat high score v Space Invaders.</div>
        </div>

        <div v-if="step == 10.1">
            <p>Kamosko, to je sice pekne, ze chces ist kuknut Bratislavsky mur, ale nevies kde to je. Musis zistit ako sa tam dostat.</p>
            <div class="choice" @click="$emit('setStep', 10)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 10.2">
            <p>Kamosko, to je sice pekne, ze chces ist zbit skulaveho Sama, ale nevies kde je. Musis zistit ako sa k nemu dostat.</p>
            <div class="choice" @click="$emit('setStep', 10)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 10.3">
            <p>Kamosko, to je sice pekne, ze chces ist do Arkadovej herne, ale nevies kde je. Musis zistit ako sa tam dostat.</p>
            <div class="choice" @click="$emit('setStep', 10)">{{ lang.continue }}</div>
        </div>

        <div v-if="step == 11">
            <p>Vyberes sa naspat do svojej detskej izby.
                <span class="choice" @click="$emit('note', 'Plagaty su 3. Uvedomis si, ze prvy krat si jeden prehliadol. Prvy poster je The Thing od Johna Carpentera, na druhom plagate je SW: Empire Strikes Back a na tretom Breakfast Club, z ktoreho na teba zmurka Molly Ringwald.')">Plagatiky</span>
                stale vysia bez zivota na stenach jak udy starych vyschnutych muzov v saune. Telka a NESko v rohu miestnosti uz na teba pozmurkavaju. Stary obity pracovny stol stoji smutne na styroch kovovych nohach. Co teraz kamosko?</p>
            <div class="choice" @click="$emit('setStep', 11.1)">Idem sa hrat NESko</div>
            <div class="choice" @click="$emit('setStep', 11.2)">Prehladam lepsie stol.</div>
        </div>
        <div v-if="step == 11.1">
            <p>Zapnes televizor, NESko a ides. Mas jeden jediny cartridge. Cheetahman II. Co to kurva je? Nikdy v zivote si o tejto hre nepocul. Na covery je nejaky sfetovany gepard. Boha toto bude. Nenechas sa vsak odradit a ides na to.</p>

            <p>Hras 5 minut. Ide ta jebnut. Hras 10 minut. Mas spotene genitalie. Kvapky zelenho potu sa formuju na tvojom hladko oholenom podhambi. Hras 15 minut. Zacinas agresivne stlacat ovladac. Davas 20 minut a na cele ti zacne navierat velka fialova zila. Toto nedavas. Stacilo. Mas chut vsetko rozjebat. Preco by si mal akurat tuto jednu hru? Co si komu spravil? Kto toto nakodil, Andrej Danko?</p>

            <p>Vypinas telku. Vypinas NESko. Toto hrat nebudes.</p>

            <p>Chces si vyskusat Cheetahmana II zahrat este raz?</p>
            <p><span class="choice" @click="$emit('setStep', 11.11)">ANO</span> / <span class="choice"
                    @click="$emit('setStep', 11.12)">NIE</span></p>
        </div>
        <div v-if="step == 11.11">
            <p>Kamo. Nie. Toto uz hrat nebudes. Stacilo.</p>
            <div class="choice" @click="$emit('setStep', 11)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 11.12">
            <p>Tvoje virtualne alter-ego si prave nahlas vydychlo. Stacilo.</p>
            <div class="choice" @click="$emit('setStep', 11)">{{ lang.continue }}</div>
        </div>
        <div v-if="step == 11.2">
            <p>Prezries lepsie stol. V pravom dolnom rohu zbadas nozikom vyryty malicky mobilny telefon. Jemne po nom prejdes palcom. Stol zrazu zacne sycat a triast sa. Nadskakuje hore dole ako pri zemetraseni v Hrnciarovciach v 95tom. Zrazu prestane skakat. Daco zahromzi a a zo spodu sa vysunie zasuvka, v ktorej najdes <span class="choice" @click="$emit('pickupItem', {item: 'mapa'}); $emit('setStep', 11.21)">mapu</span>.
            </p>
        </div>
        <div v-if="step == 11.21">
            <p>Vezmes ju a hned aj rozbalis. Ide o mapu Bratislavy kde su zakruzkovane 4 miesta.</p>
            <p>Arkadova herna &quot;U dojebaneho ovladaca&quot; <br>Detske ihrisko a s fixkou dopisana poznamka:
                &quot;Dojebat skulaveho Sama&quot; <br>Re:Fresh Club <br>a Bratislavsky mur, ktory predeluje
                Kamenne namestie</p>

            <p>Uz vies kam mas ist. Tvoja cesta je jasna. Citis sa jak
                Rick Deckard. Skor ako vyrazis na toto dobrodruzstvo je treba si zbalit batoh. Co si
                pribalis do ruksaku?</p>

            <div class="choice"
                @click="$emit('pickupItem', {items: ['slanina', 'prak', 'flaska coca coly']}); $emit('setStep', 11.3)">
                slaninu, prak, flasku coca coly</div>
            <div class="choice"
                @click="$emit('pickupItem', {items: ['parok', 'bejzbolka', 'flaska coca coly']}); $emit('setStep', 11.3)">
                parok, bejzbolku, flasku coca coly</div>
            <div class="choice"
                @click="$emit('pickupItem', {items: ['sojovy jogurt', 'sekera', 'flasa vodky']}); $emit('setStep', 11.3)">
                sojovy jogurt, sekeru, flasu vodky</div>
            <div class="choice"
                @click="$emit('setStep', 11.3)">
                Neberem si nic, secko mam.</div>
        </div>
        <div v-if="step == 11.3">
            <p>Dobra volba kamosko. Teraz kam? Pome na to. Musis zachranit svet, boha.</p>
            <div class="choice" @click="showMap()">Pozri do mapy.</div>
        </div>
        <div v-if="step == 11.41">
            <p>Vyjdes von z baraku. Vzduch voni jak plesnive listy a tekvica.
            <span v-if="player.inventory.indexOf('cigarety & zapalovac') != -1">Zapalis si cigosku. </span>
            <span v-if="player.inventory.indexOf('walkman') != -1">Zadelis si na usi sluchadla a zapnes walkmana. Zacne ti hrat {{ player.song }}.</span>
            Naskocis na svoju bmxku, zaflekujes a upalujes cez jesennu Bratislavu za svojim cielom.</p>
            <span @click="$emit('setChapter', 3); $emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 11.42">
            <p>Vyjdes von z baraku. Vzduch voni jak plesnive listy a tekvica.
            <span v-if="player.inventory.indexOf('cigarety & zapalovac') != -1">Zapalis si cigosku. </span>
            <span v-if="player.inventory.indexOf('walkman') != -1">Zadelis na usi sluchadla a zapnes walkmana. Zacne ti hrat {{ player.song }}.</span>
            Naskocis na svoju bmxku, zaflekujes a upalujes cez jesennu Bratislavu za svojim cielom.</p>
            <span @click="$emit('setChapter', 2); $emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 11.43">
            <p>Vyjdes von z baraku. Vzduch voni jak plesnive listy a tekvica.
            <span v-if="player.inventory.indexOf('cigarety & zapalovac') != -1">Zapalis si cigosku. </span>
            <span v-if="player.inventory.indexOf('walkman') != -1">Zadelis na usi sluchadla a zapnes walkmana. Zacne ti hrat {{ player.song }}.</span>
            Naskocis na svoju bmxku, zaflekujes a upalujes cez jesennu Bratislavu za svojim cielom.</p>
            <span @click="$emit('setChapter', 4); $emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['player', 'step'],
        methods: {
            showMap() {
                bus.$emit('openMap', 1)
            }
        },
        mounted() {
            bus.$on('map/clicked/1', (destination) => {
                if (destination == 'mur') {
                    this.$emit('setStep', 11.41)
                    bus.$emit('closeMap')
                } else if (destination == 'ovladac') {
                    this.$emit('setStep', 11.43)
                    bus.$emit('closeMap')
                } else if (destination == 'ihrisko') {
                    this.$emit('setStep', 11.42)
                    bus.$emit('closeMap')
                } else if (destination == 'domov') {
                    bus.$emit('map/changeLabel', 'Tu sa nachadzas.')
                } else {
                    bus.$emit('map/changeLabel', 'Zatial nie kamosko.')
                }
            })
        }
    }
</script>
