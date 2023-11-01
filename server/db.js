const config = require('config')
require('dotenv').config()

const Pool = require('pg').Pool

// const pool = new Pool(config.get('pg'))
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
})

pool.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connection to db is successfull')
})

module.exports = pool