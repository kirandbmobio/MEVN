<template>
    <div>
        <!-- View User Profile in read only mode -->
        <div class="form-group">
        <div class="col-md-4">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="userData.fname" readonly>
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="userData.lname" readonly>
        <label>Email:</label>
        <input type="text" class="form-control" v-model="userData.email" readonly>
        <label>Password:</label>
        <input type="text" class="form-control" v-model="userData.password" readonly>
        <br>
        <!-- update router link -->
        <router-link :to="{name:'update-user-profile'}"><a  class="btn btn-primary">Update</a></router-link> 
      </div>
    </div>
    </div>
</template>

<script>
//import files
// import api from '../../api/user';
import { mapGetters } from 'vuex';
import {userMixin} from '../../mixins/user';
import jwtDecode from 'jwt-decode'
export default {
    name:'user-profile',
    //get all getters and map using spread operator
   mixins:[userMixin],
    computed: {
        ...mapGetters([
            'userData'
        ])
    },
    created() {
      this.$store.dispatch('getUser')
    },
}
</script>
<style scoped>
    a{
        color:whitesmoke
    }
    a:hover{
        color:aquamarine
    }
</style>