<template>
    <div>
        <div class="card-footer pb-3 pt-3">
            <ul v-if="getPager.pages && getPager.pages.length" class="pagination">
                <li :class="{'disabled':getPager.currentPage === 1}" class="page-item first-item">
                    <router-link :to="{ query: { page: 1 }}" class="page-link">First</router-link>
                </li>
                <li :class="{'disabled':getPager.currentPage === 1}" class="page-item previous-item">
                    <router-link :to="{ query: { page: getPager.currentPage - 1 }}" class="page-link">Previous</router-link>
                </li>
                <li v-for="page in getPager.pages" :key="page" :class="{'active':getPager.currentPage === page}" class="page-item number-item">
                    <router-link :to="{ query: { page: page }}" class="page-link">{{page}}</router-link>
                </li>
                <li :class="{'disabled':getPager.currentPage === getPager.totalPages}" class="page-item next-item">
                    <router-link :to="{ query: { page: getPager.currentPage + 1 }}" class="page-link">Next</router-link>
                </li>
                <li :class="{'disabled':getPager.currentPage === getPager.totalPages}" class="page-item last-item">
                    <router-link :to="{ query: { page: getPager.totalPages }}" class="page-link">Last</router-link>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    props:{
        name: {
            type:String
        },
        perPage: {
            type: Number
        }
    },
    data () {
        return {
            pageOfItems: {}
        }
    },
    computed: {
        ...mapGetters(['allUserData', 'getSortKey', 'getPager', 'getSortBy']),
    },
    watch: {
        '$route.query.page': {
            immediate: true,
            handler(page) {
                page = parseInt(page) || 1
                let perPage = parseInt(this.perPage) || 5
                if(page !== this.getPager.currentPage) {
                          axios.get(`/user/items?page=${page}&perPage=${perPage}&sortKey=${this.getSortKey}&sortBy=${this.getSortBy}&searchName=${this.name}`)
                          .then(response => {
                            this.$store.dispatch('alluser',response.data)
                          })
                        //   axios.get(`/user/items?page=${page}&searchName=${this.name}`)
                        //     .then(response => {
                        //         this.$store.dispatch('alluser',response.data)
                        //     })
                }         
            }
        }
    },
    mounted () {
        
    }
}
</script>

