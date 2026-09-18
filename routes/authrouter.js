const express = require('express');
const router = express.Router();
const {registrationController,loginController,verifyEmailController, forgotpasswordController, resetpasswordController}= require("../controllers/authController")



          ////Swagger_add//
/**
 * @swagger
 * /registration:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - confirmPassword
 *               - terms
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *               terms:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Registration completed
 *       400:
 *         description: Invalid information
 */
router.post('/registration', registrationController)


/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credential
 */
router.post('/login', loginController)


/**
 * @swagger
 * /varify/{token}:
 *   post:
 *     summary: Verify user email
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 */
router.post('/varify/:token', verifyEmailController)


/**
 * @swagger
 * /forgetpass:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reset password email sent
 *       400:
 *         description: User not found
 */
router.post('/forgetpass', forgotpasswordController)


/**
 * @swagger
 * /resetpassword/{token}:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newpassword
 *               - confirmPassword
 *             properties:
 *               newpassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Password does not match
 */
router.post('/resetpassword/:token', resetpasswordController)







router.post('/registration',registrationController)
router.post('/login',loginController)
router.post('/varify/:token',verifyEmailController )
router.post('/forgetpass',forgotpasswordController )
router.post('/resetpassword/:token',resetpasswordController )
            

        

module.exports=router