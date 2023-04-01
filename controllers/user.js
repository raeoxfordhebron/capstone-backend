const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

router.get("/", function(req, res) {
    res.send('respond with a resource')
})

router.post('/', async(req, res) => {
    const salt = await bcrypt.genSalt(10)
    const user = {
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt)
    }
    created_user = await User.create(user)
    res.status(201).json(created_user)
})

router.post('/login', async(req, res) => {
    const user = await User.findOne({ where: {email : req.body.email}})
    if(user){
        const password_valid = await bcrypt.compare(req.body.password, user.password)
        if(password_valid){
            token = jwt.sign({ "id": user.id, "email": user.email}, process.env.secretKey)
            res.status(200).json({token: token})
        } else {
            res.status(400).json({error: "Password Incorrect"})
        }
    } else {
        res.status(404).json({error: "User does not exist"})
    }
})

router.get('/me', async(req, res, next) => {
    try {
        let token = req.headers['authorization'].split(" "[1])
        let decoded = jwt.verify(token, process.env.secretKey)
        req.user = decoded
        next()
    } catch(err){
        res.status(401).json({"msg": "Couldn't Authenticate"})
    }
}, 
async(req, res, next) => {
    let user = await User.findOne({where:{id: req.user.id}, attributes: {exclude: ["password"]}})
    if(user === null){
        res.status(404).json({'msg': "User not found"})
    }
    res.status(200).json(user)
}
)

module.exports = router