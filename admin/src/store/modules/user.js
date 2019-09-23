import axios from "axios";
import api from '../../api/user'
//set states
const state = {
    users: {},
    user: [],
    sortKey: 'desc',
    sortBy: '',
    pager: {
        page: 1
    }
}

//set getters
const getters = {
    userData: state => {
        return state.users; //return states value
    },
    allUserData: state => state.user, //return all user value,
    getSortKey: state => state.sortKey,
    getPager: state => state.pager,
    getSortBy: state => state.sortBy

}

//set mutations
const mutations = {
    userInfo: (state, payload) => {
        state.users = payload; //set new state value
    },
    auth_success: (state,user) => {
        state.token = token
    },
    getUserById: (state, user) => {
        state.users = user
    },
    alluser: (state, data) => {
        state.user = data.pageOfItems
        if (data.pager) {
            state.pager = data.pager
        }
    },
    sortKey: (state, key) => {
        state.sortKey = key
    },
    sortBy: (state, by) => {
        state.sortBy = by
    }
}

//set actions 
const actions = {
    userInfo: ({ commit }, payload) => {
        commit('userInfo', payload); //commit take argument as actions and payload data
    },
    auth_success: ({commit},user) => {
        commit('auth_success', token)
    },
    getUser: (context) => {
        axios.get('/user/profile')
        .then(response => {
            context.commit('userInfo', response.data)
        })
    },
    getUserById: ({commit}, userId) => {
        axios.get('/user/' + userId)
         .then(response => {
             commit('getUserById', response.data.userData)
         })
    },
    alluser: ({commit}, data) => {
      if (data.pageOfItems) {
          commit('alluser', data)
      }
    },
    //fot sorting
    sortData: ({commit,state}, data) => {
        if (data.sortBy.by !== state.sortBy) {
            commit('sortBy', data.sortBy.by)
        }
        let sortKey
        if (data.sortKey === 'asc') {
            sortKey = 'desc'
            commit('sortKey', 'desc')
        } else {
            sortKey = 'asc'
            commit('sortKey', 'asc')
        }
        for (let searchData in data.search) {
            if(data.search[searchData] === '') {
                delete data.search[searchData]
            }
        }
        axios.post(`/user/items?sortKey=${sortKey}&perPage=${data.perPage}&sortBy=${state.sortBy}`, data.search)
         .then(response => {
             commit('alluser', response.data)
         })
    }
}

//export the user store
export default {
    state,
    getters,
    mutations,
    actions
}