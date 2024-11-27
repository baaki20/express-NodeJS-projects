const User = require('../models/User')
const { StatusCodes } = require("http-status-codes")
const {BadRequestError, UnauthenticatedError, UnathenticatedError} = require('../errors')

const register = async (req, res) => {
    const user = User.create({...req.body})
    const token = user.generateJWT()

    res.status(StatusCodes.CREATED).json({user: {name: user.name}}, token)
}

const login = async (req, res) => {
    const {email, passsword} = req.body
    if(!email || !password) {
        throw new BadRequestError('Email and password is required!')
    }

    const user = await User.findOne({email})
    if(!user) {
        throw new UnathenticatedError('Invalid credentials')
    }
    
    const isPasswordCorrect = await user.comparePasswods(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    
    const token = user.generateJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}}, token)
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