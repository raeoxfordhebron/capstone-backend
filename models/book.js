const sequelize = require('../database')
const { DataTypes } = require('sequelize')

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    genre: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
})

async function migrateBook(){
    Book.sync({alter: true})
}

migrateBook()

module.exports = Book