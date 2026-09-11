const express = require('express');
const router = express.Router();
const {registrationController,loginController,verifyEmailController}= require("../controllers/authController")

router.post('/registration',registrationController)
router.post('/login',loginController)
router.post('/varify/:token',verifyEmailController )
            

            

module.exports=router