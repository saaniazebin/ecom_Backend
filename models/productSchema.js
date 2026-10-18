const mongoose=require("mongoose")
const { type } = require("node:os")
const { deflate } = require("node:zlib")
const {Schema}=mongoose

const productSchema=new Schema ({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String
    },
    shortDescription:{
        type:String
    },
    sku:{
        type:String,
        required:true,
        unique:true

    },
    slug:{
         type:String,
        required:true,
        unique:true

    },
    price:{
        type:Number,
        required:true
    },
    image:[
        {
            url:{
                type:String,
            },
            isMain:{
                type:Boolean,
                default:false
            }
        }
    ],
    discountPrice:{
        type:Number
    },
    stock:{
        type:Number,
        
    },
    status:{
        type :String,
        enum:["approved","rejected",'pending'],
        default:"pending"
    },
    brand:{
        type :String
    },
    catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Catagory"
    },
    subCatagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubCatagory"
    },
     owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
   
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema)