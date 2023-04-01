require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const corsOptions = require("./cors.js")
const rootRouter = require('../controllers/root')
const bookRouter = require('../controllers/book')
const authorRouter = require('../controllers/author')
const userRouter = require('../controllers/user')
const registerRouter = require('../controllers/register')
const loginRouter = require('../controllers/login')
const cookieParser = require('cookie-parser')
const { JsonWebTokenError } = require('jsonwebtoken')
require("../auth/passport")


const corsConfig = 
process.env.ENVIRONMENT === "production" ? corsOptions : undefined;

function registerMiddleware(app) {
    app.use(cors(corsConfig))
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(morgan("dev"))
    app.use(express.json())
    app.use("/books", bookRouter)
    app.use("/authors", authorRouter)
    app.use("/users", userRouter)
    app.use(loginRouter)
    app.use(registerRouter)
    app.use(rootRouter)
    app.use(cookieParser())
}


module.exports =  registerMiddleware 
