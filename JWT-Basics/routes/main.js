const express = require('express')
const router = express.Router()
const {dashboard, login} = require('../controllers/main')
const authMiddleware = require('../middlewares/auth')

router.route('/dashboard').get(authMiddleware, dashboard)
router.route('/login').post(login)

module.exports = router