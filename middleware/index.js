require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require("./cors.js")
const rootRouter = require('../controllers/root')
const bookRouter = require('../controllers/book')
const authorRouter = require('../controllers/author')
const cookieParser = require('cookie-parser')


const corsConfig = 
process.env.ENVIRONMENT === "production" ? corsOptions : undefined;

function registerMiddleware(app) {
    app.use(cors(corsConfig))
    app.use(morgan("dev"))
    app.use(express.json())
    app.use("/books", bookRouter)
    app.use("/authors", authorRouter)
    app.use(rootRouter)
    app.use(cookieParser())
}

module.exports = registerMiddleware
