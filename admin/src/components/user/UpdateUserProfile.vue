<template>
  <div>
    <div class="form-group">
      <div class="col-md-4">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="user.fname" >
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="user.lname" >
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" >
        <label>Password:</label>
        <input type="text" class="form-control" v-model="user.password" >
        <br>
        <button class="btn btn-primary" @click.prevent="updateProfile(user._id)">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import URL from '../../../config/dev.env';
export default {
    name:'update-user-profile',

  data() {
    return {
      user:{}
    };
  },
  created(){
      let userId = this.$session.get('userId');
     this.$http.get(URL.API_URL+`user/${userId}`)
     .then(response=>{
         this.user = response.data.userData
     })
     .catch(err=>{
         console.log(err)
     })
  },

  methods: {
      updateProfile(id){
          this.$http.put(URL.API_URL+`user/update/${id}` , this.user)
          .then(response=>{
            this.$router.push({
                name: "user-profile"
            });
          })
          .catch(err=>{
              console.log(err)
          })
      }
  }
};
</script>

<style scoped>

</style>
