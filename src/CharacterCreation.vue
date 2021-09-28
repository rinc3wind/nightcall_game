<template>
    <div>
        <div v-if="step == 0">
            <b>29. oktober 2021<br>
                23:56<br>
                Bratislava<br>
            </b>
            <br>
            Je studena, uprsana oktobrova noc. Ako kazdy vecer, aj dnes sedis do noci za pocitacom, jak taky osamely nerd. Mas pootvorenu okenicu nech ti aspon troska prudi vzduch v izbe. Tma. Celu izbu matne ozaruje len obrazovka tvojho blikajuceho stareho laptopu.<br>
            <br>
            Prekliknes tab na tvarovu knihu aka facebook. Boha jeho. Zase ta odhlasilo. Ides sa prihlasit. Cely interface je vsak nejaky zvlastny. Namiesto emailu a hesla to chce po teba tvoje meno. Klasicka modra obrazovka. Fko v kruzku. A krizom cez celu obrazovku svieti iba jeden riadok.<br>
            <br>
            <b>"Zadaj svoje meno kamosko. Staci prve. Napr. Arnold, Xena alebo Dzeremy"</b><br>
            <br>
            <input autofocus v-model="player.name" @keyup.enter="$emit('setStep', 1)">
        </div>

        <div v-if="step == 1">
            Naklikas svoje meno, obrazovka sa znova nacita a cez monitor svieti dalsia otazka.<br>
            <br>
            "Si z kompletnej rodiny? Vyber <span class="choice"
                @click="$emit('setStep', 3); player.family_status = true; player.family_status_m = true; player.family_status_o = true; focusInput()">ano</span>
            alebo <span class="choice" @click="$emit('setStep', 2); player.family_status = false">nie</span>."<br>
        </div>
        <div v-if="step == 2">
            "S kym byvas?
            <span class="choice"
                @click="$emit('setStep', 3); player.family_status_m = true; player.family_status_o = false; focusInput()">Mama</span>
            alebo <span class="choice"
                @click="$emit('setStep', 3); player.family_status_o = true; player.family_status_m = false; focusInput()">otec</span>?"
        </div>
        <div v-if="step == 3">
            Krista tato tvarova kniha. Co sa ma to pyta? Sak chcem len lajknut nejake memecka, pozriet si ktory politik ma ojebal dnes a ono takto. Skor ako si vsak stihnes kvalitne zanadavat, obrazovka si pyta dalsiu odpoved.<br>
            <br>
            "Aky je tvoj oblubeny track kamosko? Interpret - song."<br>
            <br>
            <input v-model="player.song" @keyup.enter="$emit('setStep', 4)">
        </div>
        <div v-if="step == 4">
            No dobre. Stacilo boha. Konecne ti nabehne facebook. Klikas na staru znamu zemegulku. Kde ti svieti az jedna notifikacia. Evidentne si popularny jak Brano Mojsej. Rozkliknes ju a zbadas, ze sa daco deje v Nightcall evente. Pici. Uz zajtra. Konecne. Lineup vyzera v poradku. Normalne sa tesis, ze to este furt byva a ta akcia neskapala. A este k tomu Halloween. Pozres sa na postel, kde je uz nachystana Jedi-ska roba. Klikas  na notifikaciu. Hm. Nejaka hra? Textovka? Remaster textovky? Musi jebat. Kto uz len hra dneska textovky. A kto ich remasteruje? Len kokoti. A sak nevadi vyskusame. Klikas na link. Loading. Loading. Loading do piceee. Zrazu tma. Pocujes len zvonenie telefonu. Brnenie syntetizatora. Vo vzduchu cigaretovy dym. Rozliate pivo a grcka v pisoari. Vona Nightcallu. Vypne ta jak po flaske borovicky. A spis. Spis jak papez, po navsteve materskej skolky v Rimavskej Sobote.<br>
            <br>
            <span @click="$emit('setChapter', 1); $emit('setStep', 0); checkPlayerName()" class="choice">{{ lang.continue }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['player', 'step'],
        methods: {
            focusInput() {
                setTimeout(() => {
                    document.querySelector('input').focus()
                }, 100)
            },
            checkPlayerName() {
                if (this.player.name == 'HAL 9000') {
                    this.player.cheats_enabled = true
                }
            }
        },
    }
</script>
