<template>
  <div>
    <h1>Create A Post</h1>
    <form @submit.prevent="createPost">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Title:</label>
            <input type="text" class="form-control" v-model="post.title">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Post Body:</label>
            <textarea class="form-control" rows="5" v-model="post.body"></textarea>
          </div>
        </div>
      </div>
      <br>
      <div class="form-group">
        <button class="btn btn-primary">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      post: {}
    };
  },
  methods: {
    createPost() {
      Axios.post(`http://localhost:8000/post/create`, this.post).then(
        response => {
          this.$router.push({ name: "posts" });
        }
      );
    }
  }
};
</script>