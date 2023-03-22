const express = require('express')
const router = express.Router()
const Author = require('../models/author')


// Author Index Route
router.get('/', async (req, res) => {
    const authors = await Author.findAll()
    res.json(authors)
 })

// Book Create Route
  router.post('/create', async (req, res) => {
    try {
        const {name, image} = req.body
        const author = await Author.create({ 
            name,
            image
        })
        return res.status(201).json({
            author,
        })
    } catch (error){
        res.status(400).json(error)
    }
})

module.exports = router