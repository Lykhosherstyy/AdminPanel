import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/auth'

Vue.use(Vuex)

const appStore = new Vuex.Store({
    modules: {
        app,
        auth,
    },
    strict: true,
})

export default appStore