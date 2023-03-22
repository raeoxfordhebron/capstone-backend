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
        const {title, genre, image} = req.body
        const book = await Book.create({
            title, 
            genre,
            image
        })
        return res.status(201).json({
            book,
        })
    } catch (error){
        res.status(400).json(error)
    }
})

module.exports = router