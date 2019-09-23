const express = require("express");
const router = express.Router();
const paginate = require('jw-paginate')
const user = require("../models/user.models");
const Product = require('../models/product.model');
const token = require('../middleware/auth.middleware');
// const schema = mongoose.Schema;

router.get('/userData', async(req,res) => {
	let users = await user.find()
	res.json({user: users})
}) 
//for getting all users
router.get('/all/user', async(req, res) => {
    let allUserArray = [];
    user.find(async(err, allUser) => {
        if (err) {
            console.log(err)
        } else {
            for (let i = 0; i < allUser.length; i++) {
                if (allUser[i].role != 'admin') {
                    let products = await Product.find({user_id: allUser[i]._id});
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

//for pagination and sorting and searching
router.post('/items', token.checkAuth, async (req,res) => {
    let users
    let onlyUsers = []
    let sortValue
    let index
    let data = req.body
    let sortBy = req.query.sortBy.split(',')
    //if search name
    if (Object.entries(data).length !== 0 && data.constructor === Object) {
        let objectArray = []
        let andArray = []
        index = (req.query.sortKey === 'desc') ? 1 : -1
        for(let value in data) {
            if (data[value] !== '') {
                if (value.includes(',')) {
                    let newArray = value.split(',') 
                    let valueArray = data[value].split(' ')
                    if (valueArray.length <= 1) {
                        for (let [index,arrayvalue] of newArray.entries()) {
                          objectArray.push({[arrayvalue]: {'$regex': data[value], '$options': 'i'}})    
                        }
                    } else {
                      for (let [index,arrayvalue] of newArray.entries()) {
                        if (valueArray[index] !== 'undefined' && valueArray[index]) {
                          objectArray.push({[arrayvalue]: {'$regex': valueArray[index], '$options': 'i'}})
                        } 
                      }
                    }                    
                } else {
                    andArray.push({[value]:{'$regex': data[value], '$options': 'i'}})
                }
            }
        }
        if (objectArray.length > 0) {
            andArray.push({$or:objectArray})
        }
        if (andArray.length === 0) {
           users = await user.find().sort({fname: 1})
        } else {
            users = await user.find({$and: andArray}).sort({[sortBy[0]]: index})
        }
    } else if (req.query.sortKey && req.query.sortKey !== 'undefined' && req.query.sortBy !== 'undefined' && req.query.sortBy){
        index = (req.query.sortKey === 'desc') ? -1 : 1
        users = await user.find({}).sort({[sortBy[0]]: index})
    } else {
        users = await user.find({}).sort({fname: 1})
    }
    let page = parseInt(req.query.page) || 1
    for (let i = 0; i < users.length; i++) {
                if (users[i].role != 'admin') {
                    let products = await Product.find({user_id: users[i]._id});
                    onlyUsers.push({
                      user: users[i],
                      count: products.length
                    })
                }                
            }
    let pageSize = (req.query.perPage)
    let pager = paginate(onlyUsers.length, page, pageSize)

    let pageOfItems = onlyUsers.slice(pager.startIndex, pager.endIndex + 1)

    return res.json({
        pager,
        pageOfItems
    })
})

router.get("/loginPage", function(req, res, next) {
    let data = {
        style: "home.css"
    };
    res.render("login", {
        data
    });
});
//for searching
router.get('/search',token.checkAuth, async (req,res) => {
    try {
    let userData
    let onlyUsers = []
    if (req.query.searchName) {
     userData = await user.find({fname: { '$regex' : req.query.searchName, '$options' : 'i' } } || {lname: { '$regex' : req.query.searchName, '$options' : 'i' } } || {email: { '$regex' : req.query.searchName, '$options' : 'i' } })
    } else {   
     userData = await user.find()
    }
    if(userData.length) {
    for (let i = 0; i < userData.length; i++) {
                if (userData[i].role != 'admin') {
                    let products = await Product.find({user_id: userData[i]._id});
                    onlyUsers.push({
                      user: userData[i],
                      count: products.length
                    })
                }                
            }
    }
    let page = parseInt(req.query.page) || 1
    let pageSize = 2
    let pager = paginate(onlyUsers.length, page, pageSize)

    let pageOfItems = onlyUsers.slice(pager.startIndex, pager.endIndex + 1)
    res.json({
        pageOfItems,
        pager
    })
    } catch (err) {
        console.log('err', err)
    }
    
})
//for getting profile
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
//for login
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
                //create new token
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
//for send email
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

//get user by id
router.get("/:id",token.checkAuth, function(req, res) {
    user.findById(req.params.id, function(err, userData) {
        if (err) {
            console.log(err)
        } else {
            res.json({ userData });
        }
    })
})

//for update user
router.put('/update/:id', function(req, res) {
    user.update({ _id: req.params.id }, { $set: req.body }, function(err, updatedUser) {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: 'update successfully' })
        }
    })
})

//for delete user
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
