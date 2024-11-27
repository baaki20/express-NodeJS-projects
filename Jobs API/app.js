require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connection')
const authenticateUser = require('./middlewares/authentication')

//routes
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')

//middlewares
notFoundMiddleware = require('./middlewares/not-found')
errorHandlerMiddleware = require('./middlewares/error-handler')

app.use(express.json())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()