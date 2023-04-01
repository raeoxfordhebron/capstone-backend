const express = require('express')
const router = express.Router()
const {User} = require("../models/index")

router.get('/register', (req, res) => {
    res.json("Hello World")
})

router.post('/register', async (req, res) => {
    const { email, password } = req.body

    const alreadyExistsUser = await User.findOne({ where: { email }}).catch((err) => {
        console.log("Error: ", err)
    })

    if(alreadyExistsUser) {
        return res.json({ message: "User already exists!"})
    }

    const newUser = await User.create({ email, password})
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err)
        res.json({ error: "Cannot register user!"})
    })
    if(savedUser) {
       return res.status(201).json({ savedUser })
    }
})

module.exports = router