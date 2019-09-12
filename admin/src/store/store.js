//import require packages and files
import Vuex from 'vuex';
import Vue from 'vue';
import user from './modules/user';
import product from './modules/product';
import axios from 'axios'

//set Vuex globally
Vue.use(Vuex)

//set states
const state = {
    token: localStorage.getItem('access_token') || null,
    admin: localStorage.getItem('admin') || null,
    message: ''
}

//set getters
const getters = {
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.admin,
    message: state => state.message
}

//set mutatitions
const mutations = {

    admin: state => {
        state.isLogin = false //set new value
    },
    user: state => {
        state.isLogin = true //set new value
    },
    login: (state, data) => {
        state.token = data.token,
        state.admin = data.admin
    },
    error: (state, message) => {
        state.message = message
    }
}

//set actions for commit the mutations
const actions = {
    admin: ({ commit }) => {
        commit('admin'); //commit take argument as mutation name
    },
    user: ({ commit }) => {
        commit('user'); //commit take argument as mutation name
    },
    login: (context, credentials) => {
        return new Promise((resolve, reject) => {
        axios.post('/user/login',credentials)
          .then(res => {
            const token = res.data.tokenData
            localStorage.setItem('access_token', token)
            localStorage.setItem('admin', res.data.isAdmin)
            axios.defaults.headers.common['Authorization'] = token
            context.commit('login', { token: token, admin: res.data.isAdmin})
            resolve(res)
        })
        .catch(err => {
            if (err) {
                context.commit('error', err.response.data.message)
            }
            reject(err)
        })
      })
        
    }
}

//export the vuex store which holds all the above objects and modules
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    //modules are also holds states, getters , mutations and actions
    modules: {
        user,
        product
    }
})