<template>
    <div>
        <div v-if="step == 0">
            <p>Upalujes co ti nohy stacia a blizis sa na vychyrene Dubravske detske ihrisko. Teraz ho mozno poznas pod menom ZIHADIELKO. Vtedy v 87 sa vsak nevolalo nijak. Len ihrisko. Az neskor sa niekto rozhodol ho pomenovat podla veci, ktora je schopna vase decko sparalizovat alebo usmrtit. Zaparkujes bajk v bezpecnej vzdialenosti, opries ho o <span class="choice" @click="$emit('setStep', 1)">strom</span> a zosadnes.</p>

            <p>V dialke vidis gang neprijemne sa tvariacich chalanov. 4 skarede gorily a medzi nimi tvoj hlavny enemy. Skulavy Samo. Par metrov od nich v piesku jeden maly chlapec a jedno male blondave dievcatko hadzu po sebe piesok a cpu si do papuliek nieco hnede a jemne tekute. Nechces vediet co to je. Ale obaja vyzeraju, ze im chuti. Chlapec sa lahodne zalizne a usmeje sa jak keby prave schostnil burger od Axela.</p>

            <p>Co urobis?</p>
            <div class="choice" @click="$emit('setStep', 2)">Prikrocim blizsie ku gangu goril a Skulavemu Samovi.</div>
            <div v-if="player.inventory.indexOf('sekera') != -1" class="choice" @click="$emit('setStep', 3)">Zoberem do ruky sekeru.</div>
            <div v-if="player.inventory.indexOf('bejzbolka') != -1" class="choice" @click="$emit('setStep', 4)">Zoberem do ruk bejzbalku.</div>
            <div v-if="player.inventory.indexOf('prak') != -1" class="choice" @click="$emit('setStep', 5)">Nachystam si prak.</div>
        </div>

        <div v-if="step == 1">
            <p>Stary minimalne 50 rocny orech, v jeho korunach je schovany skulavy krivy holub, ktory sa ta snazi osrat. Hod si 1d6, aby si zistil ci ta oserie alebo sa mu vyhnes.</p>

            <div v-if="diceRoll(6) <= 3" class="choice" @click="$emit('setStep', 1.1)">HOD</div>
            <div v-else class="choice" @click="$emit('setStep', 1.2)">HOD</div>
        </div>
        <div v-if="step == 1.1">
            <p>Dostanes vtacie hovno na celo. Nadavas. Ale co sa da robit, taky je zivot. Raz dostanes na hubu. Inokedy kulo na celo. Teraz mas hovnovu peciatku na cele a vyzeras trocha jak Teal'C z Hviezdnej Brany.</p>
            <span @click="$emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 1.2">
            <p>Vidis ako na teba hovno spomalene leti, jak bullet time z Maxa Payna. Cely svet sa spomali. V poslednej chvili sa vsak obratne uhnes. Hovno dopadne vedla. Zodvihnes zo zeme kamen a jebnes ho po vtakovi. Ten je uz vsak davno prec. Bol to hit & run kamosko. A ty si bol obet.</p>
            <span @click="$emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
        </div>

        <div v-if="step == 2">
            <p>Jak najvacsi pan/pani. Nepotrebujes ziadne zbrane. Ziaden armor. Lebo na tvojej strane je pravda a spravodlivost a Nightcall. Kracas pomaly ale isto jak terminator k skulavemu Samovi. Ked ta zbada spolu s jeho gangom goril, tak sa otocia tvojim smerom. Samovi sa rozchadzaju oci do vsetkych svetovych stran, z kutiku ust mu steka slina a mastne vlasty ma prilepene na cele jak taky chuj.</p>

            <p>&quot;Ahaha. Kto ze to je. Neni to Kokotsky-{{ player.name }}? Ano, je to on/ona!&quot;</p>

            <p>Vsetky gorily sa zborovo zasmeju.</p>

            <p>&quot;Kamosko, si si vybral/-a zle miesto na prechadzku. Prave si vstupil/-a do teritoria Skulaveho Sama. A kto raz vojde, do teritoria Skulaveho Sama. Zivy neodide. Dostanes na hubu {{ player.name }}.&quot;</p>

            <p>Necakas na nic. Ziadne zavahanie. Si jak Judge Dredd. Vykrocis oproti Samovi. Pomaly ale sebaisto. Skor ako sa Samo stihne spamatat, dostane kopacku na solar. Ustoji to vsak jak pan a okamzite na teba reaguje pravym hakom.</p>

            <div v-if="diceRoll(6) <= 3" class="choice" @click="$emit('setStep', 2.1)">Hod si 1d6 ci to ustojis alebo nie.</div>
            <div v-else class="choice" @click="$emit('setStep', 2.2)">Hod si 1d6 ci to ustojis alebo nie.</div>
        </div>

        <div v-if="step == 2.1">
            <p>Dostanes pravy hak rovno na fejs. Vypne ta ako keby si dostal/-a kladivom. Uz nic. Len tma. Zomrel si kamo. Si mrtvy. Nabuduce rozmyslaj do pici. Sam/-a a neozbrojeny/-a ides proti 5 gorilam? More, akoze prepacime ti vsetko mozne. Ale toto ne.</p>
        </div>
        <div v-if="step == 2.2">
            <p>Mas viac stastia ako rozumu. Vyhnes sa pravemu haku obratne jak Tatranska kuna Miro. Okamzite reagujes a hitujes ho naspat. Skulavy Samo dostane bombu na fejs a zvali sa na zem. V tom momente sa vsak na teba vrhnu vsetky 4 gorily naraz.</p>

            <p>Co urobis?</p>
            <div class="choice" @click="$emit('setStep', 2.3)">Utekam dopice prec.</div>
            <div class="choice" @click="$emit('setStep', 2.4)">Citim sa jak Rambo. Idem po nich.</div>
        </div>
        <div v-if="step == 2.3">
            <p>Zvrtnes sa na tvojich detskych nohach a upalujes pred gorilami, co ti sily stacia.</p>
            <div v-if="diceRoll(6) <= 3" class="choice" @click="$emit('setStep', 2.31)">Hod si 1d6 nech zistis, ci sa ti podari pred nimi utiect.</div>
            <div v-else class="choice" @click="$emit('setStep', 2.32)">Hod si 1d6 nech zistis, ci sa ti podari pred nimi utiect.</div>
        </div>
        <div v-if="step == 2.31">
            <p>Bezis jak Forrest Gump. Nestaci. Uz-uz si pri svojej BMXke. V tom momente vsak zakopnes o koren stromu a vyjebes sa na zem. Skor ako stihnes zareagovat. Vsetky 4 gorili su na tebe a kopu ta hlava nehlava. Jak planeta opic kamosko. Zrazu ta vypne. A si mrtvy/-a. Skoda. Nabuduce rozmyslaj do pici. Sam/-a a neozbrojeny/-a ides proti 4 gorilam? More, akoze prepacime ti vsetko mozne. Ale toto ne.</p>
        </div>
        <div v-if="step == 2.32">
            <p>Sprintujes jak Usain Bolt. Dobehnes k BMXke. Rychlo nasadas, gorilam ukazujes fakere a ficis dalej.</p>

            <div v-if="player.finished_chapters.indexOf(3) != -1 && player.finished_chapters.indexOf(4) != -1">
                <p>&quot;Uz je tolko hodin krista boha. Tatko pride zachvilu domov a pojdete palit babke sviecku. Upaluj domov.&quot;</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
            <div v-else>
                <p>Kam teraz kamosko?</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
        </div>

        <div v-if="step == 2.4">
            <p>Zacne ti prave hrat hlavna tema z Red Dead Redemption II. Ides po nich.</p>
            <div v-if="diceRoll(6) <= 4" class="choice" @click="$emit('setStep', 2.41)">Hod si 1d6, nech vies ako to dopadne.</div>
            <div v-else class="choice" @click="$emit('setStep', 2.42)">Hod si 1d6, nech vies ako to dopadne.</div>
        </div>
        <div v-if="step == 2.41">
            <p>Rozbehnes sa na prvu gorilu a mieris kopacku na brucho. Akonahle sa vsak tvoja biedna nozka dotkne jeho brusneho svalu tak padas na zem jak mech. Setky 4 gorili su na tebe a kopu ta hlava nehlava. Jak planeta opic kamosko. Zrazu ta vypne. A si mrtvy/-a. Skoda. Nabuduce rozmyslaj do pici. Sam/-a a neozbrojeny/-a ides proti 4 gorilam? More, akoze prepacime ti vsetko mozne. Ale toto ne.</p>
        </div>
        <div v-if="step == 2.42">
            <p>Nevies preco to spravis takto, ale spravis to tak. Vyberies z vacku past a predstieras, ze ide o Colt. Pif, pif, pif, paf do pice. Vsetky 4 gorily sa zrutia na zem. Si jak Clint Eastwoodov mladsi syn/dcera. Vsade su mlaky krvi. Gorili sa zvyjaju v krcoch jak Mojsej po 2 flaskach vodky. Dal/-a si to. Neveris tomu. Ale dal/-a si to. Pomsta je dokonana. Skulavy Samo dostal na picu, gorily su spacifikovane a ty zijes. Kam sa vydas teraz?</p>

            <div v-if="player.finished_chapters.indexOf(3) != -1 && player.finished_chapters.indexOf(4) != -1">
                <p>&quot;Uz je tolko hodin krista boha. Tatko pride zachvilu domov a pojdete palit babke sviecku. Upaluj domov.&quot;</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
            <div v-else>
                <p>Kam sa vydas teraz?</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
        </div>

        <div v-if="step == 3">
            <p>Sekera v ruke. Kracas pomaly ale isto jak terminator k skulavemu Samovi. Ked ta zbada spolu s jeho gangom goril, tak sa otocia tvojim smerom. Samovi sa rozchadzaju oci do vsetkych svetovych stran, z kutiku ust mu steka slina a mastne vlasty ma prilepene na cele jak taky chuj.</p>

            <p>&quot;Ahaha. Kto ze to je. Neni to Kokotsky-{{ player.name }}? Ano, je to on/ona! A nese si v ruke sekeru jak Janosikov retardovany bratranec/sesternica. Kokotsik.&quot;</p>

            <p>Vsetky gorily sa zborovo zasmeju.</p>

            <p>&quot;Kamosko, si si vybral/-a zle miesto na prechadzku. Prave si vstupil/-a do teritoria Skulaveho Sama. A kto raz vojde, do teritoria Skulaveho Sama. Zivy neodide. Dostanes na hubu {{ player.name }}.&quot;</p>

            <p>Necakas na nic. Ziadne zavahanie. Si jak Judge Dredd. Vykrocis oproti Samovi. Pomaly a sebaisto. Sekera v ruke. Nechapes, preco pred tebou neutekaju. Asi nehrali Hotline Miami. Ides rovno po Samovi. Gorili rozjebes neskor. Paris od MOONa bubnuje v tvojich usiach.</p>

            <div v-if="diceRoll(6) <= 3" class="choice" @click="$emit('setStep', 3.1)">Hod si 1d6.</div>
            <div v-else class="choice" @click="$emit('setStep', 3.2)">Hod si 1d6.</div>
        </div>
        <div v-if="step == 3.1">
            <p>Samo sa rozbehne na teba. Chysta si pre teba kopacku na solar. Jeho noha leti na tvoju hrud. Zazenies sa sekerou ale neskoro. Schytas kopacku a zvalis sa na zem. Rychle vsak skocis naspat na nohy ako Jedi Master. Seknes mu po nohach sekerou. Jablcko praskne jak anal ministranta. Krv ti ostrieka celu tvar. Necakas na nic. Samo skulavo poskuluje po gorilach a skacka na jednej nohe. Spomenies si na Monty Pythonov a zoseknes mu aj druhu nohu. Metodicky pokracujes dalej. Prava ruka. Lava ruka. Jeho krvave torzicko sa kruti na zemi.</p>
            <span @click="$emit('setStep', 3.3)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 3.2">
            <p>Samo sa rozbehne na teba. Chysta si pre teba kopacku na solar. Predvidas jak Jedi Master. Jeho noha leti na tvoju hrud. Zazenies sa sekerou. Jablcko praskne jak anal ministranta. Krv ti ostrieka celu tvar. Necakas na nic. Samo skulavo poskuluje po gorilach a skacka na jednej nohe. Spomenies si na Monty Pythonov a zoseknes mu aj druhu nohu. Metodicky pokracujes dalej. Prava ruka. Lava ruka. Jeho krvave torzicko sa kruti na zemi.</p>
            <span @click="$emit('setStep', 3.3)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 3.3">
            <p v-if="player.inventory.indexOf('slanina') != -1">V tom ti napadne super myslienka. Vytiahnes z ruksaku slaninu. Nacpes ju Samovi do ust. Stupis mu na fejs tvojou adidaskou a zatlacis. Precedis medzi zubami ,"Prazenicaaaaa!" Oci mu vylezu z dierok a vrch lebky vybuchne ala sampanske. Vzduch voni jak anglicke ranajky. Vsetky gorili okolo sa rozplacu a zacnu utekat od teba prec.</p>

            <p v-else-if="player.inventory.indexOf('parok') != -1">V tom ti napadne super myslienka. Vytiahnes z ruksaku parok. Nacpes ho Samovi do oka. Stupis mu na fejs tvojou adidaskou a zatlacis. Oci mu vylezu z dierok, vystrelia parok vysoko do vzduchu a vrch lebky vybuchne ala sampanske. Vzduch voni jak udene. Vsetky gorili okolo sa rozplacu a zacnu utekat od teba prec.</p>

            <p v-else-if="player.inventory.indexOf('sojovy jogurt') != -1">V tom ti napadne super myslienka. Sak si predsa umelec dpc. Vytiahnes z ruksaku sojovy jogurt. Nacpes ho Samovi do ust. Stupis mu na fejs tvojou adidaskou a zatlacis. Oci mu vylezu z dierok, zakusne a do vzduchu vystrekne krv a vanilkovy jogurt. Vrch lebky vybuchne ala sampanske. Vzduch voni jak vanilka a krv. Mnam dopici. Vsetky gorili okolo sa rozplacu a zacnu utekat od teba prec.</p>

            <p v-else-if="player.inventory.indexOf('Colgate Herbal') != -1">V tom ti napadne super myslienka. Stale mas svoju artisticku zubnu pastu. Vyberes ju z vacku a namalujes na Samove torzicko velku cicinu. Vsetky gorili okolo sa rozplacu a zacnu utekat od teba prec. Pocujes len ako kricia ,"Nieee, nieeee. Cicinaaaa. Nieeeee!"</p>

            <p v-else>Je cas to ukoncit. Stupis mu na fejs tvojou adidaskou a zatlacis. Oci mu vylezu z dierok a vrch lebky vybuchne jak sampanske. Vsetky gorili okolo sa rozplacu a zacnu utekat od teba prec.</p>

            <p>Utekas za gorilami a ides ich finishnut?</p>
            <p>
            <div class="choice" @click="$emit('setStep', 3.4); $emit('removeItem', 'slanina'); $emit('removeItem', 'parok'); $emit('removeItem', 'sojovy jogurt');">ANO</div>
            <div class="choice" @click="$emit('setStep', 3.5); $emit('removeItem', 'slanina'); $emit('removeItem', 'parok'); $emit('removeItem', 'sojovy jogurt');">NIE</div>
        </div>
        <div v-if="step == 3.4">
            <p>Zacne ti hrat v hlave hlavna tema z Red Dead Redemption 2. Nevies preco to spravis takto, ale spravis to tak. Vyberies z vacku past a predstieras, ze ide o Colt. Pif, pif, pif, paf do pice. Vsetky 4 gorily sa zrutia na zem. Si jak Clint Eastwoodov mladsi syn/dcera. Vsade su mlaky krvi. Gorili sa zvyjaju v krcoch jak Mojsej po 2 flaskach vodky. Dal/-a si to. Neveris tomu. Ale dal/-a si to. Pomsta je dokonana. Skulavy Samo dostal na picu (jemne povedane), gorily su spacifikovane a ty zijes.</p>

            <div v-if="player.finished_chapters.indexOf(3) != -1 && player.finished_chapters.indexOf(4) != -1">
                <p>&quot;Uz je tolko hodin krista boha. Tatko pride zachvilu domov a pojdete palit babke sviecku. Upaluj domov.&quot;</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
            <div v-else>
                <p>Kam sa vydas teraz?</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
        </div>
        <div v-if="step == 3.5">
            <p>Si mierumilovny/-na jak Gandhi kamosko. V najlepsom je treba skoncit. Nechas gorily utiect a zamieris si to naspat k BMXke. Samo dostal na picu (jemne povedane), gorily su spacifikovane a ty zijes.</p>

            <div v-if="player.finished_chapters.indexOf(3) != -1 && player.finished_chapters.indexOf(4) != -1">
                <p>&quot;Uz je tolko hodin krista boha. Tatko pride zachvilu domov a pojdete palit babke sviecku. Upaluj domov.&quot;</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
            <div v-else>
                <p>Kam sa vydas teraz?</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
        </div>

        <div v-if="step == 4">
            <p>Bejzbalka v ruke. Kracas pomaly ale isto jak terminator k skulavemu Samovi. Ked ta zbada spolu s jeho gangom goril, tak sa otocia tvojim smerom. Samovi sa rozchadzaju oci do vsetkych svetovych stran, z kutiku ust mu steka slina a mastne vlasty ma prilepene na cele jak taky chuj.</p>

            <p>&quot;Ahaha. Kto ze to je. Neni to Kokotsky-{{ player.name }}? Ano, je to on/ona! A nese si v ruke bejzbalku jak taky bejzbalovy kokotko. Bejzbalkokotko&quot;</p>

            <p>Vsetky gorily sa zborovo zasmeju.</p>

            <p>&quot;Kamosko, si si vybral/-a zle miesto na prechadzku. Prave si vstupil/-a do teritoria Skulaveho Sama. A kto raz vojde, do teritoria Skulaveho Sama. Zivy neodide. Dostanes na hubu {{ player.name }}.&quot;</p>

            <p>Necakas na nic. Ziadne zavahanie. Si jak Judge Dredd. Vykrocis oproti Samovi. Pomaly a sebaisto. Bejzbalka v ruke. Nechapes, preco pred tebou neutekaju. Asi nehrali Hotline Miami. Ides rovno po Samovi. Gorili rozjebes neskor. Paris od MOONa bubnuje v tvojich usiach.</p>

            <div v-if="diceRoll(6) <= 3" class="choice" @click="$emit('setStep', 4.1)">Hod si 1d6.</div>
            <div v-else class="choice" @click="$emit('setStep', 4.2)">Hod si 1d6.</div>
        </div>
        <div v-if="step == 4.1">
            <p>Samo sa rozbehne na teba. Chysta si pre teba kopacku na solar.  Jeho noha leti na tvoju hrud. Zazenies sa bejzbalkou ale neskoro. Schytas kopacku a zvalis sa na zem. Rychle vsak skocis naspat na nohy ako Jedi Master.  Jebnes mu po kolene bejzbalkou. Jablcko praskne jak anal ministranta. Krv ti ostrieka celu tvar. Necakas na nic. Samo skulavo poskuluje po gorilach a skacka na jednej nohe. Spomenies si na Monty Pythonov a rozjebes mu aj druhu nohu. Metodicky pokracujes dalej. Rozdtris na mindzu pravu ruku a nasledne aj lavu. Jeho krvave torzicko sa kruti na zemi. Zbytky ruk vyzeraju, jak vygrcany salat z Mekacu.</p>
            <span @click="$emit('setStep', 3.3)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 4.2">
            <p>Samo sa rozbehne na teba. Chysta si pre teba kopacku na solar. Predvidas jak Jedi Master. Jeho noha leti na tvoju hrud. Zazenies sa bejzbalkou. Jablcko praskne jak anal ministranta. Krv ti ostrieka celu tvar. Necakas na nic. Samo skulavo poskuluje po gorilach a skacka na jednej nohe. Spomenies si na Monty Pythonov a rozjebes mu aj druhu nohu. Metodicky pokracujes dalej. Rozdtris na mindzu pravu ruku a nasledne aj lavu. Jeho krvave torzicko sa kruti na zemi. Zbytky ruk vyzeraju, jak vygrcany salat z Mekacu.</p>
            <span @click="$emit('setStep', 3.3)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 5">
            <p>Prak v ruke. Kracas pomaly ale isto jak terminator k skulavemu Samovi. Ked ta zbada spolu s jeho gangom goril, tak sa otocia tvojim smerom. Samovi sa rozchadzaju oci do vsetkych svetovych stran, z kutiku ust mu steka slina a mastne vlasty ma prilepene na cele jak taky chuj.</p>

            <p>&quot;Ahaha. Kto ze to je. Neni to Kokotsky-{{ player.name }}? Ano, je to on/ona! A nese si v ruke prak jak taky prakovy praky-prakster. Prakovy kokotko, prakotko!</p>

            <p>Vsetky gorili sa zborovo zasmeju.</p>

            <p>&quot;Kamosko, si si vybral/-a zle miesto na prechadzku. Prave si vstupil/-a do teritoria Skulaveho Sama. A kto raz vojde, do teritoria Skulaveho Sama. Zivy neodide. Dostanes na hubu {{ player.name }}.&quot;</p>

            <p>Necakas na nic. Ziadne zavahanie. Si jak Judge Dredd. Vykrocis oproti Samovi. Pomaly a sebaisto. Bejzbalka v ruke. Nechapes, preco pred tebou neutekaju. Asi nehrali Hotline Miami. Ides rovno po Samovi. Gorili rozjebes neskor. Paris od MOONa bubnuje v tvojich usiach.</p>
            <div v-if="diceRoll(6) <= 3" class="choice" @click="$emit('setStep', 5.1)">Hod si 1d6.</div>
            <div v-else class="choice" @click="$emit('setStep', 5.2)">Hod si 1d6.</div>
        </div>
        <div v-if="step == 5.1">
            <p>Samo sa rozbehne na teba. Chysta si pre teba kopacku na solar.  Jeho noha leti na tvoju hrud. Vystrelis mu suter z praku do cela, vedla. Schytas kopacku a zvalis sa na zem. Rychle vsak skocis naspat na nohy ako Jedi Master.  Strielas dalsi suter rovno do kolena. Jablcko praskne jak anal ministranta. Krv ti ostrieka celu tvar. Necakas na nic. Samo skulavo poskuluje po gorilach a skacka na jednej nohe. Spomenies si na Monty Pythonov. Omotas mu do praku druhu nohu a metodicky jak Agent 47 trhnes. Vzduchom zasvisti krv a prasknutie kosti. Metodicky pokracujes dalej. Prava ruka. Lava ruka. Jeho krvave torzicko sa kruti na zemi. </p>
            <span @click="$emit('setStep', 3.3)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 5.2">
            <p>Samo sa rozbehne na teba. Chysta si pre teba kopacku na solar. Predvidas jak Jedi Master. Jeho noha leti na tvoju hrud. Strielas dalsi suter rovno do kolena. Jablcko praskne jak anal ministranta. Krv ti ostrieka celu tvar. Necakas na nic. Samo skulavo poskuluje po gorilach a skacka na jednej nohe. Spomenies si na Monty Pythonov. Omotas mu do praku druhu nohu a metodicky jak Agent 47 trhnes. Vzduchom zasvisti krv a prasknutie kosti. Metodicky pokracujes dalej. Prava ruka. Lava ruka. Jeho krvave torzicko sa kruti na zemi.</p>
            <span @click="$emit('setStep', 3.3)" class="choice">{{ lang.continue }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['player', 'step'],
        methods: {
            diceRoll(sides) {
                if (this.player.cheats_enabled == true) {
                    return sides
                }

                return Math.floor(Math.random() * sides) + 1
            },
            showMap() {
                bus.$emit('openMap')
            }
        },
        mounted() {
            bus.$on('map/clicked/2', (destination) => {
                if (this.player.finished_chapters.indexOf(3) != -1 && this.player.finished_chapters.indexOf(4) != -1) {
                    if (destination == 'domov') {
                        this.$emit('setChapter', 5)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(2)
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
                        this.player.finished_chapters.push(2)
                        bus.$emit('closeMap')
                    }
                } else if (destination == 'ovladac') {
                    if (this.player.finished_chapters.indexOf(4) != -1) {
                        bus.$emit('map/changeLabel', 'Tam sme uz boli, kamosko.')
                    } else {
                        this.$emit('setChapter', 4)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(2)
                        bus.$emit('closeMap')
                    }
                } else if (destination == 'ihrisko') {
                    console.log('here')
                    bus.$emit('map/changeLabel', 'Tu sa nachadzas.')
                } else {
                    bus.$emit('map/changeLabel', 'Zatial nie, kamosko.')
                }
            })
        }
    }
</script>
