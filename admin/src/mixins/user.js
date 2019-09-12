import { mapGetters } from 'vuex';
export const userMixin = {
    //created at the time component call

    methods: {
       
        updateProfile(id) {
            api.updateUser(id, this.userData)
                .then(response => {
                    this.$router.push({
                        name: 'user-profile'
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}