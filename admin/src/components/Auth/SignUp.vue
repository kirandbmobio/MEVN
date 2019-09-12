<template lang="pug">
div
 div(style="padding:20px")
  .col-md-6.center
    .form-group
     label.label
     |First Name
     input.form-control(
         type="text",
         v-model="fname"
     )
     label.label
     |Last Name
     input.form-control(
         type="text",
         v-model="lname"
     )
     label.label
     |Email ID:
     input.form-control(
         type="email",
         v-model="email"
     )
     label.label
     |Password:
     input.form-control(
         type="password",
         v-model="password"
     )
     br
     button.btn.btn-primary(
          @click.prevent="signUp"
      ) Sign Up
//-   <div>
//-     <div style="padding:20px">
//-       <div class="btn-success"></div>
//-       <!-- sign up data for request -->
//-       <div class="col-md-12 center">
//-         <div class="form-group">
//-           First Name:
//-           <input type="text" class="form-control" v-model="fname">
//-           Last Name:
//-           <input type="text" class="form-control" v-model="lname">
//-           Email ID:
//-           <input type="text" class="form-control" v-model="email">
//-           Password:
//-           <input type="password" class="form-control" v-model="password">
//-           Role:
//-           <select v-model="role" class="form-control">
//-               <option value="">Select</option>
//-               <option value="user">User</option>
//-               <option value="admin">Admin</option>
//-           </select>
//-           <br>
//-           <button class="btn btn-primary" @click.prevent="signUp">Sign Up</button>
//-         </div>
//-         <p>
//-           Click Here for
//-           <router-link to="/">
//-             <a>Login</a>
//-           </router-link>
//-         </p>
//-       </div>
//-     </div>
//-   </div>
</template>

<script>
//import files
import api from '../../api/auth';
export default {
    //data set
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: ""
    };
  },
  methods: {
      //sign up method
    signUp() {

      let data = {
        lname: this.lname,
        fname: this.fname,
        email: this.email,
        password: this.password
      };
      //sign up api call
      api.signUp(data)
      .then(response => {
          //if user already exist 
        if (response.message == "user already exist") {
            //redirect to login
          this.$router.push({
              name: 'login',
              query:{message: response.message}
          })
        } else {
            //if user not exist create and redirect to login
         this.$router.push({
              name: 'login',
              query:{message: response.message}
          })
        }
        //set data values to empty
        this.fname = "";
        this.lname = "";
        this.email = "";
        this.password = "";
      });
    }
  }
};
</script>

<style scoped>
</style>
