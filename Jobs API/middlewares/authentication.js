const { UnathenticatedError } = require('../errors')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnathenticatedError('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = {userId: payload.userId, name: payload.name}
        next()
    } catch (error) {
        throw new UnathenticatedError('Authentication invalid')
    }
}

module.exports = auth