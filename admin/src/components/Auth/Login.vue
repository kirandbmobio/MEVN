<template>
  <div>
      <!-- <div>{{messageDisplay}}</div> -->
      {{message}}
      <!--  login request value -->
    <div style="padding:20px">
      <div class="col-md-12 center">
        <div class="form-group">
          Email ID:
          <input type="text" v-model="email" class="form-control">
          Password:
          <input type="text" class="form-control" v-model="password">
          <br>
          <button class="btn btn-primary" @click.prevent="login">Login</button>
        </div>
        <p>
          Click Here for
          <router-link to="/sign-up">
            <a>Sign Up</a>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//import files

export default {
    name:'login',
    //data set 
  data() {
    return {
      email: "",
      password: "",
      value: "",
      lastValue: ""
    }
  },
  computed: {
      ...mapGetters(['message'])
  },
  methods: {
      //create login method
    login() {
      let data = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', data)
      .then(response => {
         if(!response.data.isAdmin) {
            this.$router.push({name:'user-profile'})
         } else {
           this.$router.push({name:'profile'})
         }
         
      })
      //api call for login 
    //   api.login(data)
    //   .then(response => {
    //       //if user not registered
    //       if(response.message === 'user not registerd'){
    //           this.message = response.message
    //       }else{
    //           //direction to admin profile
    //             this.$router.push({
    //             name: "user-profile"
    //         })
    //      }
    //   });
    }
  }
}
</script>

<style scoped>
</style>
