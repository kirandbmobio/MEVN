<template>
    <div class="row">
        <div class="col-md-5">
            <!-- Form inputs -->
            <form >
               <div class="form-group">
                   <label>Product Name:</label>
                   <input type="text" class="form-control" v-model="pname">
                   <label>Quantity:</label>
                   <input type="number" class="form-control" v-model="quantity">
                   <label>Price:</label>
                   <input type="number" class="form-control" v-model="price"><br>
                   <button class="btn btn-primary" @click.prevent="addProduct">Add Product</button>
               </div>
            </form>
        </div>
    </div>
</template>

<script>
//import files
import api from '../../../api/product';
export default {
    name:'product',
    //data set
    data(){
        return{
            pname:'',
            quantity:'',
            price:'',
        }
    },
    methods:{
        //for add product 
        addProduct(){
            let data={
                user_id:this.$session.get('userId'),
                pname:this.pname,
                quantity:this.quantity,
                price:this.price
            }
            //add new product data
            api.createProduct(data)
            .then(response=>{
                //direction to display product
                this.$router.push({
                    name:'display-product'
                })
            })
        }
    }
    
}
</script>

<style scoped>
</style>
