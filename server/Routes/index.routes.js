const express = require('express');
const router = express.Router();
const user = require('../models/user.models');
router.post('/register', (req, res) => {
    let data = req.body;
    user.findOne({
        email: data.email
    }, function(err, result) {
        if (err) {
            return res.render('error');
        }
        if (!result) {
            let User = new user({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            });
            User.save(function(err, userData) {
                if (err) {
                    console.log(err)
                }
                res.send({
                    userData,
                    message: 'user created successfully'
                });
            });
        } else {
            res.send({
                message: 'user already exist'
            });
        }
    })


})

module.exports = router;