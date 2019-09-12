<template>
    <div id="map_wrapper" class="note">
        <div id="map_dialog" class="note_content">
            <div id="map_container">
                <div @click="mapClicked('ovladac')" @mouseover="label='U dojebaneho ovladaca'" @mouseleave="label=''" class="map_marker" id="ovladac"></div>
                <div @click="mapClicked('domov')" @mouseover="label='Tvoj dom'" @mouseleave="label=''" class="map_marker" id="domov"></div>
                <div @click="mapClicked('ihrisko')" @mouseover="label='Detske ihrisko'" @mouseleave="label=''" class="map_marker" id="ihrisko"></div>
                <div @click="mapClicked('mur')" @mouseover="label='K muru'" @mouseleave="label=''" class="map_marker" id="mur"></div>
                <div @click="mapClicked('refresh')" @mouseover="label='Re:Fresh Club'" @mouseleave="label=''" class="map_marker" id="refresh"></div>
                <div @click="mapClicked('cintorin')" @mouseover="label='Cintorin'" @mouseleave="label=''" class="map_marker" id="cintorin"></div>
            </div>
        </div>
        <div id="map_tooltip" v-show="label != ''">
            {{ label }}
        </div>

        <div id="map_close" @click="$emit('hide')">X</div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                label: ''
            }
        },
        methods: {
            mapClicked(destination) {
                bus.$emit('map/clicked', destination)
            }
        },
        mounted() {
            document.addEventListener('mousemove', function(ev) {
                var tooltip = document.getElementById('map_tooltip')
                tooltip.style.top = (ev.clientY) + 'px';
                tooltip.style.left = (ev.clientX + 20) + 'px';
            },false)

            bus.$on('map/changeLabel', label => {
                this.label = label
            })
        }
    }
</script>

<style>
    #map_close {
        position: fixed;
        top: 0;
        right: 0;
        padding: 40px;
        font-size: 60px;
        cursor: pointer;
    }

    #map_tooltip {
        position: fixed;
        padding: 10px;
        /* width: 200px; */
        height: 22px;
        background-color: black;
        border: 2px solid greenyellow;
    }

    #map_wrapper {
        background-color:rgba(0, 0, 0, 0.4);
    }

    #map_dialog {
        margin: 5% auto;
        width: 60%;
        padding-bottom: 30%;
        position: relative;
    }

    #map_container {
        background: url(assets/mapa_big.jpg);
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        position: absolute;
        top: 0;
        left: 0;
    }

    .map_marker {
        position: absolute;
        cursor: pointer;
    }

    #ovladac {
        top: 36%;
        left: 48%;
        width: 17%;
        height: 25%;
    }
    #ihrisko {
        top: 0%;
        left: 35%;
        width: 18%;
        height: 34%;
    }
    #refresh {
        top: 27%;
        left: 70%;
        width: 22%;
        height: 34%;
    }
    #mur {
        top: 0%;
        left: 54%;
        width: 24%;
        height: 27%;
    }
    #domov {
        top: 0%;
        left: 0%;
        width: 26%;
        height: 37%;
    }
    #cintorin {
        top: 50%;
        left: 16%;
        width: 16%;
        height: 46%;
    }
</style>