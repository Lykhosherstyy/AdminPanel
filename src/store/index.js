import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/auth'
import users from './modules/users'

Vue.use(Vuex)

const appStore = new Vuex.Store({
    modules: {
        app,
        auth,
        users
    },
    strict: true,
})

export default appStore