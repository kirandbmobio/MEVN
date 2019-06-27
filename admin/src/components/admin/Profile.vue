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
        <router-link :to="{name:'update-profile' , params:{ userId:user._id }}"><a  class="btn btn-primary">Update</a></router-link> 
      </div>
    </div>
  </div>
</template>

<script>

export default {
    name:'profile',
  data() {
    return {
      user: {}
    };
  },
  created(){
       let adminId = this.$session.get('adminId')
       this.$http.get(`http://localhost:8000/user/`+adminId)
       .then(response=>{
           this.user = response.data.userData
       })
       .catch(err=>{
           console.log(err);
       })
       
  },
  methods: {}
};
</script>

<style scoped>
a{
    color:white
}
</style>
