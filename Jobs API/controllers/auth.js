const User = require('../models/User')
const { StatusCodes } = require("http-status-codes")

const register = async (req, res) => {
    const user = User.create({...req.body})
    const token = user.generateJWT()

    res.status(StatusCodes.CREATED).json({user: {name: user.name}}, token)
}

const login = async (req, res) => {
    res.send('Login successfull')
}
const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(200).json({users})
}

module.exports = {
    register,
    login,
    getUsers
}