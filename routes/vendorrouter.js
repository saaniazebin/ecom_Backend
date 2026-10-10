const express = require('express');
const router = express.Router();
const vendorController=require("../controllers/vendorController")
const {createCatagory,getAllCatagory, createSubCatagory,getAllSubCatagory,getAllCatagoryWiseSubCatagory,getAllOwnerWiseCatagory}=require("../controllers/vendorController")



router.post('/create/catagory', createCatagory)
router.post('/create/subcatagory', createSubCatagory )
router.get('/all/subcatagory', getAllSubCatagory)
router.get('/all/catagory/:id/subcatagory', getAllCatagoryWiseSubCatagory)
router.get('/all/user/:id/catagory', getAllOwnerWiseCatagory)
router.get('/all/catagory', getAllCatagory)

            

module.exports=router