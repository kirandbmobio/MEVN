<template>
    <div class="row">
        <div class="col-md-5">
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
import URL from '../../../../config/dev.env';
export default {
    name:'update-product',
    data(){
        return{
           product:{}
        }
    },
    methods:{
        updateProduct(id){
            this.$http.put(URL.API_URL+`product/updateProduct/${id}`,this.product)
            .then(response=>{
                this.$router.push({
                    name:'product-detail',
                    params:{userId:this.product.user_id}
                })
            })
        }
    },
    created(){
        let productId = this.$route.params.productId;
        this.$http.get(URL.API_URL+`product/getProduct/${productId}`)
        .then(response=>{
            this.product = response.data.product
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
}
</script>

<style scoped>
</style>
