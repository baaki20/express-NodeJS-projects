require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const jobsRouter = require('./routes/jobs')

app.use(express.json())

app.use('/api/v1', jobsRouter)

const port = process.env.PORT || 3000
const connectDB = require('./db/connection')

const start = () => {
    try {
        //connectDB
        connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }

}

start()