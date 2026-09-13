const express = require('express');
const router = express.Router();
const {registrationController,loginController,verifyEmailController, forgotpasswordController, resetpasswordController}= require("../controllers/authController")

router.post('/registration',registrationController)
router.post('/login',loginController)
router.post('/varify/:token',verifyEmailController )
router.post('/forgetpass',forgotpasswordController )
router.post('/resetpassword/:token',resetpasswordController )
            

            

module.exports=router