const express = require('express')
const router = express.Router()
const {Book} = require("../models/index")


// Book Index Route
router.get('/', async (req, res) => {
    const books = await Book.findAll()
    res.json(books)
 })
 
 // Book Create Route
 router.post('/create', async (req, res) => {
     try {
         const {title, genre, image, id, name} = req.body
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
 
 // Book Update Route
 router.put('/:id', async (req, res) => {
    console.log("anything")
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