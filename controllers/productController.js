
let Product = require("../models/productSchema")
const { readSheet } =require ( 'read-excel-file/node')
const writeExcelFile= require ('write-excel-file/node')
const schema = {
  title: {
    column: 'title',
    type: String
  },
  description: {
    column: 'description',
    type: String
  },
  shortDescription: {
    column: 'shortDescription',
    type: String
  },
//   sku: {
//     column: 'sku',
//     type: String
//   },
//   slug: {
//     column: 'slug',
//     type: String
//   },
  price: {
    column: 'price',
    type: Number
  },
  discountPrice: {
    column: 'discountPrice',
    type: Number
  },
  stock: {
    column: 'stock',
    type: Number
  },
  status: {
    column: 'status',
    type: String
  },
  brand: {
    column: 'brand',
    type: String
  },
  image: {
    column: 'image',
    type: String
  }
}


//createProduct
let createProduct = async (req, res) => {
    let { title, description, shortDescription, price, brand, stock, discountPrice, catagory, subCatagory,isMain ,owner} = req.body

    let images= []
    req.files.map((item,index)=>{
        images.push({
            url:item.path,
            isMain:index ==isMain ? true:false 
        })
    })

    let slug = title.toLowerCase().split(" ").join("-")

    let existingSlug = await Product.findOne({
        slug: slug
    })

    if (existingSlug) {
        return res.status(400).json({
            success: false,
            message: "Slug already existed"
        })
    }

    let sku = `eco-${Date.now()}`
    console.log(sku)

    let product = new Product({
        title: title,
        description: description,
        shortDescription: shortDescription,
        price: price,
        brand: brand,
        stock: stock,
        discountPrice: discountPrice,
        catagory: catagory,
        subCatagory: subCatagory,
        slug: slug,
        sku: sku, 
        image:image,
        owner:owner
    })

    await product.save()

    res.status(201).json({
        success: true,
        message: "Product created"
    })
}

///allProduct
let getAllProduct=async(req,res)=>{
  try {
        let products= await Product.find({}).populate(["catagory","subCatagory","owner"])
    return res.status(200).json({
        success:true,
        message:"All products get ",
        data:products
    })
    
  } catch (error) {
    
        return res.status(500).json({
            success: false,
            message: error.message
        })
  }
}

///getAllproductByOwnerController
let getAllproductByOwnerController=async(req,res)=>{
   try {
     let {ownerId}=req.params
      let products= await Product.find({ownerId:ownerId}).populate(["catagory","subCatagory","owner"])
     return res.status(200).json({
        success:true,
        message:"products get by onwer",
        data:products
    })
   } catch (error) {
    
        return res.status(500).json({
            success: false,
            message: error.message
        })
   }
}

///getAllproductByCatagoryController
let getAllproductByCatagoryController=async(req,res)=>{
try {
         let {catagoryId}=req.params
    let products= await Product.find({ catagoryId:catagoryId}).populate(["catagory","subCatagory","owner"])
     return res.status(200).json({
        success:true,
        message:"products get by catagory",
        data:products
    })
} catch (error) {
     return res.status(500).json({
            success: false,
            message: error.message
        })
}
}


///getAllproductBysunCatagoryController

let getAllproductBysunCatagoryController=async(req,res)=>{
    try {
         let {subCatagoryId}=req.params
    let products= await Product.find({ subCatagoryId:subCatagoryId}).populate(["catagory","subCatagory","owner"])
     return res.status(200).json({
        success:true,
        message:"products get by SubCatagory",
        data:products
    })
} catch (error) {
     return res.status(500).json({
            success: false,
            message: error.message
        })
}

}

///bulkProductUploadController
const bulkProductUploadController = async (req, res) => {
    console.log("hello",req.file)
     try {
   
     const { objects, errors } = await readSheet(req.file.path, { schema })

     // console.log(" errors ", errors)
     // console.log(" objects ", objects)



    const products = objects.map((product) => ({
    ...product,
     slug : product.title.toLowerCase().split(" ").join("-"),
     sku : `eco-${product.title.substring(0,4)}-${Date.now()}`,
    image: [
        {
            url: product.image,
            isMain: true
        }
    ]
}))

       await Product.insertMany(products)

         res.status(201).json({
        success: true,
        message: "Product upload done"
    })    
       
   
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


module.exports = { createProduct ,getAllproductByOwnerController,getAllproductByCatagoryController,getAllproductBysunCatagoryController,getAllProduct,bulkProductUploadController}
