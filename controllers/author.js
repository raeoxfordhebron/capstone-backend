const express = require('express')
const authorRouter = express.Router({mergeParams: true})
const {Author} = require('../models/index')


// Author Index Route
authorRouter.get('/', async (req, res) => {
    const authors = await Author.findAll()
    res.json(authors)
 })

// Author Create Route
authorRouter.post('/create', async (req, res) => {
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

// Author Update Route
authorRouter.put('/:id', async (req, res) => {
     try {
        const author = await Author.findByPk(req.params.id)
        await author.set(req.body)
        await author.save()
        res.json(author)
     } catch (error) {
        res.status(400).json({error})
     }
 })


 // Author Delete Route
 authorRouter.delete('/:id', async (req, res) => {
    const author = await Author.findOne({where: {id: req.params.id}}).catch(e => {console.log(e.message)})
    if(!author){
        console.log("err")
    }
    await author.destroy()
    res.redirect('/authors')
})

 // Author Show Route
 authorRouter.get('/:id', async (req, res) => {
    let authorId = req.params.id
    try{const author = await Author.findByPk(authorId)
    res.json(author)}
    catch (error){
        res.status(400).json({error})
    }
 })

 authorRouter.use('/:authorId/books', function(req, res, next) {
    req.authorId = req.params.authorId;
    next()
 })


module.exports = authorRouter