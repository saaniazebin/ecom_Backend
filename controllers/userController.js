Cat=require('../models/catagorySchema')
let {catagoryEmail}=require("../utils/emailsender")
let userController=(req,res)=>{

    res.status(400).json('hello user')
}

          /////Create_Catagory/////
let createCatagory= async(req,res)=>{
    let {name}=req.params
    let existingName=await Cat.find({name:name.toLowerCase()})
    if(existingName){
        return res.status(400).json({
            success:false,
            message:'Catagory already exist'
        })
    }
    let cat=new Cat({
        name:name.toLowerCase()
    })
   await cat.save()
   await catagoryEmail(name)
     return res.status(201).json({
        success:true,
        message:'Catagory created'
        })
}

          /////Get_Catagory///
let getAllCatagory=async (req,res)=>{
    let catagory=await Cat.find({})
    
    res.status(200).json({
        success:true,
        message:"All Catagory",
        data:catagory
    })
}

            ////Update_Catagory///
let updateCatagory = async (req, res) => {

    let { name } = req.params
    let { newName } = req.body

    let existingCatagory = await Cat.findOne({ name: name.toLowerCase() })

    if (!existingCatagory) {
        return res.status(400).json({
            success: false,
            message: "Catagory not found"
        })
    }

    existingCatagory.name = newName.toLowerCase()

    await existingCatagory.save()

    return res.status(200).json({
        success: true,
        message: "Catagory updated"
    })
}

           ////Delete_Catagory///
let deleteCatagory = async (req, res) => {

    let { name } = req.params

    let existingCatagory = await Cat.findOne({ name: name.toLowerCase() })

    if (!existingCatagory) {
        return res.status(400).json({
            success: false,
            message: "Catagory not found"
        })
    }

    await Cat.findOneAndDelete({ name: name.toLowerCase() })

    return res.status(200).json({
        success: true,
        message: "Catagory deleted"
    })
}
module.exports={userController,createCatagory,getAllCatagory,updateCatagory,deleteCatagory}