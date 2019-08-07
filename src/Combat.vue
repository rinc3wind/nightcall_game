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
                    <progress class="combat-player-hp" :value="char.hp" :max="char.max_hp"></progress>

                    <div>SP: {{ char.sp }}</div>
                    <progress class="combat-player-hp" :value="char.sp" :max="char.max_sp"></progress>
                </div>

                <div id="combat-actions">
                    <div class="choice" @click="attack">
                        ATTACK
                    </div>
                    <div class="choice" @click="synthPowerVisible = !synthPowerVisible">
                        SYNTH POWER
                    </div>
                    <div v-if="synthPowerVisible">
                        <div @click="useSynthPower(power.id)" class="synth-power" v-for="power in synth_powers" :key="power.id">{{ power.name }} [{{ power.cost }} SP]</div>
                    </div>
                    <div class="choice" @click="drinkBeer">
                        DRINK BEER [{{ char.beers }}]
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
        props: ['char', 'enemies_prop'],
        data() {
            return {
                synthPowerVisible: false,
                combat_log: [],
                choosing_enemy_to_attack: false,
                choosing_enemy_for_power: false,
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
                        hp: 50,
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
                        hp: 50,
                        attack: [3, 10],
                        skill: 'SYNTH BOLT' // 1d10, nehadze sa na obranu a rovno ubere damage
                    },
                    {
                        name: 'Thrivefool',
                        hp: 60,
                        attack: [2, 7],
                        skill: 'CYBER BOMBA', // na screene sa zjavi bomba a timer, ked vydrzi 5 kol tak dostanes 10 damage
                        onDeath: function() {
                            this.parent.enemies = []
                        }
                    },
                    {
                        name: 'Vektoroskop',
                        hp: 60,
                        attack: [3, 7],
                        skill: 'TV HYPNOSIS' // na dalsie 3 kola mas o polovicu mensi attack(tj ak hadzes 1d8, tak najprv hodis 1d8 a potom sa vysledok predeli 2)
                    },
                    {
                        name: 'Kavinsky',
                        hp: 100,
                        attack: [2, 7],
                        skill: true,
                        skills: ['ARPEGGIATOR', 'CUTOFF', 'DELAY']
                    },
                    {
                        name: 'Kavinsky echo',
                        hp: 20,
                        attack: [2, 7],
                        skill: true,
                        skills: ['ARPEGGIATOR', 'CUTOFF', 'DELAY']
                    },
                    {
                        name: 'Najebanec',
                        hp: 50,
                        attack: [2, 9],
                        skill: 'GRCKA' // dostanes automaticky 2 damage
                    },
                    {
                        name: 'Geek',
                        hp: 40,
                        attack: [2, 9],
                        skill: 'I WANT TO PLAY DND', // nema ziaden efekt, ale zaspamuje ti screen hlaskou
                        onDeath: function() {
                            var labels = document.getElementsByClassName('i_want_to_play_dnd')
                            while (labels[0]) labels[0].parentNode.removeChild(labels[0])
                        }
                    },
                    {
                        name: 'Vyhadzovac',
                        hp: 30,
                        attack: [2, 9],
                        skill: 'NAOZAJ NEJSI NA GUESTLISTE' // schytas supu, 1d3;
                    },
                    {
                        name: 'Evil synth',
                        hp: 30,
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
                ],
                synth_powers: [
                    {
                        id: 1,
                        name: 'HEAL',
                        cost: 4,
                        strength: 15,
                        parent: this,
                        effect() {
                            var char = this.parent.char
                            if (char.hp + this.strength > char.max_hp) {
                                this.parent.add_log('Vyhealoval si si ' + (char.max_hp - char.hp) + ' HP.')
                                char.hp = char.max_hp
                            }
                            else {
                                char.hp += this.strength
                                this.parent.add_log('Vyhealoval si si 10 HP.')
                            }
                            setTimeout(() => { this.parent.endTurn() }, 1000)
                        }
                    },
                    {
                        id: 2,
                        name: 'REFLECT',
                        cost: 2,
                        parent: this,
                        effect() {
                            this.parent.char.reflect = true
                            this.parent.add_log('Dalsi obycajny utok enemaca odrazis naspat.')
                            setTimeout(() => { this.parent.endTurn() }, 1000)
                        }
                    },
                    {
                        id: 3,
                        name: 'ABSORB',
                        cost: 3,
                        strength: 7,
                        parent: this,
                        effect() {
                            this.parent.add_log('Vyber enemaca, ktoremu chces vysat HP.')
                            this.parent.choosing_enemy_for_power = true
                            this.parent.choosing_enemy_to_attack = false
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
            useSynthPower(id) {
                var power = this.synth_powers.filter(power => {
                    return power.id == id
                })[0]

                if (this.char.sp >= power.cost) {
                    this.add_log('Pouzil si synth power ' + power.name + '.')
                    this.char.sp -= power.cost
                    power.effect()
                } else {
                    this.add_log('Nemas dost synth pointov kamo.')
                }
            },
            chooseEnemy(enemy) {
                if (enemy.immortal) {
                    this.add_log('Na '+enemy.name+' sa neda zautocit.')
                    return
                }

                if (this.choosing_enemy_to_attack == true) {
                    var damage = this.diceRoll(this.char.weapon.dmg) + this.char[this.char.weapon.base_stat]
                    enemy.hp = enemy.hp - damage
                    this.add_log(enemy.name + ' dostal supu za ' + damage + '.')
                } else if (this.choosing_enemy_for_power == true) {
                    enemy.hp -= 7
                    this.char.hp += 7
                }
                if (enemy.hp <= 0) {
                    if (enemy.onDeath) enemy.onDeath()
                    this.add_log(enemy.name + ' je porazeny.')

                    this.enemies = this.enemies.filter(enemyFromArray => {
                        return enemyFromArray.id != enemy.id
                    })
                    if (this.enemies.length == 0) this.win()
                }
                if (this.enemies.length != 0) {
                    setTimeout(() => {
                        this.endTurn()
                    }, 1000)
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

                if (this.diceRoll(100) <= 40 && enemy.skill && this.char.status_effect == null) {   //  ABILITY
                    if (enemy.skills) enemy.skill = enemy.skills[Math.floor(Math.random() * enemy.skills.length)]
                    this.add_log(enemy.name + ' pouzil schopnost ' + enemy.skill + '.')
                    this.enemySkill(enemy.skill)
                } else {                                          //  ATTACK
                    if (this.diceRoll(10) > this.char.ac) {
                        var damage = this.randomNumber(enemy.attack[0], enemy.attack[1])

                        if (this.char.reflect == false ) {
                            this.char.hp = this.char.hp - damage
                            this.add_log('Dostal si supu od ' + enemy.name + ' za ' + damage + '.')
                        } else {
                            enemy.hp = enemy.hp - damage
                            this.add_log(enemy.name + ' si dal supu za ' + damage + '.')
                            this.char.reflect = false
                        }
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

                if (this.char.status_effect) this.char.status_effect.effect()
            },
            win() {
                this.$emit('win', this.char)
            },
            fail() {
                this.$emit('fail')
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
            drinkBeer() {
                if (this.char.beers == 0) {
                    this.add_log('Uz si vsetko vychlastal kamo.')
                } else {
                    this.char.beers--

                    if (this.char.max_hp - this.char.hp < 5) var heal = this.char.max_hp - this.char.hp
                    else var heal = 5

                    this.char.hp += heal
                    this.add_log('Dal si si pivo a vyliecil '+heal+' HP.')
                }
            },
            enemySkill(skill) {
                if (skill == 'TIME HACK') {
                    this.char.status_effect = {
                        name: 'TIME HACK',
                        parent: this,
                        effect: function() {
                            this.parent.char.status_effect = null
                            this.parent.endTurn()
                            this.parent.endTurn()
                        }
                    }
                } else if (skill == 'SYNTH BOLT') {
                    var damage = this.randomNumber(1, 10)
                    this.char.hp = this.char.hp - damage
                    this.add_log('Schytas supu za ' + damage + '.')
                } else if (skill == 'NICOTINE POISON') {
                    this.char.status_effect = {
                        name: 'NICOTINE POISON',
                        parent: this,
                        duration: 3,
                        effect: function() {
                            this.parent.char.hp--
                            this.duration --
                            this.parent.add_log('NICOTINE POISON ti dal 1 damage.')
                            if (this.duration == 0) this.parent.char.status_effect = null
                        }
                    }
                } else if (skill == 'CYBER BOMBA') {
                    this.addEnemy('Cyber bomba')
                } else if (skill == 'SUMMON EVIL SYNTH') {
                    this.addEnemy('Evil synth')
                } else if (skill == 'TV HYPNOSIS') {
                    this.char.status_effect = {
                        name: 'TV HYPNOSIS',
                        parent: this,
                        duration: 4,
                        char_stats: {
                            strength: this.char.strength,
                            dexterity: this.char.dexterity,
                            weapon_dmg: this.char.weapon.dmg
                        },
                        effect: function() {
                            if (this.duration == 4) {
                                this.parent.char.strength = this.parent.char.strength / 2
                                this.parent.char.dexterity = this.parent.char.dexterity / 2
                                this.parent.char.weapon.dmg = this.parent.char.weapon.dmg / 2
                            }
                            this.duration --
                            if (this.duration == 0) {
                                this.parent.char.status_effect = null
                                this.parent.char.strength = this.char_stats.strength
                                this.parent.char.dexterity = this.char_stats.dexterity
                                this.parent.char.weapon.dmg = this.char_stats.weapon_dmg
                            }
                        }
                    }
                } else if (skill == 'ARPEGGIATOR') {
                    this.char.hp = this.char.hp - 10
                    this.add_log('Schytas supu za 1.')
                    this.add_log('Schytas supu za 2.')
                    this.add_log('Schytas supu za 3.')
                    this.add_log('Schytas supu za 4.')
                } else if (skill == 'CUTOFF') {
                    this.char.hp = this.char.hp - 2
                    this.char.max_hp = this.char.max_hp - 2
                    this.add_log('HP permanentne znizene o 2.')
                } else if (skill == 'DELAY') {
                    this.addEnemy('Kavinsky echo')
                    this.addEnemy('Kavinsky echo')
                } else if (skill == 'GRCKA') {
                    this.char.hp = this.char.hp - 2
                    this.add_log('Schytas supu za 2.')
                } else if (skill == 'I WANT TO PLAY DND') {
                    var node = document.createElement('div')
                    var body = document.querySelector('#app')
                    var textnode = document.createTextNode('I WANT TO PLAY DND')
                    node.appendChild(textnode)
                    body.appendChild(node)
                    node.className = 'i_want_to_play_dnd'

                    var x = this.randomNumber(100, 1500)
                    var y = this.randomNumber(100, 800)

                    node.style.top = y.toString() + 'px'
                    node.style.left = x.toString() + 'px'

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
                        if (enemy.onDeath) enemy_copy.onDeath = enemy.onDeath
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
        position: relative;
        z-index: 1000;
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

    .i_want_to_play_dnd {
        position: absolute;
    }

    .synth-power {
        cursor: pointer;
        color: white;
        padding: 5px;
        padding-left: 20px;
        font-size: 16px;
    }
    .synth-power:hover {
        background-color: white;
        color: black;
    }
</style>