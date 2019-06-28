<template>
    <div class="row">
        <div class="col-md-6">
            <h1 style="padding:10px">Product List</h1>
        </div>
        
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
import URL from '../../../../config/dev.env';
export default {
    name:'product-detail',
    data(){
        return{
            products:[]
        }
    },
   created(){
       let userId = this.$route.params.userId;
        this.$http.get(URL.API_URL+`product/${userId}`)
        .then(response=>{
            this.products = response.data.products
        })
        .catch(err=>{
            console.log(err)
        })
    },
    methods:{
        deleteProduct(id){
            this.products = this.products.filter(result => result._id !== id);
      this.$http
        .delete(URL.API_URL+`product/deleteProduct/${id}`)
        .then()
        .catch(err => console.log(err));
    }
  }
}
</script>