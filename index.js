require ('node:dns').setServers(["1.1.1.1","8.8.8.8"])
require('dotenv').config()
const express=require("express")
const app=express()
const authRouter=require ("./routes/authrouter.js")
const userRouter=require ("./routes/userrouter.js")
const adminRouter=require ("./routes/adminrouter.js")
const vendorRouter=require ("./routes/vendorrouter.js")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("./config/swagger")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
const mongoDbConfig=require("./config/mongoDbConfig")
const { adminMiddleware, vendorMiddleware, userMiddleware } = require('./middleware/roleMiddleware.js')


mongoDbConfig()
app.use(express.json())
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userMiddleware,userRouter)
app.use("/api/v1/admin",adminMiddleware,adminRouter)
/////app.use("/api/v1/vendor",vendorMiddleware,vendorRouter)

const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`server is running on port:${port}`)
})