<template>
  <div>
    <div style="padding:20px">
      <div class="btn-success"></div>
      <div class="col-md-12 center">
        <div class="form-group">
          First Name:
          <input type="text" class="form-control" v-model="fname">
          Last Name:
          <input type="text" class="form-control" v-model="lname">
          Email ID:
          <input type="text" class="form-control" v-model="email">
          Password:
          <input type="password" class="form-control" v-model="password">
          Role:
          <select v-model="role" class="form-control">
              <option value="">Select</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
          </select>
          <br>
          <button class="btn btn-primary" @click.prevent="signUp">Sign Up</button>
        </div>
        <p>
          Click Here for
          <router-link to="/">
            <a>Login</a>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      role:""
    };
  },
  methods: {
    signUp() {
      let data = {
        lname: this.lname,
        fname: this.fname,
        email: this.email,
        password: this.password,
        role:this.role
      };
      this.$http.post("http://localhost:8000/register", data).then(response => {
        if (response.data.message == "user already exist") {
          this.$router.push({
              name: 'login',
              query:{message: response.data.message}
          })
        } else {
         this.$router.push({
              name: 'login',
              query:{message: response.data.message}
          })
        }
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
