const sequelize = require('../database')
const { DataTypes } = require('sequelize')

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
    image: {
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

const User = sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    }, 
    password: {
        type: DataTypes.STRING
    }    
})

Book.associate = function () {
    Book.belongsTo(Author)
}

async function migrateBook(){
    Book.sync({alter: true})
}

Author.associate = function () {
    Author.hasMany(Book, {
        foreignKey: {
            name: 'authorid',
        }
    })
}

async function migrateAuthor(){
    Author.sync({alter: true})
}

async function migrateUser(){
    User.sync({alter: true})
}

migrateAuthor()

migrateBook()

migrateUser()

module.exports = {Book, Author, User}