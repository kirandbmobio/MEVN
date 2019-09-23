<template>
    <div>
      <div id="table" class="col-xs-12 table-responsive">
        <!-- Users Listing -->
        <table class="table table-hover">
            <thead v-if="header.length > 0">
                <tr>
                    <th v-for="(item,index) of header" :key="index">
                      <div v-if="item.isSortable && data.length > 0">
                        <a class="large-3 medium-3 cell sortable-header" href="#" @click.prevent="sortAndSearchData({by: item.column})">{{item.fieldname}}
                          <img class="sort-icon" height="16px" width="16px" :src="require('../../assets/img/sort-asc.svg')" v-show="sortBy.sortBy == item.column && sortBy.sortKey == 'asc'"/>
                          <img class="sort-icon" height="16px" width="16px" :src="require('../../assets/img/sort-desc.svg')" v-show="sortBy.sortBy == item.column && sortBy.sortKey == 'desc'"/>
                        </a>
                      </div>
                      <div v-else>
                          {{item.fieldname}}
                      </div>
                      <div class="col-8" v-if="item.search && item.search.searchBy == 'input' && item.isSearchable">
                          <input type="text" :name="item.column" :key="item.column" @input="sortAndSearchData({by: item.column})" class="form-control" v-model="fullName[item.column]" placeholder="Search">
                      </div>
                      <div v-if="item.search && item.search.searchBy == 'select' && item.isSearchable">
                          <select class="form-control" v-model="text" @change="sortAndSearchData({by: item.column,query: text})">
                              <option v-for="(option, index) of item.search.options" :key="index">
                                  {{option}}
                              </option>
                          </select>
                      </div> 
                    </th>
                </tr>
            </thead>
            <tbody v-if="data.length > 0">
                <!-- use v-for for getting array data -->
                <tr v-for="users in data" :key="users._id" >
                    <td>{{users.user.fname}} {{users.user.lname}}</td>
                    <td>{{users.user.email}}</td>
                    <td>
                        <!-- product count router link -->
                        <span v-if="users.count > 0">
                            <router-link :to="{name:'product-detail' , params:{userId: users.user._id}}">
                              <a>{{users.count}}</a>
                            </router-link>
                        </span>
                        <span v-else>0</span>
                    </td>
                    <td>
                        <!-- edit and delete of users -->
                        <router-link :to="{name:'update-profile' , params: {userId:users.user._id}}"><a class="btn btn-primary">Edit</a></router-link>
                        <button class="btn btn-danger" @click.prevent="deleteUser(users.user._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
            <div v-else>
                <div>No Data Found</div>
            </div>
        </table>
    </div>
  </div>
</template>

<script>

export default {
    data () {
        return {
            text: '',
            query: '',
            fullName: {}
        }
    },
    props:{
        data: {
            type: Array
        },
        sortBy: {
            type: Object
        },
        header: {
            type: Array
        },
    },
    methods: {
        sortAndSearchData(data) {
            this.$emit('sort-search', {data: data, searchAttr: this.fullName})
        },
        deleteUser(id) {
            this.$emit('delete', id)
        },
        search() {
            this.$emit('search', this.query)
        }
    },
    mounted () {
    }
}
</script>

<style scoped>
    a .btn{
        color:white
    }
</style>