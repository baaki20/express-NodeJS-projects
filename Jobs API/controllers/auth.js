const User = require('../models/User')
const { StatusCodes } = require("http-status-codes")
const {BadRequestError, UnauthenticatedError} = require('../errors')

const register = async (req, res) => {
    const user = await User.create({...req.body})

    const token = user.generateJWT()

    res.status(StatusCodes.CREATED).json({user: {name: user.name}, token})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        throw new BadRequestError('Email and password is required!')
    }

    const user = await User.findOne({email})
    if(!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    
    const isPasswordCorrect = await user.comparePasswords(password)
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    
    const token = user.generateJWT()
    res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}
const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({users})
}

module.exports = {
    register,
    login,
    getUsers
}