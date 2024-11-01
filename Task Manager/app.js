const express = require('express')
const tasks = require('./routes/tasks')
const connectionDB = require('./db/connnection')
const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const connectionString = process.env.MONGO_URI

// middlewares
app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

const connect =  async() => {
    try {
        await connectionDB(connectionString)
        app.listen(port, console.log(`listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

connect()