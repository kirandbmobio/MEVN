<template>
  <div>
      <!-- {{own}} -->
    <div v-if=" isAdmin || isAdmin === 'true'">
    <!-- Admin Header -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
          <router-link :to="{name:'home'}" active-class="active" tag="li" class="nav-link"><a>Dashboard</a></router-link>
          <router-link tag="li" :to="{name:'profile' , params:{userId : this.$route.params.userId}}" active-class="active" class="nav-link"><a>Profile</a></router-link>
          <router-link tag="li" :to="{name:'user-detail' ,params:{userId : this.$route.params.userId}}" active-class="active" class="nav-link"><a>Users</a></router-link>
           <li class="nav-link"><a @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
    </div>
    <div v-else>
    <!-- User Header -->
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav">
          <router-link tag="li" :to="{name:'user-profile' , params:{userId : this.$route.params.userId}}" active-class="active" class="nav-link"><a>Profile</a></router-link>
          <router-link tag="li" :to="{name:'display-product'}" active-class="active" class="nav-link"><a>Product</a></router-link>
          <li class="nav-link"><a @click.prevent="logout">Logout</a></li>
      </ul>
    </nav>
    </div>
  </div>
</template>

<script>
//import all getters of vuex store
import {mapGetters} from 'vuex';

export default {
  name: "headers",
  computed:{ 
      //use spread operator for getting getters
      ...mapGetters([
        'isLoggedIn',
        'isAdmin'
      ])
  },

  methods:{
      //for logout
      logout(){
         localStorage.removeItem('access_token')
         this.$router.push({ name: 'login'})
         location.reload()
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
