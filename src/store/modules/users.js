// import storage from '../../utils/storage'
// import menu from '../../Menu'
import API from '../../services/api';

const state = {
    users:[]
};

const getters = {
    users: state => state.users,
};

const actions = {
    'GET_USERS': ({commit}) => {
        return new Promise((resolve, reject) => {
            API().get('users').then(r => r.data.data).then(users => {

                commit('SET_USERS', users)

            })

        })
    },
    'ADD_USER': ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            API().post('users/add', data).then(response => {
                dispatch('GET_USERS')
                resolve(response);
            })
        })
    },
    'UPDATE_USER': ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            API().put('users/update/' + data._id, data ).then(response => {
                dispatch('GET_USERS')
                resolve(response);
            })
        })
    },
    'DELETE_USER': ({commit, dispatch}, data) => {
        return new Promise((resolve, reject) => {
            API().delete('users/delete/' + data).then(response => {
                dispatch('GET_USERS')
                resolve(response);
            })
        })
    },
}

const mutations = {
    SET_USERS: (state, users) => {
        state.users = users
    },
    // ADD_USER: (state, user) => {
    //     state.users.push(user)
    // },
}

export default {
    state,
    getters,
    actions,
    mutations,
}