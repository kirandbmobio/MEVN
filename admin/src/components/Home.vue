<template lang="pug">
    div
     app-header
     router-view
</template>
<script>
//import component
import Header from "./Header.vue";

export default {
    name:'home',
    //set component names
    components: {
    appHeader: Header
  }
};
</script>

<style>
</style>
