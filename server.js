require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const Book = require('./models/book')
const Author = require('./models/author')
const {registerMiddleware} = require('./middleware')

const app = express()

// Middleware
registerMiddleware(app)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})