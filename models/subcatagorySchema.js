const mongoose=require("mongoose")
const { type } = require("node:os")
const {Schema}=mongoose

const subCatagorySchema=new Schema ({
    name:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:String,
        enum:['active','deactive','reject'],
        default:'deactive'
    },
    parentCatagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory"

    }
    
})
module.exports=mongoose.model("SubCatagory",subCatagorySchema)