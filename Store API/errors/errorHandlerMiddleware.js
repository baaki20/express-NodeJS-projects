const errorHandler = async(err, req, res, next) => {
   return res.status(500).json({msg: "Something went wroong"})
}

module.exports = errorHandler