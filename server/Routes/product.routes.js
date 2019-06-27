const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');

router.get('/:id', function(req, res) {
    Product.find({ user_id: req.params.id }, function(err, products) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                products
            })
        }
    })
})
router.get('/getProduct/:productId', function(req, res) {
    Product.findById(req.params.productId, function(err, product) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                product
            })
        }
    })
})
router.post('/create', function(req, res) {
    console.log(req.body);
    Product.create(req.body, function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                product
            })
        }
    })
})

router.put('/updateProduct/:productId', function(req, res) {
    Product.update({ _id: req.params.productId }, { $set: req.body }, function(err, product) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                message: 'product update successfully'
            })
        }
    })
})
router.delete('/deleteProduct/:id', function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                message: 'deleted successfully'
            })
        }
    })
})

module.exports = router;