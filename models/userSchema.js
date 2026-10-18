const mongoose=require("mongoose")
const { type } = require("node:os")
const {Schema}=mongoose

const userSchema=new Schema ({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
         required:true,
         ///unique:true
    },
    password:{
        type:String,
         required:true
    },
    terms:{
        type:Boolean, 
        required:true
    },
   role:{
    type:String,
    enum:["admin","user","vendor"],
    default:'user'
},

status:{
    type:String,
    enum:["active","deactive"],
    default:'active'
},

isvarified:{
    type:Boolean, 
    default:false
}
})
module.exports=mongoose.model("User",userSchema)