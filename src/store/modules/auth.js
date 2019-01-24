import api from '../../services/api'
import storage from '../../utils/storage'

const state = {
    token: storage.get('user-token', ''),
    role: storage.get('role', ''),
    loading: '',
}

const getters = {
    isAuthenticated: state => !!state.token,
    role:state => !!state.roles,
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
    }
}

const mutations = {
    SET_TOKEN:(state, token) => {
        state.token = token
    },
    SET_ROLE:(state, role) => {
        state.role = role
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