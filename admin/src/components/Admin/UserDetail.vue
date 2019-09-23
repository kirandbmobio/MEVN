<template>
<div>
    <div class="col-12 d-flex justify-content-center align-items-center"> 
    </div>
    <div>
        <datatable 
            :data="allUserData" 
            @delete="deleteUser" 
            @sort-search="SortAndSearchData"
            :sortBy="sortBy"
            :header="header"
        ></datatable>
    </div>
    <div>
        <pagination :name="name" :perPage="perPage" v-if="allUserData.length > 0"></pagination>
    </div>
</div>
</template>
<script>
//import files
import api from '../../api/user';
import { mapGetters } from 'vuex';
import Pagination from '../datatable/Pagination'
import Datatable from '../datatable/DataTable'
export default {
    name:'user-detail',
    // data set
    data(){
        return{
        flag: true,
        perPage: 10,
        header: [
            {
                column: 'fname',
                fieldname: 'Name',
                isSortable: true,
                isSearchable: true,
                search: {
                    searchBy: 'input'
                }
            },
            {
                column: 'email',
                fieldname: 'Email',
                isSortable: true,
                isSearchable: true,
                search: {
                    searchBy: 'input'
                }
            },
            {
                column: 'products',
                fieldname: 'Products',
                isSortable: false
            },
            {
                column: 'Actions',
                fieldname: 'Actions',
                isSortable: false
            }],
        name: ''
        }
    },
    components: {
      Pagination,
      Datatable
    },
    computed: {
        ...mapGetters(['allUserData', 'getSortKey', 'getSortBy']),
        sortBy () {
            return {sortBy: this.getSortBy, sortKey: this.getSortKey}
        }
    },
    methods:{
        SortAndSearchData (data) {
            if (data === undefined) {
                data = {
                  data:{
                    by: this.getSortBy,
                    query: ''
                  },
                  searchAttr: {}
                }
            }
            if (this.$route.query.page) {
                this.$store.dispatch('sortData', {sortKey: this.getSortKey, perPage: this.perPage, sortBy: data.data, search: data.searchAttr})
                this.$router.push('/user-detail')
            } else {
                this.$store.dispatch('sortData', {sortKey: this.getSortKey, perPage: this.perPage, sortBy: data.data, search: data.searchAttr})
             }
        },
        
        //delete user
        deleteUser(id) {
        //set deleted data to new user
          let pageOfItems = this.allUserData.filter(result => result.user._id !== id);
          this.$store.dispatch('alluser', {pageOfItems: pageOfItems})
      //delete api call
      api.deleteUser(id)
        .then(response => {
            this.$route.push('/user-detail')
        })
        .catch(err => console.log(err));
    }
    },
    //created at the time componenet call
    mounted (){
        //get all users
        this.SortAndSearchData()
    }
}
</script>

<style scoped>
    a .btn{
        color:white
    }
</style>