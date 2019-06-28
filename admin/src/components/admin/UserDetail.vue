<template>
    <div>
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
                <tr v-for="users in user" :key="users._id">
                    <td>{{users.user.fname}} {{users.user.lname}}</td>
                    <td>{{users.user.email}}</td>
                    <td>
                        <router-link :to="{name:'product-detail' , params:{userId: users.user._id}}"><a>{{users.count}}</a></router-link>
                    <td>
                    <td><router-link :to="{name:'update-profile' , params: {userId:users.user._id}}"><a class="btn btn-primary">Edit</a></router-link>
                        <button class="btn btn-danger" @click.prevent="deleteUser(users.user._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import URL from '../../../config/dev.env'
export default {
    name:'user-detail',
    data(){
        return{
            user:[]
        }
    },
    methods:{
        deleteUser(id) {
      this.user = this.user.filter(result => result.user._id !== id);
      
      this.$http
        .delete(URL.API_URL+`user/deleteUser/${id}`)
        .then()
        .catch(err => console.log(err));
    }
    },
    created(){
        this.$http.get(URL.API_URL+'user/all/user')
        .then(response=>{
            this.user = response.data.allUserArray
        })
        .catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style scoped>
    a .btn{
        color:white
    }
</style>