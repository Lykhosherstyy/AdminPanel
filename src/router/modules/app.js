import storage from '../../utils/storage'
import menu from '../../Menu'

const state = {
    sidebar: {
        opened: storage.get('sidebar') ? !!storage.get('sidebar') : true
    },
    menu: menu,
    language: storage.get('language') || 'en'
}

const getters = {
    sidebar: state => state.sidebar,
    language: state => state.language,
    menu: state => state.menu,
}

const actions = {
    'TOGGLE_SIDEBAR': ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('TOGGLE_SIDEBAR')
        })
    },
    'CLOSE_SIDEBAR': ({commit}) => {
        return new Promise((resolve, reject) => {
            commit('CLOSE_SIDEBAR')
        })
    }

}

const mutations = {
    TOGGLE_SIDEBAR: (state) => {
        storage.set('sidebar', !state.sidebar.opened)
        state.sidebar.opened = !state.sidebar.opened
    },
    CLOSE_SIDEBAR: (state) => {
        storage.set('sidebar', false)
        state.sidebar.opened = false
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}