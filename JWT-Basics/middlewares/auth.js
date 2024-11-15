const { CustomError } = require('../errors/custom-error')
const {StatusCodes} = require('http-status-codes')

const jwt = require('jsonwebtoken')

const authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomError("No token present", StatusCodes.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {username, id} = decoded
        req.user = {username, id}
        next()
    } catch (error) {
        throw new CustomError("Not authorized to access this route", StatusCodes.UNAUTHORIZED)
    }
}

module.exports = authorizationMiddleware