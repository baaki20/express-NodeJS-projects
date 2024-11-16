require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

const mainRouter = require('./routes/main')
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFoundMiddleware = require('./middlewares/not-found')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

try {
    app.listen(port, () => console.log(`Listening on port ${port}...`))
} catch (error) {
    console.log(error)
}
