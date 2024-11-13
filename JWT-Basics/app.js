const express = require('express')
const app = express()

const mainRouter = require('./routes/main')
require('dotenv').config()
require('express-async-errors')

const port = process.env.PORT || 3000
app.use(express.json())

app.listen(port, () => console.log(`Listening on port ${port}...`))
