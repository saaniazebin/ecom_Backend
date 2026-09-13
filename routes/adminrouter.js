const express = require('express');
const router = express.Router();
const alluserController=require("../controllers/adminController")
router.get('/all-user',allUserController)


            

module.exports=router