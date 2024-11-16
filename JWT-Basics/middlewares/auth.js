const { UnauthenticatedError } = require('../errors')
const {StatusCodes} = require('http-status-codes')

const jwt = require('jsonwebtoken')

const authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError("No token present")
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {username, id} = decoded
        req.user = {username, id}
        next()
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route")
    }
}

module.exports = authorizationMiddleware