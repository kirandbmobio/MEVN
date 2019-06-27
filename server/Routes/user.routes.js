const express = require("express");
const router = express.Router();
const user = require("../models/user.models");
const Product = require('../models/product.model');
// const schema = mongoose.Schema;

router.get('/all/user', async(req, res) => {
    let allUserArray = [];
    user.find({ role: 'user' }, async(err, allUser) => {
        if (err) {
            console.log(err)
        } else {
            for (let i = 0; i < allUser.length; i++) {
                let products = await Product.find({ user_id: allUser[i] });
                allUserArray.push({
                    user: allUser[i],
                    count: products.length
                })
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
router.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    user.findOne({
        email: email,
        password: password
    }, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            if (!user) {
                return res.send({
                    message: "user not registerd"
                });
            }
            if (user) {
                if (user.role == 'admin') {
                    return res.send({
                        user,
                        message: "admin login successfully"
                    });
                } else {
                    return res.send({
                        user,
                        message: "user login successfully"
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

router.get("/:id", function(req, res) {
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