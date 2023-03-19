const {Sequelize} = require('sequelize')
require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL

// Database Connection
const sequelize = new Sequelize(DATABASE_URL)

// Prove Connection Established
async function testConnection(){
    try {
        await sequelize.authenticate(DATABASE_URL)
        console.log('Connection has been established successfully')
    } catch (error) {
        console.error('Unable to connect to the database', error)
    }
}

testConnection()

module.exports = sequelize