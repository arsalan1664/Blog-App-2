const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [
            true,
            'username is required'
        ]
    },
    email: {
        type: String,
        required: [
            true,
            'email is required'
        ]
    },
    passward: {
        type: String,
        required: [
            true,
            'passward is required'
        ]
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Blog-Model'
        }
    ]
}, {
    timestamps: true
})

const userModel = new mongoose.model('Blog-users', userSchema)

module.exports = userModel;
