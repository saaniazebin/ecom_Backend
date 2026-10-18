
let Product = require("../models/productSchema")

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

module.exports = { createProduct ,getAllproductByOwnerController,getAllproductByCatagoryController,getAllproductBysunCatagoryController,getAllProduct}
