const { CustomError } = require("../errors/custom-error")

const errorHandlerMiddleware = (err, req, res) {
    if(err instanceof CustomError) {
        return res.status(err.statusCode).json({msg: err.message})
    }

    return res.status(500).json({msg: "Something went wrong, please try agin"})
}

module.exports = errorHandlerMiddleware
