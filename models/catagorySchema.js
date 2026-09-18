const mongoose=require("mongoose")
const { type } = require("node:os")
const {Schema}=mongoose

const catagorySchema=new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:['active','deactive','reject'],
        default:'deactive'
    }
    
})
module.exports=mongoose.model("Catagory",catagorySchema)