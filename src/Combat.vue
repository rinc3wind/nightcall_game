<template>
    <div>
        <div class="container">
            <div class="column-center">

            </div>
            <div class="column-left">
                <div id="combat-char">
                    <div style="margin-bottom: 20px;"><b>{{ char.name }}</b></div>

                    <div style="margin-bottom: 20px;">WEAPON: {{ char.weapon.name }}</div>

                    <div>HP: {{ char.hp }}</div>
                    <progress class="combat-player-hp" :value="char.hp" :max="char.strength * 3"></progress>

                    <div>SP: {{ char.sp }}</div>
                    <progress class="combat-player-hp" :value="char.sp" :max="char.synth_power * 3"></progress>
                </div>

                <div id="combat-actions">
                    <div class="choice" @click="attack">
                        ATTACK
                    </div>
                    <div class="choice">
                        SYNTH POWER
                    </div>
                    <div class="choice">
                        ITEM
                    </div>
                </div>
            </div>
            <div class="column-right">
                <div id="combat-enemy" v-for="enemy in enemies" :key="enemy.name" @click="chooseEnemy(enemy)">
                    <div>{{ enemy.name }}</div>
                    <div>HP: {{ enemy.hp }}</div>
                    <progress class="combat-player-hp" :value="enemy.hp" :max="enemy.max_hp"></progress>
                </div>
            </div>
        </div>

        <div id="combat-console">
            <div v-for="row in combat_log" :key="row">{{ row }}</div>
        </div>

    </div>
</template>

<script>
    export default {
        //props: ['char', 'enemies_prop'],
        data() {
            return {
                combat_log: [],
                choosing_enemy_to_attack: false,
                chosen_enemy: {},
                char: {
                    ac:4,
                    dexterity:4,
                    hp:12,
                    inventory: [],
                    name:'grawlix',
                    sp:12,
                    strength:4,
                    synth_power:4,
                    weapon:{
                        name: 'sekera',
                        dmg: 8
                    }
                },
                enemies_prop: ['Computerboy', 'Synthmage'],

                enemies: [],
                enemy_list: [
                    {
                        name: 'Computerboy',
                        hp: 5,
                        attack: [2, 9],
                        skill: 'TIME HACK' // computer boy ide dva krat za sebou
                    },
                    {
                        name: 'Daniel Jackson',
                        hp: 5,
                        attack: [3, 9],
                        skill: 'NICOTINE POISON' // 3 kola ti vzdy ubere poison 1 HP
                    },
                    {
                        name: 'Grawlix',
                        hp: 5,
                        attack: [4, 9],
                        skill: 'CYBER THEFT' // random ujeb jeden item hracovi
                    },
                    {
                        name: 'Synthmage',
                        hp: 4,
                        attack: [3, 10],
                        skill: 'SYNTH BOLT' // 1d10, nehadze sa na obranu a rovno ubere damage
                    },
                    {
                        name: 'Thrivefool',
                        hp: 8,
                        attack: [2, 7],
                        skill: 'CYBER BOMBA' // na screene sa zjavi bomba a timer, ked vydrzi 5 kol tak dostanes 10 damage
                    },
                    {
                        name: 'Vektoroskop',
                        hp: 6,
                        attack: [3, 7],
                        skill: 'TV HYPNOSIS' // na dalsie 3 kola mas o polovicu mensi attack(tj ak hadzes 1d8, tak najprv hodis 1d8 a potom sa vysledok predeli 2)
                    },
                    {
                        name: 'Kavinsky',
                        hp: 15,
                        attack: [2, 7],
                        skill: 'NIGHTCALL' //Zahra Nightcall, musis ho zahrat lepsie, spusti sa nightcall minihra z kostola.
                    },
                    {
                        name: 'Najebanec',
                        hp: 2,
                        attack: [2, 9],
                        skill: 'GRCKA' // dostanes automaticky 2 damage
                    },
                    {
                        name: 'Geek',
                        hp: 1,
                        attack: [2, 9],
                        skill: 'I WANT TO PLAY DND' // nema ziaden efekt, ale zaspamuje ti screen hlaskou
                    },
                    {
                        name: 'Vyhadzovac',
                        hp: 3,
                        attack: [2, 9],
                        skill: 'NAOZAJ NEJSI NA GUESTLISTE' // schytas supu, 1d3;
                    }
                ]
            }
        },
        methods: {
            diceRoll(sides) {
                return Math.floor(Math.random() * sides) + 1
            },
            randomNumber(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            attack() {
                //this.combat_log = 'Choose enemy to attack.'
                this.add_log('Choose enemy to attack.')
                this.choosing_enemy_to_attack = true
            },
            chooseEnemy(enemy) {
                if (this.choosing_enemy_to_attack == true) {
                    this.chosen_enemy = enemy
                    var damage = this.diceRoll(8)
                    enemy.hp = enemy.hp - damage
                    this.endTurn()
                }
            },
            endTurn() {
                this.enemies.forEach(enemy => {
                    var hit_roll = this.diceRoll(10)

                    if (hit_roll > this.char.ac) {
                        var damage = this.randomNumber(enemy.attack[0], enemy.attack[1])
                        this.char.hp = this.char.hp - damage
                    }
                })
            },
            add_log(string) {
                this.combat_log.push(string)
                var container = this.$el.querySelector("#combat-console");
                setTimeout(() => {
                    container.scrollTop = container.scrollHeight;
                }, 50)
            }
        },
        mounted() {
            this.enemy_list.forEach(enemy => {
                this.enemies_prop.forEach(enemy_prop => {
                    if (enemy_prop == enemy.name) {
                        enemy.max_hp = enemy.hp
                        this.enemies.push(enemy)
                    }
                })
            })
        }
    }
</script>

<style>
    #combat-char {
        border: solid 1px;
        padding: 15px;
    }

    #combat-enemy {
        margin-bottom: 20px;
        border: solid 1px;
        padding: 15px;
        cursor: pointer;
    }
    #combat-enemy:hover {
        border-color: white;
    }

    #combat-actions {
        margin-top: 20px;
        border: solid 1px;
        padding: 15px;
    }
    .combat-player-hp {
        height: 20px !important;
        margin-bottom: 20px;
    }
    #combat-console {
        width: 100%;
        float: left;
        margin-top: 20px;
        border: solid 1px;
        padding: 15px;
        max-height: 150px;
        overflow: auto;
        scroll-behavior: smooth;
    }
    .column-left {
        float: left;
        width: 33.333%;
    }

    .column-right {
        float: right;
        width: 33.333%;
    }
    .column-center {
        display: inline-block;
        width: 33.333%;
    }

    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: black;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: greenyellow;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: green;
    }
</style>