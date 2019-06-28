<template>
    <div>
        <div class="form-group">
        <div class="col-md-4">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="user.fname" readonly>
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="user.lname" readonly>
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" readonly>
        <label>Password:</label>
        <input type="text" class="form-control" v-model="user.password" readonly>
        <br>
        <router-link :to="{name:'update-user-profile'}"><a  class="btn btn-primary">Update</a></router-link> 
      </div>
    </div>
    </div>
</template>

<script>
import URL from '../../../config/dev.env';
export default {
    name:'user-profile',
     data() {
    return {
      user: {}
    };
  },
  created(){
       let userId = this.$session.get('userId');
       this.$http.get(URL.API_URL+`user/`+userId)
       .then(response=>{
           this.user = response.data.userData
       })
       .catch(err=>{
           console.log(err);
       })
       
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