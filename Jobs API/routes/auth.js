const { login, register, getUsers } = require('../controllers/auth')

const express = require('express')
const router = express.Router()

router.get('/users', getUsers)
router.post('/register', register)
router.post('/login', login)

module.exports = router