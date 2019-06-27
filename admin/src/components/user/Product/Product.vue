<template>
    <div class="row">
        <div class="col-md-5">
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
export default {
    name:'product',
    data(){
        return{
            pname:'',
            quantity:'',
            price:'',
        }
    },
    methods:{
        addProduct(){
            let data={
                user_id:this.$session.get('userId'),
                pname:this.pname,
                quantity:this.quantity,
                price:this.price
            }
            this.$http.post('http://localhost:8000/product/create',data)
            .then(response=>{
                this.$router.push({
                    name:'display-product'
                })
            })  
            .catch(err=>{
                console.log(err);
            })
        }
    }
    
}
</script>

<style scoped>
</style>
