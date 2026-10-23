const express = require('express');
const _ = express.Router();
const vendorController=require("../controllers/vendorController")
const {createCatagory,getAllCatagory, createSubCatagory,getAllSubCatagory,getAllCatagoryWiseSubCatagory,getAllOwnerWiseCatagory}=require("../controllers/vendorController")
const {createProduct, getAllproductByOwnerController,getAllproductByCatagoryController,getAllproductBysunCatagoryController,getAllProduct,bulkProductUploadController}=require ("../controllers/productController.js")
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let name = `eco-${Date.now()}`
    cb(null, name + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload

///Category And Subcategory
_.post('/create/category', createCatagory)
_.post('/create/subcategory', createSubCatagory )
_.get('/all/subcategory', getAllSubCatagory)
_.get('/all/category/:id/subcategory', getAllCatagoryWiseSubCatagory)
_.get('/all/user/:id/category', getAllOwnerWiseCatagory)
_.get('/all/category', getAllCatagory)


///Product 
_.post("/create/product",upload.array("Image"),createProduct)
_.get('/all/products', getAllProduct)
_.get('/product/owner/:ownerId', getAllproductByOwnerController)
_.get('/product/catagory/:catagoryId', getAllproductByCatagoryController)
_.get('/product/subCatagory/:subCatagoryId', getAllproductBysunCatagoryController)
_.post("/bulk/product",upload.single("file"),bulkProductUploadController)
module.exports=_