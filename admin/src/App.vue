<template lang="pug">
.container
 router-view
</template>

<script>
import Tree from "./Tree";

export default {
  data(){
      return{
          college:{
              name:'k ka',
            children:[
                {
                    name:'kiran',
                    children:[
                        {
                            name:'Ai'
                        },
                        {
                            name:'Ml'
                        }
                    ]
                },
                {
                    name:'Haresh',
                    children:[
                        {
                            name:'Mathematics',
                        },
                        {
                            name:'C and C++'
                        }
                    ]
                }
            ]
          }
      }
  },
  components: {
    Tree
  }
};
</script>
<style >
     div{
        margin:10px
    }
</style>