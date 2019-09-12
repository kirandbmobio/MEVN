let token = localStorage.getItem('token')
 if(token === null || typeof token === 'undefined') {
        this.$router.push({ name: 'login'})
    }
export default {
    header() {
        headers: {
            'Authorization' = token
        }
    }
        
}