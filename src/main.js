import Vue from 'vue'
import App from './App.vue'
import Typed from 'typed.js'
import Howler from 'howler'
import MIDI from 'midi.js'

Vue.prototype.Typed = Typed
Vue.prototype.Howler = Howler
Vue.prototype.MIDI = MIDI

Vue.prototype.lang = {
    continue: '<< CONTINUE >>'
}

window.bus = new Vue()

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')

/*

<span @click="$emit('setChapter', 1)" class="choice">{{ lang.continue }}</span>
@click="$emit('setStep', 1)"
<div class="choice" @click="$emit('setStep', 1)">Idem do kuchyne, sak som hladny more.</div>
<span class="choice" @click="$emit('note', 'noteText')">text</span>
@click="$emit('pickupItem', {item: 'walkman', note: 'Das si walkmana do vacku, sluchadla okolo krku.'})">

*/