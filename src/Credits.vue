<template>
    <div>
        <div v-if="step == 0" id="credits_element">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['player', 'step'],
        data() {
            return {
                typed: null
            }
        },
        mounted() {
            this.typed = new this.Typed('#credits_element', {
                strings: ['',
                    `<span class="header">napisal</span><br>
                    <span class="name">Daniel Jackson</span>^800<br><br>
                    <span class="header">nakodil</span><br>
                    <a href="https://www.facebook.com/grawlix.synthwave" target="_blank" class="name">Grawlix</a>^800<br><br>
                    <span class="header">textova korektura a ikonky</span><br>
                    <span class="name">Synthmage</span><br><br>
                    <span class="header">soundtrack</span><br>
                    <span class="name">****</span>^800<br><br><br><br>
                    <span class="name">Vdaka za zahranie</span>^800<br><br>
                    `
                ],
                typeSpeed: 40,
                backSpeed: 10,
                fadeOut: false,
                loop: false,
                showCursor: false
            })
        },
        methods: {
        }
    }
</script>

<style>
    #credits_element {
        text-align: center;
    }
    .header {
        color:white;
        font-size: 25px;
    }
    .name {
        font-size: 45px;
    }
    a {
        color: greenyellow;
        text-decoration: none;
    }
</style>

