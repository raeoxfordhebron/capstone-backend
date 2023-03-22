const sequelize = require('../database')
const { DataTypes } = require('sequelize')
const Book = require('./book')
const Author = require('./author')

Book.Author = Book.belongsTo(Author, {
    foreignKey: 'authorid'
})
Author.Book = Author.hasMany(Book, {
    foreignKey: 'bookid' 
})

async function migrateBook(){
    Book.sync({alter: true})
}

migrateBook()