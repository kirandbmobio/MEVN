<template>
    <div class="row">
        <div class="col-md-5">
            <!-- View update user product in edit mode -->
            <form >
               <div class="form-group">
                   <input type="hidden" v-model="product.user_id">
                   <label>Product Name:</label>
                   <input type="text" class="form-control" v-model="product.pname">
                   <label>Quantity:</label>
                   <input type="number" class="form-control" v-model="product.quantity">
                   <label>Price:</label>
                   <input type="number" class="form-control" v-model="product.price"><br>
                   <button class="btn btn-primary" @click.prevent="updateProduct(product._id)">Update Product</button>
               </div>
            </form>
        </div>
    </div>
</template>

<script>
//import files
import api from '../../../api/product';
export default {
    name:'update-product',
    //data set
    data(){
        return{
           product:{}
        }
    },
    methods:{
        //update product
        updateProduct(id){
            //update api call
            api.updateProduct(id,this.product)
            .then(response=>{
                //direction to prdouct details
                this.$router.push({
                    name:'product-detail',
                    params:{userId:this.product.user_id._id}
                })
            })
        }
    },
    //create at the time component call
    created(){
        //set product id 
        let productId = this.$route.params.productId;
        //get product
        api.getProductById(productId)
        .then(response=>{
            //set product 
            this.product = response.product
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}
</script>

<style scoped>
</style>
