const mongoose=require("mongoose")

function mongoDbConfig(){
    return mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log ("mongoose connected")
    }).catch(error=>{
        console.log("mongoDB connection error:",error)
    })
}

module.exports=mongoDbConfig