<template>
    <div>
       <app-header></app-header>
       <router-view></router-view>
    </div>
</template>

<script>
// import component
import Header from '../Header.vue'
export default {
    name:'user-home',
    //set componenet name
    components:{
        appHeader:Header
    }
}
</script>

<style lang="">
    
</style>