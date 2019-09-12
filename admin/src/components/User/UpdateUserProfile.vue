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
// import files and mapGetters
import {userMixin} from '../../mixins/user';
export default {
    name:'update-user-profile',
    mixins:[userMixin],
};
</script>

<style scoped>

</style>
