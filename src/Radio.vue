<template>
    <div class="note">
        <div class="note_content" style="margin: 5% auto;">

            <table class="wp-table" style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
                <tr v-for="track in playlist" :key="track.id" @click="playTrack(track.id)" class="choice" style="height: 40px;" :class="{'playing-track':track.is_playing}">
                    <td style="width: 4%;"><span v-if="track.is_playing">►</span></td>
                    <td style="width: 42%;">{{ track.artist }}</td>
                    <td style="width: 54%;">{{ track.name }}</td>
                </tr>
            </table>

            <table class="wp-table" style="width: 100%; text-align: center; margin-top: 20px;">
                <tr>
                    <td style="width: 33%;">
                        <span class="choice" @click="previousTrack">|◀</span>
                    </td>
                    <td style="width: 33%;">
                        <span class="choice" v-if="playingTrack == null || isPlaying == false" @click="play">▶</span>
                        <span class="choice" v-else @click="pause">▌▌</span>
                    </td>
                    <td style="width: 33%;">
                        <span class="choice" @click="nextTrack">▶|</span>
                    </td>
                </tr>
            </table>

            <div @click="$emit('hide')" class="choice" style="text-align: center; margin-top: 30px;">
                {{ lang.continue }}
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                playlist: [
                    {
                        id: 0,
                        artist: 'Grawlix',
                        name: 'Arachnidism',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/arachnidism.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 1,
                        artist: 'Daniel Jackson',
                        name: 'The Obelisk',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/obelisk.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 2,
                        artist: 'Nyctalope',
                        name: 'Rusty silicone',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/rusty_silicone.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 3,
                        artist: 'Grawlix',
                        name: 'Breakpoint',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/breakpoint.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 4,
                        artist: 'Daniel Jackson',
                        name: 'Moderny Chlapec',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/moderny_chlapec.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 5,
                        artist: 'Nyctalope',
                        name: 'Autumn marina',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/autumn_marina.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 6,
                        artist: 'Grawlix',
                        name: 'Descent',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/descent.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 7,
                        artist: 'Daniel Jackson',
                        name: 'Sticky Spawn of the Stars',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/sticky_spawn.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    },
                    {
                        id: 8,
                        artist: 'Nyctalope',
                        name: 'Birth of Phoenix',
                        is_playing: false,
                        sound: new Howl({
                            src: ['mp3/ost/birth_of_phoenix.mp3'],
                            onend() {
                                this.nextTrack()
                            }
                        })
                    }
                ]
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
            }
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
        }
        // mounted() {
        //     Howler.prototype.onEnd = this.onEnd()
        // }
    }
</script>

<style>
    .playing-track {
        color: greenyellow !important;
    }
    .playing-track:hover {
        color: greenyellow !important;
        background: none !important;
    }
</style>