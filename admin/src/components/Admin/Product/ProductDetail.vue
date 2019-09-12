<template>
    <div class="row" style="padding:10px">
        <div class="col-md-6">
            <h1>Product List</h1>
        </div>
        <!-- User Details -->
        <div class="col-md-6">
                <label class="label">Name: {{products[0].user_id.fname}} {{products[0].user_id.lname}}</label>
                <label class="label">Email : {{products[0].user_id.email}}</label>
        </div>
        <!-- user product details -->
        <div class="col-md-12">
            <table class="table table-hover">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product._id">
                    <td>{{product.pname}}</td>
                    <td>{{product.quantity}}</td>
                    <td>{{product.price}}</td>
                    <td>
                        <router-link :to="{name: 'update-product', params: { productId: product._id }}" class="btn btn-primary">Edit</router-link>
                        <button class="btn btn-danger" @click.prevent="deleteProduct(product._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
//import  files
import api from '../../../api/product';
import { mapGetters } from 'vuex';

export default {
    name:'product-detail',
    //data set
    data(){
        return{
            user:{}
        }
    },
    computed: {
       ...mapGetters({
           products: 'productData'
       })
    },
    //create at the time component call
   mounted (){
       //set user id from parameters
       let userId = this.$route.params.userId;
       //get user's all products
       this.$store.dispatch('allUserProduct', userId)
    },
    methods:{
        //delete product
        deleteProduct(id){
            //set products
        this.products = this.products.filter(result => result._id !== id);
        //delete the product
        api.deleteProduct(id)
        .then(reponse => {
            console.log(response)
        })
        .catch(err => console.log(err));
    }
  }
}
</script>