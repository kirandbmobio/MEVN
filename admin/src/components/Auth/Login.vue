<template>
  <div>
      <!-- <div>{{messageDisplay}}</div> -->
      {{message}}
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
import URL from '../../../config/dev.env';
export default {
    name:'login',

  data() {
    return {
      email: "",
      password: "",
      message:""
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password
      };
      this.$http.post(URL.API_URL+"user/login", data).then(response => {
          if(response.data.message == 'user not registerd'){
              this.message = response.data.message;
          }else{
              if(response.data.user.role == 'admin'){
                  this.$session.start();
                  this.$session.set('adminId',response.data.user._id);
                this.$router.push({
                name: "profile"
            });
          }else{
                this.$session.start();
                this.$session.set('userId',response.data.user._id);
                this.$router.push({
                    name: 'user-profile'
            });
          }
         }
      });
    }
  }
};
</script>

<style scoped>
</style>
