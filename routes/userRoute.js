const express = require('express')
const {
    getAllUsers,
    registerUser,
    loginUsers
} = require('../controllers/userController')

// rest object
const router = express.Router()

router.get('/all-users', getAllUsers)

router.post('/register', registerUser)
router.post('/login', loginUsers)


module.exports = router;
