require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')
const Book = require('./models/book')
const Author = require('./models/author')

const app = express()

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Book Index Route
app.get('/books', async (req, res) => {
   const books = await Book.findAll()
   res.json(books)
})

// Book Create Route
app.post('/books/create', async (req, res) => {
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

// Book Delete Route
app.delete('/books/:id', async (req, res) => {
    const id = req.params.id
    await Book.destroy({
        where: {
            id: id
        }
    }).then(function(rowDeleted){
        if(rowDeleted === id){
            console.log('Deleted successfully')
        }
    })
    
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})