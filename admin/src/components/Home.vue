<template>
    <div>
        <app-header :user="true"></app-header>
        <router-view></router-view>
    </div>
    
</template>
<script>
import Header from "./Header.vue";
export default {
    name:'home',
    components: {
    appHeader: Header
  }
};
</script>

<style>
</style>
