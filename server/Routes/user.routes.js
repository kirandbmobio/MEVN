const express = require("express");
const router = express.Router();
const user = require("../models/user.models");
const Product = require('../models/product.model');
const token = require('../middleware/auth.middleware');
// const schema = mongoose.Schema;

router.get('/userData', async(req,res) => {
	let users = await user.find()
	res.json({user: users})
}) 
router.get('/all/user', async(req, res) => {
    let allUserArray = [];
    user.find(async(err, allUser) => {
        if (err) {
            console.log(err)
        } else {
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].role != 'admin') {
                    let products = await Product.find({user_id: allUser[i]._id});
                    // console.log(products)
                    // console.log(allUser[i]._id)
                    allUserArray.push({
                      user: allUser[i],
                      count: products.length
                    })
                }                
            }
            res.json({ allUserArray })
        }
    })
})

router.get("/", function(req, res, next) {
    let data = {
        style: "home.css"
    };
    res.render("register", {
        data
    });
});
router.get("/checksession", checksignin, function(req, res) {
    console.log(req.session.user);
    res.render("profile", {
        user: req.session.user,
        message: req.flash("test")
    });
});

function checksignin(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        let err = new Error("not logged in ");
        next(err);
    }
}
router.get("/loginPage", function(req, res, next) {
    let data = {
        style: "home.css"
    };
    res.render("login", {
        data
    });
});
router.get('/profile',token.checkAuth, async (req,res) => {
    let id = req.userData.email._id
    let userData = await user.findOne({_id: id})
    if(userData) {
        res.send(userData)
    } else {
        res.send({
            message: 'user not registerd'
        })
    }
})
router.post("/login", async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    user.findOne({
        email: email
    }, async (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                return res.status(404).json({
                    message: "user not registerd" 
                });
            }
            if (user) {
                if(user.password !== password) {
                    return res.status(401).send({
                        message: 'Password mismatch'
                    })
                }
                let tokenData = await token.createToken(user)
                if (user.role == 'admin') {
                    return res.send({
                        tokenData,
                        message: "admin login successfully",
                        isAdmin: true
                    });
                } else {
                    return res.send({
                        tokenData,
                        user,
                        message: "user login successfully",
                        isAdmin: false
                    });
                }
            }

            // req.session.user = user;
            // req.flash('test', 'it worked');
            // res.redirect('/user/checksession');
        }
    });
});
router.get("/email", function(req, res) {
    res.mailer.send(
        "email", {
            to: "kiranb.mobio@gmail.com",
            subject: "hey"
        },
        function(err) {
            if (err) {
                console.log(err);
            }
            res.send("email sent");
        }
    );
});

router.get("/:id",token.checkAuth, function(req, res) {
    // console.log(req.params.id);
    user.findById(req.params.id, function(err, userData) {
        if (err) {
            console.log(err)
        } else {
            res.json({ userData });
        }
    })
})

router.put('/update/:id', function(req, res) {
    console.log(req.params.id, req.body)

    user.update({ _id: req.params.id }, { $set: req.body }, function(err, updatedUser) {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: 'update successfully' })
        }
    })
})

router.delete('/deleteUser/:id', function(req, res) {
    user.findOneAndRemove({ _id: req.params.id }, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            res.json({ message: 'deleted Successfully' });
        }
    })
})

module.exports = router;
