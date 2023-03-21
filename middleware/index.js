require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require("./cors.js")
const rootRouter = require('../controllers/root')
const bookRouter = require('../controllers/book')

const corsConfig = 
process.env.ENVIRONMENT === "production" ? corsOptions : undefined;

function registerMiddleware(app) {
    app.use(cors(corsConfig))
    app.use(morgan("dev"))
    app.use(express.json())
    app.use("/books", bookRouter)
    app.use(rootRouter)
}

module.exports = registerMiddleware
