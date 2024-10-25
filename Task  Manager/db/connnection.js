const express = require('express')
const mongoose = require('mongoose')

const app = express()

const connectionDB = (url) => {
    return mongoose.connect(url)
}

module.exports = connectionDB
