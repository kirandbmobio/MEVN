<template>
  <div>
    <h1>Edit Post</h1>
    <form @submit.prevent="updatePost">
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
        <button class="btn btn-primary">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      post: {}
    };
  },
  created() {
    axios
      .get(`http://localhost:8000/post/edit/${this.$route.params.id}`)
      .then(response => {
        this.post = response.data.data;
      });
  },
  methods: {
    updatePost() {
      axios
        .post(
          `http://localhost:8000/post/update/${this.$route.params.id}`,
          this.post
        )
        .then(response => {
          this.$router.push({ name: "posts" });
        });
    }
  }
};
</script>