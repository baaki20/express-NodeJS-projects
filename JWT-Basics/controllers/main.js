const {StatusCodes} = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
        throw new BadRequestError('Username or Password is required!')
    }
    const id = new Date().getDate()
    const token = jwt.sign({username, id}, process.env.JWT_SECRET, {expiresIn:'30d'})
    res.status(StatusCodes.OK).json({msg: 'Login successfull!', token})
}

const dashboard = (req, res) => {
    const random = Math.floor(Math.random()*100)
    res.status(StatusCodes.OK).json({msg: `Welcome ${req.user.username}`, secret: `Your secret number is ${random}`})

}


module.exports = {dashboard, login}