const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const testUser = require('../middleware/testUser')
const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

const { register, login, updateUser } = require('../controllers/auth')
router.post('/register', limiter, register)
router.post('/login', limiter, login)
router.patch('/updateUser', authenticateUser, testUser, updateUser)

module.exports = router