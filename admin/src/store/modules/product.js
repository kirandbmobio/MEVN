
import api from '../../api/product'
//set states
const state = {
    product: [],
    products: {}
}

//set getters
const getters = {
    productData: state => {
        return state.product //return state values 
    },
    singleProductData: state => {
        return state.products
    }
}

//set mutations 
const mutations = {
    productInfo: (state, payload) => {
        state.product = payload //set new states values
    },
    singleProduct: (state, payload) => {
        state.products = payload
    }
}

//set actions 
const actions = {
    productInfo: ({ commit }, payload) => {
        commit('productInfo', payload); //commit take argument as action and payload data
    },
    singleProduct: ({ commit }, payload) => {
        commit('singleProduct', payload)
    },
    allUserProduct: ({commit}, userId) => {
        api.getUserAllProduct(userId)
          .then(response => {
              commit('productInfo', response.products)
          })
    }
}

//export product store
export default {
    state,
    getters,
    mutations,
    actions
}