<template>
    <div class="note" id="radio_wrapper">

        <div id="radio_close" @click="$emit('hide')">X</div>

        <div class="note_content" style="margin: 5% auto; width: 40%; font-size: 1vw; height: 500px; position: relative;">

            <div style="margin-left: 1%; height: 0px;">
                <img id="walkman_image" style="width: 35%; position: absolute; left: 10px;" src="icons/walkman/walkman.gif"></img>
                <img :style="walkman_buttons_offset" class="walkman_button" @click="previousTrack" src="icons/walkman/button_01.gif"></img>
                <img :style="walkman_buttons_offset" class="walkman_button" @click="stop" src="icons/walkman/button_02.gif"></img>
                <img :style="walkman_buttons_offset" class="walkman_button" @click="play" src="icons/walkman/button_03.gif"></img>
                <img :style="walkman_buttons_offset" class="walkman_button" @click="pause" src="icons/walkman/button_04.gif"></img>
                <img :style="walkman_buttons_offset" class="walkman_button" @click="nextTrack" src="icons/walkman/button_05.gif"></img>
            </div>

            <table class="wp-table" style="width: 65%; float: right;" border="0" cellspacing="0" cellpadding="0">
                <tr v-for="track in playlist" :key="track.id" @click="playTrack(track.id)" style="height: 30px;" :class="{'playing-track':track.is_playing}" class="choice">

                    <td style="width: 4%;">
                        <span v-if="track.is_playing">►</span>
                        <span v-else-if="track.is_loaded == false"><img src="icons/loading.gif" style="width: 20px;" alt=""></span>
                    </td>

                    <td style="width: 42%;">{{ track.artist }}</td>
                    <td style="width: 54%;">{{ track.name }}</td>
                </tr>
            </table>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['show'],
        data() {
            return {
                playlist: [
                    {
                        id: 0,
                        artist: 'Grawlix',
                        name: 'Dissected',
                        is_playing: false,
                        is_loaded: false,
                        sound: new Howl({
                            src: ['mp3/ost/dissected.wav'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 0)
                            }
                        })
                    },
                    {
                        id: 1,
                        artist: 'Daniel Jackson',
                        name: 'Fear',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/fear.wav'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 1)
                            }
                        })
                    },
                    {
                        id: 2,
                        artist: 'Leo Clair',
                        name: 'Rage burst',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/rage_burst.wav'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 1)
                            }
                        })
                    },
                    {
                        id: 3,
                        artist: 'Grawlix',
                        name: 'ICE breaker',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/ice_breaker.wav'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 3)
                            }
                        })
                    },
                    {
                        id: 4,
                        artist: 'Daniel Jackson',
                        name: 'Childhood',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/childhood.wav'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 4)
                            }
                        })
                    },
                    {
                        id: 5,
                        artist: 'Leo Clair',
                        name: 'Memory access',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/memory_access.wav'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 1)
                            }
                        })
                    },
                    {
                        id: 6,
                        artist: 'Milcho Malefic',
                        name: 'Last wish',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/last_wish.mp3'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 6)
                            }
                        })
                    },
                    {
                        id: 7,
                        artist: 'Milcho Malefic',
                        name: 'Love letter',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/love_letter.mp3'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 7)
                            }
                        })
                    },
                    {
                        id: 8,
                        artist: 'Nyctalope',
                        name: 'Droid heretic',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/droid_heretic.wav'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 7)
                            }
                        })
                    },
                    {
                        id: 9,
                        artist: 'Nyctalope',
                        name: 'Smile in the sunset',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/smile_in_the_sunset.mp3'],
                            onend() {
                                bus.$emit('nextTrack')
                            },
                            onload() {
                                bus.$emit('trackLoaded', 7)
                            }
                        })
                    }                                        
                ],
                walkman_buttons_offset: {
                    top: '0px'
                }
            }
        },
        watch: {
            show: function() {
                this.walkman_buttons_offset.top = document.querySelector('#walkman_image').height + 'px'
            }
        },
        methods: {
            nextTrack() {
                if (this.playingTrack.id >= this.playlist.length - 1) {
                    this.playTrack(0)
                } else {
                    this.playTrack(this.playingTrack.id + 1)
                }
            },
            previousTrack() {
                if (this.playingTrack.id == 0) {
                    this.playTrack(this.playlist.length - 1)
                } else {
                    this.playTrack(this.playingTrack.id - 1)
                }
            },
            playTrack(index) {
                if (this.playlist[index].is_loaded == false) return
                this.playlist.forEach(track => {
                    track.sound.stop()
                    track.is_playing = false
                })
                this.playlist[index].sound.play()
                this.playlist[index].is_playing = true
            },
            play() {
                if (this.playingTrack == null) {
                    this.playTrack(0)
                } else {
                    this.playingTrack.sound.play()
                }
            },
            pause() {
                this.playingTrack.sound.pause()
            },
            stop() {
                this.playingTrack.sound.stop()
            },
            getTrackById(track_id) {
                return this.playlist.filter(track => {
                    return track.id == track_id
                })[0]
            },
        },
        computed: {
            isPlaying: function() {
                return this.playingTrack.sound.playing()
            },
            playingTrack: function() {
                return this.playlist.filter(track => {
                    return track.is_playing == true
                })[0]
            }
        },
        mounted() {
            window.onresize = event => {
                this.walkman_buttons_offset.top = document.querySelector('#walkman_image').height + 'px'
            }

            bus.$on('nextTrack', () => {
                this.nextTrack()
            })
            bus.$on('trackLoaded', (track_id) => {
                var track = this.getTrackById(track_id)
                track.is_loaded = true
            })
        }
    }
</script>

<style>
    #radio_close {
        position: fixed;
        top: 0;
        right: 0;
        padding: 40px;
        font-size: 60px;
        cursor: pointer;
    }
    #radio_wrapper {
        background-color:rgba(0, 0, 0, 0.4);
    }

    .playing-track {
        color: greenyellow !important;
    }
    .playing-track:hover {
        color: greenyellow !important;
        background: none !important;
    }
    .walkman_button {
        width: 6.8%;
        cursor: pointer;
        position: relative;
    }
    .walkman_button:hover {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        border: 4px solid white;
    }
</style>