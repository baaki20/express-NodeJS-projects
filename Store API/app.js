require('dotenv').config()
const asyncHandler = require('express-async-handler')
const express = require('express')
const connectDB = require('./db/connectDB')
const products = require('./routes/products')
const errorHandler = require('./errors/errorHandlerMiddleware')

const app = express()
const port = process.env.PORT || 3000

// middlewares
app.use(express.json())

app.use('/api/v1/products', products)
app.use(errorHandler)

const connect = asyncHandler(async() => {
        // connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`listening on port ${port}`))
})

connect()