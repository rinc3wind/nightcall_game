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
                    <span class="name">Daniel Jackson</span>^500<br><br>
                    <span class="header">nakodil</span><br>
                    <a href="https://www.facebook.com/grawlix.synthwave" target="_blank" class="name">Grawlix</a>^500<br><br>
                    <span class="header">textova korektura a ikonky</span><br>
                    <span class="name">Synthmage</span><br><br>
                    <span class="header">soundtrack</span><br>
                    <span class="name">Grawlix</span>^500<br><br>
                    <span class="name">Daniel Jackson</span>^500<br><br>
                    <span class="name">Leo Clair</span>^500<br><br>
                    <span class="name">Milcho Malefic</span>^500<br><br>
                    <span class="name">Nyctalope</span>^500<br><br><br><br>
                    <span class="name">Vdaka za zahranie</span>^500<br><br>
                    `
                ],
                typeSpeed: 40,
                backSpeed: 10,
                fadeOut: false,
                loop: false,
                showCursor: false
            })
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

