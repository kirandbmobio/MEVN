<template>
  <div>
      <!-- users detail in read only mode -->
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
        <router-link :to="{name:'update-profile' , params:{ userId:userData._id }}"><a  class="btn btn-primary">Update</a></router-link> 
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//import files
export default {
    name:'profile',
    //data set
  data() {
    return {
      user: {}
    };
  },
  computed: {
      ...mapGetters([
            'userData'
        ])
  },
  //create at the time component call
  created(){
       //get admin
       this.$store.dispatch('getUser')
    //    api.getUser()
    //    .then(response=>{
    //        //set user
    //        this.user = response
    //    })
    //    .catch(err=>{
    //        console.log(err);
    //    })
       
  },
  methods: {}
};
</script>

<style scoped>
a{
    color:white
}
</style>
