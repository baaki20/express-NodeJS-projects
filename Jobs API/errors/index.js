const {BadRequestError} = require('./bad-request')
const {UnathenticatedError} = require('./unauthenticated')
const {CustomAPIErrror} = require('./custom-error')
const {NotFoundError} = require('./not-found')

module.exports = {
    BadRequestError,
    UnathenticatedError,
    CustomAPIErrror,
    NotFoundError
}