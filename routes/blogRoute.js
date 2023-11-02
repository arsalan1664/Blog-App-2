const express = require('express')
const {
    getAllBlogController,
    createBlogController,
    getBlogByIdController,
    updateBlogController,
    deleteBlogController,
    getUserBlogController
} = require('../controllers/blogController')

const router = express.Router()

router.get('/all-blog', getAllBlogController)

router.post('/create-blog', createBlogController)

router.get('/read-blog/:id', getBlogByIdController)

router.put('/update-blog/:id', updateBlogController)

router.delete('/delete-blog/:id', deleteBlogController)

router.get('/user-blog/:id', getUserBlogController)

module.exports = router
