require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const corsOptions = require("./cors.js")
const rootRouter = require('../controllers/root')
const bookRouter = require('../controllers/book')
const authorRouter = require('../controllers/author')
const userRouter = require('../controllers/userController')
const db = require("../database")
const cookieParser = require('cookie-parser')
const userRoutes = require('../routes/userRoutes')

const User = db.users;

// Function to check if username or email already exists in the database
const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
      const username = await User.findOne({
        where: {
          userName: req.body.userName,
        },
      });
      //if username exist in the database respond with a status of 409
      if (username) {
        return res.json(409).send("username already taken");
      }
   
      //checking if email already exist
      const emailcheck = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
   
      //if email exist in the database respond with a status of 409
      if (emailcheck) {
        return res.json(409).send("Authentication failed");
      }
   
      next();
    } catch (error) {
      console.log(error);
    }
   };

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
    app.use("/users", userRoutes)
}

module.exports = {registerMiddleware, saveUser}
