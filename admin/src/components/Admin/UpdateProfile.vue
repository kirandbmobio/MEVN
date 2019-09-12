<template>
  <div>
      <!-- View update user profile in edit mode -->
    <div class="form-group">
      <div class="col-md-4">
        <label>First Name:</label>
        <input type="text" class="form-control" v-model="userData.fname" >
        <label>Last Name:</label>
        <input type="text" class="form-control" v-model="userData.lname" >
        <label>Email:</label>
        <input type="text" class="form-control" v-model="userData.email" >
        <label>Password:</label>
        <input type="text" class="form-control" v-model="userData.password" >
        <br>
        <button class="btn btn-primary" @click.prevent="updateProfile(userData._id)">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
//import files
import api from '../../api/user';
import { mapGetters } from 'vuex';
export default {
    name:'update-profile',

//data set
  data() {
    return {
      user:{}
    };
  },
  computed: {
      ...mapGetters(['userData'])
  },
  //created at the time component call
  created(){
      let userId = this.$route.params.userId;
      this.$store.dispatch('getUserById', userId)
      //set user from parameters
    //get user by id
    // api.getUser(userId)
    //  .then(response=>{
    //      //set user
    //      this.user = response.userData
    //  })
    //  .catch(err=>{
    //      console.log(err)
    //  })
  },

  methods: {
      updateProfile(id){
         api.updateUser(id,this.userData)
          .then(response=>{
              if(this.userData.role == 'admin'){
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
