<template>
  <div>
    <div v-if="user">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
          <router-link tag="li" :to="{name:'profile' , params:{userId : this.$route.params.userId}}" active-class="active" class="nav-link"><a>Profile</a></router-link>
          <router-link tag="li" :to="{name:'user-detail' ,params:{userId : this.$route.params.userId}}" active-class="active" class="nav-link"><a>Users</a></router-link>
           <li class="nav-link"><a @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
    </div>
    <div v-else>
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
          <router-link tag="li" :to="{name:'user-profile' , params:{userId : this.$route.params.userId}}" active-class="active" class="nav-link"><a>Profile</a></router-link>
          <router-link tag="li" :to="{name:'display-product' ,params:{userId : this.$route.params.userId}}" active-class="active" class="nav-link"><a>Product</a></router-link>
          <li class="nav-link"><a @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "headers",
  props:['user'],
  methods:{
      logout(){
          if(confirm("Are you sure?")){
              this.$session.destroy();
              this.$router.push({
                  name:'login'
              })
              return true;
          }
          
      }
  }
  
};
</script>

<style scoped>
    a{
        color:white
    }
    a:hover{
        color:aliceblue
    }
</style>
