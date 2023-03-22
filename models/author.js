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
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    bookid: {
        type: DataTypes.INTEGER, 
        references: {
            model: Book, 
            key: 'id'
        }
    }
})

Author.associate = function (models) {
    Author.hasMany(models.Book, {
        foreignKey: {
            name: 'authorid'
        }
    })
}

async function migrateAuthor(){
    Author.sync({alter: true})
}

migrateAuthor()

module.exports = Author