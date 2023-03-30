const express = require('express')
const router = express.Router({mergeParams: true})
const Book = require("../models/book")
const Author = require("../models/author")


// Book Index Route
router.get('/', async (req, res) => {
    let authorId = req.authorId
    console.log(authorId)
    const books = await Book.findAll({include: Author})
    res.json(books)
 })
 
 // Book Create Route
 router.post('/create', async (req, res) => {
     try {
         const data = req.body
         const book = await Book.create(
            data.title,
            data.genre,
            data.image,
         )
         return res.status(201).json({
             book,
         })
     } catch (error){
         res.status(400).json(error)
     }
 })
 
 // Book Update Route
 router.put('/:bookId', async (req, res) => {
    let authorId = req.authorId
    let bookId = req.params.bookId
     try {
        const book = await Book.findByPk(req.params.id)
        await book.set(req.body)
        await book.save()
        res.json(book)
     } catch (error) {
        res.status(400).json({error})
     }
 })
 
 // Book Delete Route
 router.delete('/:id', async (req, res) => {
     const book = await Book.findOne({where: {id: req.params.id}}).catch(e => {console.log(e.message)})
     if(!book){
         console.log("err")
     }
     await book.destroy()
     res.redirect('/books')
 })

 // Book Show Route
 router.get('/:id', async (req, res) => {
    try{const book = await Book.findByPk(req.params.id)
    res.json(book)}
    catch (error){
        res.status(400).json({error})
    }
 })

 module.exports = router