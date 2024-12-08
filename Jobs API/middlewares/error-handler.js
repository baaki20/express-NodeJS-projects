const {CustomAPIError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong, try again'})
}

module.exports = errorHandlerMiddleware