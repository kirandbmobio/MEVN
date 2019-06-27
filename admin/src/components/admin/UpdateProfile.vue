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
        <button class="btn btn-primary" @click.prevent="updateProfile">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'update-profile',

  data() {
    return {
      user:{}
    };
  },
  created(){
      let userId = this.$route.params.userId;
      console.log(userId);
     this.$http.get('http://localhost:8000/user/'+ userId)
     .then(response=>{
         this.user = response.data.userData
     })
     .catch(err=>{
         console.log(err)
     })
  },

  methods: {
      updateProfile(){
          this.$http.put('http://localhost:8000/user/update/'+ this.user._id , this.user)
          .then(response=>{
              console.log(response);
              if(this.user.role == 'admin'){
                  this.$router.push({
                  name:'profile'
              })
              }else{
            this.$router.push({
                name: "user-detail"
            });
              }
              
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
