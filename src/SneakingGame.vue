<template>
    <div>
        <progress :class="{moving: isKeyDown, danger: danger}" :value="progress" max="100"></progress>
        <span v-if="danger == false" :class="{moving: isKeyDown}" class="arrowKey" style="font-size: 50px;">→</span>
        <span v-else style="font-size: 50px;">{{ randomArrow.text }}</span>
        <div v-if="flashVisible" :style="{ 'background-color': flashColor }" class="flash"></div>
    </div>
</template>

<script>
    export default {
        props: ['speed', 'reactionTime', 'player'],
        data() {
            return {
                flashVisible: false,
                danger: false,
                flashColor: null,
                progress: 0,
                interval: null,
                isKeyDown: false,
                arrows: [
                    {
                        text: '↓',
                        value: 'ArrowDown'
                    },
                    {
                        text: '↑',
                        value: 'ArrowUp'
                    },
                    {
                        text: '←',
                        value: 'ArrowLeft'
                    }
                ],
                randomArrow: null
            }
        },
        mounted() {
            window.addEventListener('keyup', (e) => {
                this.keyUp(e)
            })
            window.addEventListener('keydown', (e) => {
                this.keyDown(e)
            })
            this.randomArrow = this.arrows[Math.floor(Math.random() * 3)]
        },
        methods: {
            startGame() {
                this.progress = 0
                this.$emit('setDisabled', {
                    new: true,
                    save: true,
                    load: true
                })
            },
            keyUp() {
                this.isKeyDown = false
                clearInterval(this.interval)
                this.interval = null
            },
            keyDown(e) {
                if (this.interval == null && e.key == 'ArrowRight') {
                    this.isKeyDown = true
                    this.interval = setInterval(() => {
                        this.progress = this.progress + this.speed

                        var random = Math.floor(Math.random() * (40))
                        if (random == 5) this.flash()

                        if (this.progress >= 100) {
                            this.$emit('win')
                            this.$emit('setDisabled', {
                                new: false,
                                save: false,
                                load: false
                            })
                        }
                    }, 100)
                } else if (e.key == this.randomArrow.value) {
                    this.danger = false
                }
            },
            flash() {
                this.flashColor = 'white'
                this.flashVisible = true
                this.danger = true
                this.randomArrow = this.arrows[Math.floor(Math.random() * 3)]
                setTimeout(() => {
                    this.flashVisible = false
                }, 180)

                var flashDuration = Math.floor(Math.random() * (500)) + this.reactionTime
                setTimeout(() => {
                    this.flashColor = 'yellowgreen'
                    this.flashVisible = true
                    //if (this.isKeyDown == true) {
                    if (this.danger == true || this.isKeyDown == true) {
                        if (this.player.cheats_enabled != true) {
                            this.progress = 0
                            this.$emit('fail')
                        }
                    }
                    setTimeout(() => {
                        this.flashVisible = false
                        this.danger = false
                    }, 180)
                }, flashDuration)
            }
        }
    }
</script>

<style>
    progress[value] {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 100px;
    }
    progress[value]::-webkit-progress-bar {
        background-color: black;
        border: 2px solid;
        border-color: yellowgreen;
    }
    progress[value]::-webkit-progress-value {
        background-color: yellowgreen;
        opacity: 0.6;
    }

    progress.moving[value]::-webkit-progress-value {
        background-color: yellowgreen;
        opacity: 1;
    }
    progress.danger[value]::-webkit-progress-value {
        background-color: white;
        opacity: 1;
    }
    .arrowKey.moving {
        opacity: 1;
    }
    .arrowKey {
        opacity: 0.6;
    }
    .flash {
        background-color: yellowgreen;
        position: absolute;
        opacity: 0.7;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
</style>

