require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connectDB')
const productsRoute = require('./routes/products')

const notFoundMiddleware = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handler')

const express = require('express')
const app = express()

const port = process.env.PORT || 3000

// middlewares
app.use(express.json())

app.use('/api/v1/products', productsRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const connect = async() => {
	try {
		// connectDB
		await connectDB(process.env.MONGO_URI)
		app.listen(port, console.log(`listening on port ${port}`))
	} catch (error) {
		console.log(error) 
	}
}

connect()