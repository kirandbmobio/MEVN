//import require packages
import axios from 'axios'

export default {
    //get single user data
    getUser() {
        return axios.get('/user/profile')
            .then(response => {
                console.log('respomnse', response)
                return response.data;
            })
    },
    //update user
    updateUser(id, data) {
        return axios.put('/user/update/' + id, data)
            .then(response => {
                return response.data
            })
    },
    //get all user
    getAllUser() {
        return axios.get('/user/all/user')
            .then(response => {
                return response.data
            })
    },
    //delete user
    deleteUser(id) {
        return axios.delete('/user/deleteUser/' + id)
            .then(response => {
                return response.data
            })
    }
}