<template>
    <div id="chapter3-container">
        <div v-if="step == 0">
            <p>Blizis sa k muru kamosko. Zabocis na Dunajsku a slapes k Tescu. Namiesto Tesca vsak vidis K-Mart. Hned Za K-Martom je obrovsky betonovy mur. Na jeho vrchu je natiahnuty ostnaty drot. Kazdych niekolko metrov je strazna veza. Zlozis BMXku a zaparkujes ju v jednej z bocnych uliciek. Tvoj ciel je jasny. Ocurat mur. Nebude to take lahke. Uz teraz sa citis jak ked podavas danove priznanie.</p>
            <div v-if="player.states.indexOf('wallExamined') == -1" @click="$emit('setStep', 1); player.states.push('wallExamined')" class="choice">Rozhliadni sa po mure a zisti situaciu.</div>
            <div v-else @click="$emit('setStep', 1)" class="choice">Rozhliadni sa po mure a zisti situaciu.</div>
            <div v-if="player.inventory.indexOf('kartonova krabica') != -1" @click="$emit('setStep', 2.1)" class="choice">Prihovor sa k bezdomovcovi, ktory stoji opodial.</div>
            <div v-else @click="$emit('setStep', 2)" class="choice">Prihovor sa k bezdomovcovi, ktory stoji opodial.</div>
            
            <div @click="$emit('setStep', 3.1)" class="choice">Ocuraj bezdomovca.</div>

            <div v-if="player.inventory.indexOf('prak') != -1" @click="$emit('setStep', 3)" class="choice">Vyber prak a skus vystrelit na vojakov na mure.</div>
        </div>
        <div v-if="step == 1">
            <p>Mur je hnusna betonova 5 metrova opacha. Kazdych niekolko metrov je strazna veza a vojenska policia. Ocurat ho nebude najjednoduchsie. Budes potrebovat nieco, do coho sa skryjes a hlavne. Nechce sa ti zatial curat. To budes musiet tiez nejako zriesit.</p>
            <span v-if="player.inventory.indexOf('kartonova krabica') == -1" @click="$emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
            <span v-else @click="$emit('setStep', 5)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 2">
            <p>Prihovoris sa k bezdomovcovi, ktory sedi v tureckom sede na chodniku. Vyzera jak vyfetovana verzia Brana Mojseja.</p>
            <p>&quot;Dobry den ujo, co to tu je jaky mur?&quot;, spytas sa ho.</p>

            <p>Otoci sa na teba. &quot;Nie jestem wujem. Jestem Cyberpunker Dzeremi.&quot;</p>

            <p>&quot;Ehm. Dobre. Tak co to tu je jaky mur Cyberpunker Dzeremi?&quot;</p>

            <p>Potesi sa, ze si mu povedal jeho pravym menom. &quot;Bez normalnego, Bratislavsky mur. USA i Sowieci nie wiedzieli, co zrobic z Bratyslawa. Kiedy Hitler uciekl tutaj pod koniec II. wojny i uczynil ja miastem III. rosnac. Wiec podzielili Bratyslawe z tymi murosami. Z drugiej strony nie maja nic do stracenia, wszyscy musza zacytowac te marksistyczne koktajle i nie maja gry ani gier wideo. Jestesmy po dobrej stronie. Ciesz sie wiec i nie pytaj mnie o glupote.&quot;</p>

            <p>Odflusne si na zem, zapali si cigu, vytiahne z vacku Lynx od Atari a zacne drtit.</p>

            <p>&quot;Dzeremi. Vsimol som si, ze tam vedla seba mas taku fajnovu velku kartonovu krabicu. Mohol by som si ju pozicat?&quot;</p>

            <p>&quot;Co dajesz mi do wymiany?&quot;</p>

            <div v-for="item in inventoryWithoutMap" :key="item" @click="$emit('setStep', 4); $emit('removeItem', item); $emit('pickupItem', { item: 'kartonova krabica' })" class="choice">{{ item }}</div>
        </div>
        <div v-if="step == 2.1">
            <p>Dzeremi ta ignoruje.</p>
            <span @click="$emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 3">
            <p>Nevies preco. Ale napadne ti vybrat prak a vystrelit suter na vojakov na mure. Vyberes ho z ruksaku. Nachystas kamen. Namieris. A skor ako stihnes vobec vystrelit lezis na betone a z hlavy ti vyteka krv. Schytal si gulku do oka kamo. Toto nebol tvoj najmudrejsi napad. Si mrtvy.</p>
        </div>
        <div v-if="step == 3.1">
            <p>Z nejakeho dovodu ides ocurat bezdomovca, ktory sedi v tureckom sede na chodniku. Vyzera jak vyfetovana verzia Brana Mojseja.</p>
            <p>Prikrocis blizsie k dochodcovi. Zakradas sa jak duch svaty za panenkou Mariou. Vytiahnes von to s cim curas a rozbehnes sa nanho. Spievas Kavinskeho Nightcall a curas. Curas vsade kde sa len da.</p>
            <p>"Co ty kurwa robisz? Co ty kurwa robisz! Ty skurwysynu. Dlaczego na mnie sikasz!</p>
            <p>Ozve sa z krabice. Pred tebou stoji Cyberpunker Dzeremy. Zhrbena urastena postava dochodcu, brada az po opasek. Sem tam z nej trci nejaky kabel. Namiesto praveho oka niekolko blikajucich fialovych diod.</p>
            <p>"Prepacte ujo. Ja neviem co ma to popadlo. Zrazu som vas musel ocurat."</p>
            <p>"Nie nie nie! Mam zamiar sikać na ciebie teraz!"</p>
            <p>S hrozou sledujes ako Cyber Dzeremy vytiahne z nohavic velkeho metroveho kablami prerasteneho hada. Dostanes do fejsu taky prud mocu, az ta zdvihne do vzduchu a odhodi ta az na Bratislavsky mur. Ides sa rychle postavit. Cely/-a mokry/-a. Od mocu. Ano od mocu. Skor ako sa vsak stihnes postavit vyskoci na teba dvoj-hlavy potkan, vykusne ti hrtan a zacne donho curat. Game Over. Nabuduce necuraj na bezdomovcov ty chuju. Ked curas na nieco, je velka pravdepodobnost, ze ta to bude chciet ocurat naspat.</p>
        </div>        
        <div v-if="step == 4">
            <p>&quot;Paradicka. Moze byc plaski. Na pewno go uzyje. Na. Wez pudelko.</p>
            <span v-if="player.states.indexOf('wallExamined') != -1" @click="$emit('setStep', 5)" class="choice">{{ lang.continue }}</span>
            <span v-else @click="$emit('setStep', 0)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 5">
            <p>Vydealoval si od Cyber Dzeremiho kartonovu krabicu. Plan je jasny. Presneakujes sa nejako v nej k muru. Najprv musis vyriesit to, ze sa ti vobec nechce curat. Musis vypit vela tekutin. <span v-if="player.inventory.indexOf('flaska coca coly') != -1">Ta jedna pol-litrovka coly ti nebude stacit. </span>Potrebujes aspon 2 litre tekutin. Mozno by sa dalo daco zohnat v <span class="choice" @click="$emit('note', 'K-Mart vyzera celkom lakavo. Velke logo je osadene na vrchu budovy. Pred vchodom je velky tlsty cinan co predava Nota-Bene (ano, evidentne aj teraz funguje Nota-Bene, good for them).')">K-Marte</span>? Nemas vsak ziadne peniaze. Budes musiet pitie ujebat.</p>

            <div @click="$emit('setStep', 6); $emit('pickupItem', {item: '70 halierov'})" class="choice">Skusis sa popozerat pred vchodom. Ci nenajdes na zemi nejake drobne.</div>
            <div @click="$emit('setStep', 7)" class="choice">Ides do K-Martu, na &quot;nakup&quot;.</div>
        </div>
        <div v-if="step == 6">
            <p>Chodis dobrych 10-15 minut okolo. Pricupeny na zemi jak dilinko. Podari sa ti nazgrlit az 70 halierov. Za to si kupis asi akurat tak zapalky. Mozno sa este zidu.</p>
            <span @click="$emit('setStep', 7)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 7">
            <p>Vojdes dnu. Si v obrovskom pekne spravenom obchodaku, o ktorom mohli ludia v tvojej minulosti (socialisticke cesko-slovensko) len snivat. Hned ti padnu oci na regal, kde je asi 300 druhov rozlicnych corn-flejkov. Nemozes sa vsak nechat odklonit od svojho cielu. Potrebujes najst pitie kamosko.</p>

            <p>Ides najst ulicku s napojmi.</p>

            <p>Netrva ti to dlho a za par minut narazis na obrovsky regal s rozlicnymi napojmi. Chcel/-a si len 2 litre. Vsetko je vsak minimalne v 3 litrovych flaskach. Pici, sak to ani neunesies. Co si vyberes?</p>

            <div @click="$emit('setStep', 8); $emit('pickupItem', {item: '3 litrova Nightcall Cola'})" class="choice">Specialnu verziu Nightcall Coca Coly s velkym telefonom a fialovym pepesom na obale.</div>
            <div @click="$emit('setStep', 8); $emit('pickupItem', {item: '3 litrova Arcade Watch zbrnda'})" class="choice">Zelenu zbrdnu co sa vola Stokarina of Time, v pravom dolnom rohu je logo nejakeho Arcade Watch.</div>
            <div @click="$emit('setStep', 8); $emit('pickupItem', {item: '3 litrova priesvitna Kobra Gang kokotina'})" class="choice">Fajnovucku flasu v tvare nejakeho hada, svieti na nej velke logo Kobra Gang, nevies sice co to je za sockarov, ale vyzera to cool. Vo vnutri je priesvitna bublinkova tekutina.</div>
        </div>
        <div v-if="step == 8">
            <p>S napojom v ruke kracas k pokladni. Rozmyslas, ako sa cez nu dostanes bez zaplatenia. Vtedy ta vsak napadne, ze vyskusas ci funguje krabica a pokusis sa preplizit. Mozno si ta nikto nevsimne. Sak tu aj tak robia sami chuji.</p>
            <span @click="$emit('setStep', 9)" class="choice">{{ lang.continue }}</span>
        </div>
        <div v-if="step == 9">
            <p>Dobre kamo. Idem ti scul vysvetlit ako funguje toto plizenie. Vyberes z vacku krabicu. Zlozis ju. Jebnes ju na seba a ides sa preplizit okolo obtlstlej pokladnicky s pupakom na cele, ktora sa vola teta Alzbeta. Uvidis bar, ktory sa bude postupne naplnat ako sa budes blizit okolo svojho cielu. Musis ho naplnit do plna samozrejme. Pocas toho, ako sa budes plizit, nastane sem tam moment, ze tlsta pokladnicka Alzbeta zacne nieco vetrit. Vtedy obrazovka blikne a musis rychle klavesu pustit. Ak to stihnes vcas. Podari sa ti preplizit. Ak nie, kukne skaredo na teba, ty sa zlaknes az ti zabehne a musis ist od zaciatku.</p>
            <span @click="$emit('setStep', 10.1); disableMenu(true)" class="choice">Pome na to.</span>
        </div>

        <div v-if="step == 10.1">
            <sneaking-game :player="player" :speed="1" :reactionTime="1100" @win="$emit('setStep', 11); disableMenu(false)">
            </sneaking-game>
        </div>

        <div v-if="step == 10.2">
            <sneaking-game :player="player" :speed="0.35" :reactionTime="500" @win="$emit('setStep', 13); disableMenu(false)">
            </sneaking-game>
        </div>

        <div v-if="step == 11">
            <p>Dal si to, kamosko. Jak Solid Snake. 3 litrovy napoj v ruke, stojis vonku pred K-Martom.</p>
            <span @click="$emit('setStep', 12); $emit('removeItem', '3 litrova Nightcall Cola'); $emit('removeItem', '3 litrova Arcade Watch zbrnda'); $emit('removeItem', '3 litrova priesvitna Kobra Gang kokotina');" class="choice">{{ lang.continue }}</span>
        </div>

        <div v-if="step == 12">
            <p>Nastal ten moment kamosko. Vypijes nasupu tvoj lahodny troj litrovy mok. Odrgrgnes si jak tvoja mama po obede a ides na to. Uz citis jak sa ti mocovody chystaju. Zajebes na seba krabicu a game begins. Musis sa preplizit cez vojakov a rychle ocurat mur. Pome na to.</p>
            <span @click="$emit('setStep', 10.2); disableMenu(true)" class="choice">Pome na to.</span>
        </div>

        <div v-if="step == 13">
            <p>Dal/-a si to. Stojis pred murom. Stahujes nohavice a curas. Sweet release. Moc naraza na mur a odraza sa na tvoje tenisky. Neriesis. Konecne si to dal/-a. Vycural/-a si na mur velku cicinu. Jak umelec z VSMU. Dalsia uloha splnena. Nahodis zase na seba krabicu a preplizis sa naspat.</p>

            <div v-if="player.finished_chapters.indexOf(2) != -1 && player.finished_chapters.indexOf(4) != -1">
                <p>&quot;Uz je tolko hodin krista boha. Tatko pride zachvilu domov a pojdete palit babke sviecku. Upaluj domov.&quot;</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
            <div v-else>
                <p>&quot;Uloha splnena, kam sa vydas teraz, kamosko?&quot;</p>
                <div class="choice" @click="showMap()">Pozri do mapy.</div>
            </div>
        </div>
    </div>
