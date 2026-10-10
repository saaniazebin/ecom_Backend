let Cat=require('../models/catagorySchema')
let SubCat=require('../models/subcatagorySchema')
let getCategory=require("../utils/promise")


//createCatagory
let createCatagory= async(req,res)=>{
    let {name,owner}=req.params
    let existingName=await Cat.find({name:name.toLowerCase()})
    if(existingName){
        return res.status(400).json({
            success:false,
            message:'Catagory already exist'
        })
    }
    let cat=new Cat({
        name:name.toLowerCase(),
        owner:owner
    })
   await cat.save()
   await catagoryEmail(name)
     return res.status(201).json({
        success:true,
        message:'Catagory created'
        })
}

          /////Get_AllCatagory///
let getAllCatagory=async (req,res)=>{
    let catagory=await Cat.find({}).populate({
        path:"owner",
        select:"-password"
    })
    
    res.status(200).json({
        success:true,
        message:"All Catagory",
        data:catagory
    })
}

          ////createSubcatagory
let createSubCatagory=async(req,res)=>{
        let {name, parentCatagory}=req.params

     let existingName=await SubCat.find({name:name.toLowerCase()})
    if(existingName){
        return res.status(400).json({
            success:false,
            message:'Sub Catagory already exist'
        })
    }
    let subCat=new SubCat({
        name:name.toLowerCase(),
         parentCatagory: parentCatagory 
    })

    let catUpdate=await Cat.findByIdAndUpdate({_id:parentCatagory},
        {$push:{SubCatagory:subCat._id}}
    )
   await SubCat.save()
   await catagoryEmail(name)
     return res.status(201).json({
        success:true,
        message:'Sub Catagory created'
        })
}
                 /////getAllSubCatagory
  /////Get_Catagory///
let getAllSubCatagory=async (req,res)=>{
    let catagory=await SubCat.find({}).populate(" parentCatagory")
    
    res.status(200).json({
        success:true,
        message:"All Sub Catagory",
        data:SubCatagory
    })
}

   /////Get_AllSubCatagoryWiseCatagory///
let getAllCatagoryWiseSubCatagory=async (req,res)=>{
    let {id}=req.params
    let Subcatagory=await SubCat.find({ parentCatagory:id})
    
    res.status(200).json({
        success:true,
        message:"All Get Catagory",
        data:SubCatagory
    })
}
 

////Get_OwerWiseCatagory

let getAllOwnerWiseCatagory=async(req,res)=>{
    let {id}=req.params
    //let data= await Cat.find({owner:id}).populate("subCatagory")
  ////Promise_Start
//     let data= await Cat.find({owner:id}).lean()
//    let promise=new Promise(function(resolve,reject){
//       let cat=[]
//      data.map(async( item)=>{
        
//        try {
//          let catagory=await SubCat.find({parentCatagory:item._id})
//         console.log(catagory)

//         cat.push({
//             ...item,
//             subcatagory:catagory
//         })
//          if(data.length==cat.length){
//             resolve(cat )
//          }
//        } catch (error) {
//         reject(error)
//        }
//      })
      
// })

let value = await getCategory(id);

res.status(200).json({
    success: true,
    message: "All Get Catagory",
    data: value
})
}

module.exports={createCatagory,getAllCatagory,createSubCatagory,getAllSubCatagory,getAllCatagoryWiseSubCatagory,getAllOwnerWiseCatagory}