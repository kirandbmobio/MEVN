import api from '../api/product'

export const productMixin = {
    methods: {
        getProduct () {
            //set user id from session
            //get product user wise
            api.getProduct()
                .then(response => {
                    //dispatch for commit the response data
                    this.$store.dispatch('productInfo', response.products)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getProductById ()  {
            let productId = this.$route.params.productId;
            //get product by id
            api.getProductById(productId)
                .then(response => {
                    //set response data
                    this.$store.dispatch('singleProduct', response.product)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        updateProduct(id) {
            api.updateProduct(id, this.$store.getters.singleProductData)
                .then(response => {
                    console.log(response)
                    //direction to display product page
                    this.$router.push({
                        name: 'display-product'
                    })
                })
        },
        deleteProduct(id) {
            this.productData = this.productData.filter(result => result._id != id);
            api.deleteProduct(id)
                .then()
                .catch(err => {
                    console.log(err)
                })
        }
    }
}