const sequelize = require('../database')
const { DataTypes } = require('sequelize')
// const Author = require('./author')

const Author = sequelize.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    authorimage: {
        type: DataTypes.STRING
    }
    }
)

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
    },
    genre: {
        type: DataTypes.STRING
    },
    bookimage: {
        type: DataTypes.STRING
    }
})


Book.belongsTo(Author)


async function migrateBook(){
    Book.sync({alter: true})
}

migrateBook()


module.exports = Book