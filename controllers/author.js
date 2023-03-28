const express = require('express')
const router = express.Router()
const {Author} = require('../models/index')


// Author Index Route
router.get('/', async (req, res) => {
    const authors = await Author.findAll()
    res.json(authors)
 })

// Author Create Route
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

// Author Update Route
 router.put('/:id', async (req, res) => {
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
  router.delete('/:id', async (req, res) => {
    const author = await Author.findOne({where: {id: req.params.id}}).catch(e => {console.log(e.message)})
    if(!author){
        console.log("err")
    }
    await author.destroy()
    res.redirect('/authors')
})

 // Author Show Route
 router.get('/:id', async (req, res) => {
    try{const author = await Author.findByPk(req.params.id)
    res.json(author)}
    catch (error){
        res.status(400).json({error})
    }
 })

module.exports = router