<template>
    <div>
        <div v-if="step == 0">
            <b>30. oktober 2019<br>
                23:56<br>
                Bratislava<br>
            </b>
            <br>
            Je chladna oktobrova noc. Tak ako kazdy vecer, tak aj dnes sedis do noci za pocitacom. Mas pootvorenu
            okenicu nech ti aspon troska prudi vzduch v izbe. Tma. Celu izbu ozaruje len obrazovka tvojho
            stareho laptopu.<br>
            <br>
            Prekliknes tab na facebook. Kurva fix. Zase ta odhlasilo. Ides sa prihlasit. Cely interface je vsak
            nejaky zvlastny. Namiesto emailu a hesla to chce po teba tvoje meno. Charakteristicka modra
            obrazovka. Fko v kruzku. A krizom cez celu obrazovku svieti iba jeden riadok.<br>
            <br>
            <b>"Zadaj svoje meno, kamosko. Staci prve. Napr. Rambo, Arnold, Marika"</b><br>
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
            Krista tento fejsbuk. Co sa ma to pyta? Sak chcem len lajknut nejake memecka a ono takto. Skor ako
            si vsak stihnes kvalitne zanadavat, obrazovka si pyta dalsiu odpoved.<br>
            <br>
            "Aky je tvoj oblubeny track, kamosko? Interpret - song."<br>
            <br>
            <input v-model="player.song" @keyup.enter="$emit('setStep', 4)">
        </div>
        <div v-if="step == 4">
            No dobre. Stacilo krista. Konecne ti nabehne facebook. Klikas na staru znamu zemegulku, kde ti
            svieti, az jedna notifikacia. Evidentne si popularny jak Ibrahim Maiga. Rozkliknes ju a zbadas, ze
            sa daco deje v Nightcall evente. Pici. Uz zajtra. Konecne. Lineup vyzera v pohodicke. A este k tomu
            Halloween. Pozries sa na postel, kde je uz nachystana Jedi-ska roba. Klikas na notifikaciu. Hm.
            Nejaka hra? Textovka? Kto uz len hra dneska textovky. A sak vyskusame. Klikas na link. Loading.
            Loading. Loading do piceee. Zrazu tma. Pocujes len zvonenie telefonu. Brnenie syntetizatora. Vo
            vzduchu cigaretovy dym. Vona Nightcallu. Vypne ta jak po flaske borovicky. A spis. Spis jak spokojna
            troj-hlava macka po dvoch spekoch.<br>
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
