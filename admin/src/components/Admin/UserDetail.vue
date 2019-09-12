<template>
    <div>
        <!-- Users Listing -->
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Products</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- use v-for for getting array data -->
                <tr v-for="users in allUserData" :key="users._id">
                    <td>{{users.user.fname}} {{users.user.lname}}</td>
                    <td>{{users.user.email}}</td>
                    <td>
                        <!-- product count router link -->
                        <span v-if="users.count > 0">
                            <router-link :to="{name:'product-detail' , params:{userId: users.user._id}}">
                              <a>{{users.count}}</a>
                            </router-link>
                        </span>
                        <span v-else>0</span>
                    </td>
                    <td>
                        <!-- edit and delete of users -->
                        <router-link :to="{name:'update-profile' , params: {userId:users.user._id}}"><a class="btn btn-primary">Edit</a></router-link>
                        <button class="btn btn-danger" @click.prevent="deleteUser(users.user._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
//import files
import api from '../../api/user';
import { mapGetters } from 'vuex';
export default {
    name:'user-detail',
    // data set
    data(){
        return{
            user:[]
        }
    },
    computed: {
        ...mapGetters(['allUserData'])
    },
    methods:{
        //delete user
        deleteUser(id) {
        //set deleted data to new user
      this.user = this.user.filter(result => result.user._id !== id);
      //delete api call
      api.deleteUser(id)
        .then()
        .catch(err => console.log(err));
    }
    },
    //created at the time componenet call
    mounted (){
        //get all users
        this.$store.dispatch('alluser')
        // api.getAllUser()
        // .then(response=>{
        //     //set users
        //     this.user = response.allUserArray
        // })
        // .catch(err=>{
        //     console.log(err);
        // })
    }
}
</script>

<style scoped>
    a .btn{
        color:white
    }
</style>