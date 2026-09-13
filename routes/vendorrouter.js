const express = require('express');
const router = express.Router();
const vendorController=require("../controllers/vendorController")
router.post('/create/product',vendorController)


            

module.exports=router