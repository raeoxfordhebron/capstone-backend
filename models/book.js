const sequelize = require('../database')
const { DataTypes } = require('sequelize')
const Author = require('./author')

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
    },
    genre: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    },
    authorid: {
        type: DataTypes.INTEGER,
        references: {
            model: Author,
            key: 'id'
        }
    }
})

Book.associate = function (models) {
    Book.belongsTo(models.Author)
}

async function migrateBook(){
    Book.sync({alter: true})
}

migrateBook()

module.exports = Book