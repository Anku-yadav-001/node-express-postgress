const express = require("express")
const dontenv = require('dotenv').config()
const PORT = process.env.PORT
const pool = require("./config/db")
const userRoute = require("./controllers/user.route")

const server = express()
server.use(express.json())

server.use("/user", userRoute)

server.get("/health-check",async (req,res)=>{
    const result = await pool.query("SELECT current_database()")
    console.log(result)
    return res.send("server is working fine")
})

server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})