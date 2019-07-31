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
                    <div class="choice" @click="useItem">
                        ITEM
                    </div>
                </div>
            </div>
            <div class="column-right">
                <div id="combat-enemy" v-for="enemy in enemies" :key="enemy.id" @click="chooseEnemy(enemy)">
                    <div>{{ enemy.name }}</div>
                    <div>HP: {{ enemy.hp }}</div>
                    <progress class="combat-player-hp" :value="enemy.hp" :max="enemy.max_hp"></progress>
                </div>
            </div>
        </div>

        <div id="combat-console">
            <div v-for="row in combat_log" :key="row.id">{{ row.text }}</div>
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
                    hp:120,
                    inventory: [],
                    name:'grawlix',
                    sp:12,
                    strength:40,
                    synth_power:4,
                    weapon:{
                        name: 'sekera',
                        dmg: 8
                    }
                },
                // enemies_prop: ['Computerboy', 'Synthmage'],
                enemies_prop: ['Thrivefool'],

                enemies: [],
                enemy_list: [
                    {
                        name: 'Computerboy',
                        hp: 50,
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
                        hp: 50,
                        attack: [4, 9],
                        skill: 'SUMMON EVIL SYNTH' // prida Evil synth enemaca
                    },
                    {
                        name: 'Synthmage',
                        hp: 40,
                        attack: [3, 10],
                        skill: 'SYNTH BOLT' // 1d10, nehadze sa na obranu a rovno ubere damage
                    },
                    {
                        name: 'Thrivefool',
                        hp: 80,
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
                    },
                    {
                        name: 'Evil synth',
                        hp: 50,
                        attack: [2, 6]
                    },
                    {
                        name: 'Cyber bomba',
                        hp: 3,
                        immortal: true,
                        everyTurn: function() {
                            this.hp--
                            if (this.hp == 0) {
                                this.parent.char.hp -= 10
                                this.parent.add_log('Cyber bomba vybuchla a dostal si 10 damage.')
                                this.parent.removeEnemy(this.id)
                            }
                        }
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
                if (this.choosing_enemy_to_attack == false) {
                    this.add_log('Vyber enemaca.')
                    this.choosing_enemy_to_attack = true
                }
            },
            chooseEnemy(enemy) {
                if (this.choosing_enemy_to_attack == true) {
                    if (enemy.immortal) {
                        this.add_log('Na '+enemy.name+' sa neda zautocit.')
                        return
                    }
                    this.chosen_enemy = enemy

                    var damage = this.diceRoll(8)
                    enemy.hp = enemy.hp - damage

                    this.add_log(enemy.name + ' dostal supu za ' + damage + '.')

                    if (enemy.hp <= 0) {
                        this.add_log(enemy.name + ' je porazeny.')

                        this.enemies = this.enemies.filter(enemyFromArray => {
                            return enemyFromArray.name != enemy.name
                        })
                        if (this.enemies.length == 0) this.win()
                    }
                    if (this.enemies.length != 0) {
                        setTimeout(() => {
                            this.endTurn()
                        }, 1000)
                    }
                }
            },
            endTurn() {
                this.enemies.forEach(enemy => {
                    if (enemy.everyTurn) enemy.everyTurn()
                })

                var ready_enemies = this.enemies.filter(enemy => {
                    return enemy.attack && enemy.skill && enemy.attacked == false
                })
                if (ready_enemies.length == 0) {
                    this.enemies.forEach(enemy => {
                        enemy.attacked = false
                    })
                    ready_enemies = this.enemies
                }

                var enemy = ready_enemies[0]
                enemy.attacked = true

                if (this.diceRoll(100) <= 100 && enemy.skill) {   //  ABILITY
                    this.add_log(enemy.name + ' pouzil schopnost ' + enemy.skill + '.')
                    this.enemySkill(enemy.skill)

                } else {                                          //  ATTACK
                    if (this.diceRoll(10) > this.char.ac) {
                        var damage = this.randomNumber(enemy.attack[0], enemy.attack[1])
                        this.char.hp = this.char.hp - damage
                        this.add_log('Dostal si supu od ' + enemy.name + ' za ' + damage + '.')
                    } else {
                        this.add_log(enemy.name + ' ta netrafil.')
                    }
                }

                //  CHECK IF PLAYER DIES
                if (this.char.hp <= 0) {
                    this.fail()
                }

                this.choosing_enemy_to_attack = false
                this.add_log('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')
            },
            win() {
                this.add_log('WIN')
            },
            fail() {
                this.add_log('FAIL')
            },
            add_log(string) {
                this.combat_log.push({
                    id: this.combat_log.length,
                    text: string
                })
                var container = this.$el.querySelector("#combat-console");
                setTimeout(() => {
                    container.scrollTop = container.scrollHeight;
                }, 50)
            },
            useItem() {
                this.add_log('Vyber si predmet z inventaru.')
                bus.$emit('Combat/useItem')
            },
            itemUsed(item) {
                this.add_log('Predmet ' + item + ' pouzity.')
            },
            enemySkill(skill) {
                if (skill == 'TIME HACK') {
                } else if (skill == 'SYNTH BOLT') {
                    var damage = this.randomNumber(1, 10)
                    this.char.hp = this.char.hp - damage
                    this.add_log('Schytas supu za ' + damage + '.')
                } else if (skill == 'NICOTINE POISON') {

                } else if (skill == 'CYBER BOMBA') {
                    this.addEnemy('Cyber bomba')
                } else if (skill == 'SUMMON EVIL SYNTH') {
                    this.addEnemy('Evil synth')
                } else if (skill == 'TV HYPNOSIS') {

                } else if (skill == 'NIGHTCALL') {

                } else if (skill == 'GRCKA') {
                    this.char.hp = this.char.hp - 2
                    this.add_log('Schytas supu za 2.')
                } else if (skill == 'I WANT TO PLAY DND') {

                } else if (skill == 'NAOZAJ NEJSI NA GUESTLISTE') {
                    var damage = this.randomNumber(1, 3)
                    this.char.hp = this.char.hp - damage
                    this.add_log('Schytas supu za ' + damage + '.')
                }
            },
            addEnemy(enemy_name) {
                this.enemy_list.forEach(enemy => {
                    if (enemy_name == enemy.name) {
                        var enemy_copy = JSON.parse(JSON.stringify(enemy))
                        if (enemy.everyTurn) enemy_copy.everyTurn = enemy.everyTurn
                        enemy_copy.id = Math.floor(Math.random() * 1000000000)
                        enemy_copy.max_hp = enemy.hp
                        enemy_copy.attacked = false
                        enemy_copy.parent = this
                        this.enemies.push(enemy_copy)
                    }
                })
            },
            removeEnemy(id) {
                this.enemies = this.enemies.filter(enemy => {
                    return enemy.id != id
                })
            }
        },
        mounted() {
            this.enemies_prop.forEach(enemy_name => {
                this.addEnemy(enemy_name)
            })

            bus.$on('App/useItem', (item) => {
                this.itemUsed(item)
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
        outline: thick solid white;
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