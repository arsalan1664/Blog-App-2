const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.registerUser = async (req, res) => {
    try {
        const {
            username,
            email,
            passward
        } = req.body

        // validation
        if (!username || !email || !passward) {
            return res.status(500).send({
                message: "Fill all Fields",
                success: false
            })
        }

        // existing user
        const existingUser = await userModel.findOne({
            email
        })
        if (existingUser) {
            return res.status(401).send({
                message: "User already exists",
                success: false
            })
        }

        // hashing
        const hashedpassward = await bcrypt.hash(passward, 10)

        // save user
        const user = new userModel({
            username,
            email,
            passward: hashedpassward
        })
        await user.save()
        return res.status(201).send({
            message: "New user created",
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error in register controller',
            success: false,
            error
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const user = await userModel.find({})
        return res.status(200).send({
            message: "All user Data",
            success: true,
            user,
            userCount: user.lenght
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "User controller callback error",
            success: false,
            error
        })
    }
}


exports.loginUsers = async (req, res) => {
    try {
        const {
            email,
            passward
        } = req.body

        // validation
        if (!email || !passward) {
            return res.status(500).send({
                message: "Fill all Fields",
                success: false
            })
        }

        // find email
        const user = await userModel.findOne({
            email
        })
        if (! user) {
            return res.status(400).send({
                message: 'User Not Found',
                success: false
            })
        }

        // check passward
        const isMatch = await bcrypt.compare(passward, user.passward)
        if (! isMatch) {
            return res.status(400).send({
                message: "Invalid email or passward",
                success: false
            })
        }

        // if all condition true then
        return res.status(200).send({
            message: "Login Successful",
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Login controller callback error",
            success: false,
            error
        })
    }
}
