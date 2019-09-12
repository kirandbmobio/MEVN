//import require packages
import axios from 'axios'

export default {
    //get product user wise
    getProduct() {
        return axios.get('/product')
            .then(response => {
                return response.data;
            })
    },
    //create new product
    createProduct(data) {
        return axios.post('/product/create', data)
            .then(response => {
                return response.data
            })
    },
    //delete product
    deleteProduct(id) {
        return axios.delete('/product/deleteProduct/' + id)
            .then(response => {
                return response.data;
            })
    },
    //get single product data
    getProductById(id) {
        return axios.get('/product/getProduct/' + id)
            .then(response => {
                return response.data
            })
    },
    //update product
    updateProduct(id, data) {
        console.log('data', data)
        return axios.put('/product/updateProduct/' + id, data)
            .then(response => {
                return response.data
            })
    },
    // get users all product
    getUserAllProduct (userId) {
        return axios.get('/product/userProduct/' + userId)
          .then(response => {
              return response.data
          })
    }
}