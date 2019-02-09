import api from '../../services/api'
import storage from '../../utils/storage'

const state = {
    token: storage.get('user-token', ''),
    role: storage.get('role', ''),
    loading: '',
}

const getters = {
    isAuthenticated: state => !!state.token,
    role:state => state.role,
    loading: state => state.loading,
}

const actions = {
    'AUTH_REQUEST': ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit('LOADING_START')
            api().post('login', user)
                .then(resp => {
                    storage.set('user-token', resp.data.jwt )
                    storage.set('role', resp.data.role )
                    commit('SET_TOKEN', resp.data.jwt)
                    commit('SET_ROLE', resp.data.role)
                    commit('LOADING_END')
                    resolve(resp)
                })
                .catch(err => {
                    commit('LOADING_END')
                    reject(err)
                })
        })
    },
    'LOGOUT': ({commit, dispatch}, user) => {
        return new Promise((resolve, reject) => {
            commit('UNSET_TOKEN')
            commit('UNSET_ROLE')
            resolve()
        })
    },
}

const mutations = {
    SET_TOKEN:(state, token) => {
        state.token = token
    },
    SET_ROLE:(state, role) => {
        state.role = role
    },
    UNSET_TOKEN:(state) =>{
        state.token = storage.remove('user-token')
    },
    UNSET_ROLE:(state) =>{
        state.role = storage.remove('role')
    },
    LOADING_START: (state) => {
        state.loading = 'loading'
    },
    LOADING_END: (state) => {
        state.loading = 'loading'
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}