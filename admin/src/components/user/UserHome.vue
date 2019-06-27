<template>
    <div>
       <app-header :user="false"></app-header>
       <router-view></router-view>
    </div>
</template>

<script>
import Header from '../Header.vue'
export default {
    name:'user-home',
    components:{
        appHeader:Header
    }
}
</script>

<style lang="">
    
</style>