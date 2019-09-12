<template>
    <div class="row">
        <div class="col-md-5">
            <!-- View update product in edit mode -->
            <form >
               <div class="form-group">
                   <input type="hidden" v-model="singleProductData.user_id">
                   <label>Product Name:</label>
                   <input type="text" class="form-control" v-model="singleProductData.pname">
                   <label>Quantity:</label>
                   <input type="number" class="form-control" v-model="singleProductData.quantity">
                   <label>Price:</label>
                   <input type="number" class="form-control" v-model="singleProductData.price"><br>
                   <button class="btn btn-primary" @click.prevent="updateProduct(singleProductData._id)">Update Product</button>
               </div>
            </form>
        </div>
    </div>
</template>

<script>
//import files
import {productMixin} from '../../../mixins/product';
import { mapGetters } from 'vuex'
export default {
    name:'edit-product',
    mixins:[productMixin],
    computed: {
        ...mapGetters(['singleProductData'])
    },
    created () {
      this.getProductById()
    }
    
}
</script>

<style scoped>
</style>
