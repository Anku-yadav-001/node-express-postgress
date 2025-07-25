const pkg = require("pg")

const { Pool } = pkg

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
})

pool.on("connect",()=>{
    console.log("connection pool established with database")
})

module.exports = pool
