const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogController = async (req, res) => {
    try {
        const blog = await blogModel.find({})
        if (! blog) {
            return res.status(200).send({
                message: 'no blog found',
                success: false
            })
        }
        return res.status(200).send({
            message: 'All of the blog',
            success: true,
            blogcount: blog.length,
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Problem in controllers',
            success: false,
            error
        })
    }
}

//
exports.createBlogController = async (req, res) => {
    try {
        const {
            title,
            descryption,
            image,
            user
        } = req.body
        if (!title || !descryption || !image || !user) {
            return res.status(400).send({
                message: 'please fill all fields',
                success: false
            })
        }
        const existingUser = await userModel.findById(user)
        if (! existingUser) {
            return res.status(404).send({
                message: "User not Found",
                success: false
            })
        }
        const newBlog = new blogModel({
            title,
            descryption,
            image,
            user
        })
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({
            session
        })
        existingUser.blogs.push(newBlog)
        await existingUser.save({
            session
        })
        await session.commitTransaction()
        await newBlog.save()
        return res.status(200).send({
            message: 'New Blog Created',
            success: true,
            newBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Problem in controllers',
            success: false,
            error
        })
    }
}

exports.getBlogByIdController = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const blog = await blogModel.findById(id)
        if (! blog) {
            return res.status(400).send({
                message: "Blog not found",
                success: false
            })
        }
        return res.status(200).send({
            message: 'blog',
            success: true,
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Problem in controllers',
            success: false,
            error
        })
    }
}

exports.updateBlogController = async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            title,
            descryption,
            image
        } = req.body
        const blog = await blogModel.findByIdAndUpdate(id, {
            ...req.body
        }, {
            new: true
        })
        return res.status(200).send({
            message: "Blog updated",
            success: true,
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Problem in controllers',
            success: false,
            error
        })
    }
}

exports.deleteBlogController = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success: true,
            message: "Blog Deleted!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Problem in controllers',
            success: false,
            error
        })
    }
}

exports.getUserBlogController = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs')
        if (! userBlog) {
            return res.status(400).send({
                message: 'blog not found with this id',
                success: false
            })
        }
        return res.status(200).send({
            message: 'User blog',
            success: true,
            userBlog
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'controller problem',
            success: false,
            error
        })
    }
}
