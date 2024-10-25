require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connectDB')
const { getAllProducts } = require('./controllers/products')
const app = express()

app.get('api/v1/products', getAllProducts)

const port = process.env.PORT || 3000

const connect = async() => {
    try {
        // connectDB
        connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`listening on port ${port}`))
        
    } catch (error) {
        console.log(error)
    }
}