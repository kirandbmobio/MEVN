const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");
// const schema = mongoose.Schema;

router.post('/create', async(req, res) => {
    try {

        let createdData = await Post.create(req.body);
        res.json({
            data: createdData,
            message: 'Post created successfully'
        })
    } catch (err) {
        console.log(err);
    }
})

router.get('/allPosts', async(req, res) => {
    try {
        let allPost = await Post.find();
        res.json({
            data: allPost,
            message: 'all post'
        })
    } catch (err) {
        console.log(err);
    }
})

router.get('/edit/:id', async(req, res) => {
    try {
        let getEditData = await Post.findById(req.params.id)
        res.json({
            data: getEditData
        });
    } catch (err) {
        console.log(err)

    }
})

router.post('/update/:id', async(req, res) => {
    try {
        let updatedData = await Post.findById(req.params.id);
        if (!updatedData) {
            res.json({
                data: [],
                message: 'data is not found'
            })
        } else {
            updatedData.title = req.body.title;
            updatedData.body = req.body.body;
            let data = await updatedData.save();
            res.json({
                message: 'update successfully'
            })

        }
    } catch (err) {

    }
})

router.delete('/deletePost/:id', async(req, res) => {
    try {
        let post = await Post.findByIdAndRemove(req.params.id);
        res.json({
            message: 'deleted'
        })
    } catch (err) {
        console.log(err)

    }
})

module.exports = router;