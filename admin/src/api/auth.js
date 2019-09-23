//import require packages
import axios from 'axios';

export default {
    //for login 
    login(data) {
        //return login response
        return axios.post('/user/login', data)
            .then(response => {
                const token = response.data.tokenData
                const user = response.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                this.$store.dispatch('auth_success', user)
                return response.data;
            })
            .catch(err => {
                localStorage.removeItem('token')
                return err
            })
    },
    profile() {
      return axios.get('/user/profile')
       .then(response => {
           return response.data;
       })
    },
    //for signup 
    signUp(data) {
        //return login response
        return axios.post('/register', data)
            .then(response => {
                return response.data;
            })
    }
}