import { sync, breaks } from '../../'
import App from './App.vue'
import breakjs from 'breakjs'
import createLogger from 'vuex/dist/logger'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    plugins: [createLogger({ collapsed: false })],
    state: {}
})

// grab the default breaks export from vuex-breakjs-sync
// and add another breakpoint on to it
//
// of course you can just define your own altogether
// and ignore the `breaks` export

breaks['phablet'] = 550

sync(store, breakjs)

new Vue({
    el: '#app',
    render: h => h(App),
    store
})
