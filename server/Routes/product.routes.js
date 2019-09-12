const express = require('express');
const router = express.Router();

const Product = require('../models/product.model');
const User = require('../models/user.models');
const token = require('../middleware/auth.middleware')

router.get('',token.checkAuth, function(req, res) {
    Product.find({ user_id: req.userData.email._id })
        .then(products => {
            User.findById(req.params.id)
                .then(user => {
                    res.json({
                        products,
                        user
                    })
                })
        })
        .catch(err => {
            console.log(err)
        })

})
router.get('/userProduct/:userId', token.checkAuth, function(req,res) {
    Product.find({'user_id': req.params.userId})
     .populate('user_id')
     .then(products => {
         res.json({
             products
         })
     })
})
router.get('/getProduct/:productId',token.checkAuth, function(req, res) {
    Product.findById(req.params.productId)
        .populate('user_id')
        .then(product => {
            res.json({
                product
            })
        })
        .catch(err => {
            console.log(err)
        })
})
router.post('/create',token.checkAuth, function(req, res) {
    let data = req.body
    data.user_id = req.userData.email._id
    Product.create(data, function(err, product) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                product
            })
        }
    })
})

router.put('/updateProduct/:productId',token.checkAuth, function(req, res) {

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
router.delete('/deleteProduct/:id',token.checkAuth, function(req, res) {
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