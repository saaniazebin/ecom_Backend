require ('node:dns').setServers(["1.1.1.1","8.8.8.8"])
require('dotenv').config()
const express=require("express")
const app=express()
const authRouter=require ("./routes/authrouter.js")
const mongoDbConfig=require("./config/mongoDbConfig")


mongoDbConfig()
app.use(express.json())
app.use("/api/v1/auth", authRouter)
const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})