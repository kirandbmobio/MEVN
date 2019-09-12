<template>
    <div class="row">
        <div class="col-md-6">
            <h1 style="padding:10px">Product List</h1>
        </div>
        
        <div class="col-md-5">
        <!-- Add product router link -->
            <router-link :to="{ name: 'product' }" class="btn btn-primary">Add Product</router-link>
        </div>
        <!-- Product listing in table format-->
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
                <tr v-for="product in productData" :key="product._id">
                    <td>{{product.pname}}</td>
                    <td>{{product.quantity}}</td>
                    <td>{{product.price}}</td>
                    <td>
                        <!-- For edit and delete product -->
                        <router-link :to="{name: 'edit-product', params: { productId: product._id }}" class="btn btn-primary">Edit</router-link>
                        <button class="btn btn-danger" @click.prevent="deleteProduct(product._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {productMixin} from '../../../mixins/product';
export default {
   name:'display-product',

   mixins:[productMixin],

   //data object
   data() {
        return {
            product: {}
        }
    },
    //computed property
    computed: {
        ...mapGetters([
            //get product data
            'productData'
        ])
    },
    //created at the time component call
    created() {
        this.getProduct()
    }
}
</script>