</template>

<script>
    import SneakingGame from './SneakingGame.vue'

    export default {
        props: ['player', 'step'],
        components: {
            'sneaking-game': SneakingGame
        },
        data() {
            return {
            }
        },
        methods: {
            disableMenu(value) {
                this.$emit('setDisabled', {
                    new: value,
                    save: value,
                    load: value
                })
            },
            showMap() {
                bus.$emit('openMap')
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
            bus.$on('map/clicked/3', (destination) => {
                if (this.player.finished_chapters.indexOf(2) != -1 && this.player.finished_chapters.indexOf(4) != -1) {
                    if (destination == 'domov') {
                        this.$emit('setChapter', 5)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(3)
                        bus.$emit('closeMap')
                    } else {
                        bus.$emit('map/changeLabel', 'Musis ist domov, kamosko.')
                    }
                }
                else if (destination == 'ihrisko') {
                    if (this.player.finished_chapters.indexOf(2) != -1) {
                        bus.$emit('map/changeLabel', 'Tam sme uz boli, kamosko.')
                    } else {
                        this.$emit('setChapter', 2)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(3)
                        bus.$emit('closeMap')
                    }
                } else if (destination == 'ovladac') {
                    if (this.player.finished_chapters.indexOf(4) != -1) {
                        bus.$emit('map/changeLabel', 'Tam sme uz boli, kamosko.')
                    } else {
                        this.$emit('setChapter', 4)
                        this.$emit('setStep', 0);
                        this.player.finished_chapters.push(3)
                        bus.$emit('closeMap')
                    }
                } else if (destination == 'mur') {
                    bus.$emit('map/changeLabel', 'Tu sa nachadzas.')
                } else {
                    bus.$emit('map/changeLabel', 'Zatial nie, kamosko.')
                }
            })
        }
    }
</script>

<style>

</style>

