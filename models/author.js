const sequelize = require('../database')
const { DataTypes } = require('sequelize')
const Book = require('./book')

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


Author.hasMany(Book)


async function migrateAuthor(){
    Author.sync({alter: true})
}

migrateAuthor()


module.exports = Author