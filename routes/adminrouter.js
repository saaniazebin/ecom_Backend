const express = require('express');
const router = express.Router();
const {allUserController,
     deleteUserController,
     singleUser,
     activeUser ,deactiveUser,updateUser} = require("../controllers/adminController")

 

      ////Swagger_Add///
/**
 * @swagger
 * /all-user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: All users found
 */
router.get('/all-user',allUserController)


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get single user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User information
 */
router.get('/user/:id',singleUser)


/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/delete/:id", deleteUserController)


/**
 * @swagger
 * /deactive/user:
 *   get:
 *     summary: Get deactive user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Deactive user information
 */
router.get('/deactive/user',deactiveUser)


/**
 * @swagger
 * /active/user:
 *   get:
 *     summary: Get active user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Active user information
 */
router.get('/active/user',activeUser)


/**
 * @swagger
 * /update/user/{id}:
 *   get:
 *     summary: Update user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User updated successfully
 */
router.get('/update/user/:id',updateUser)



router.get('/all-user',allUserController)
router.get('/user/:id',singleUser)
router.delete("/delete/:id", deleteUserController)
router.get('/deactive/user',deactiveUser)
router.get('/active/user',activeUser)
router.get('/update/user/:id',updateUser)
            

module.exports=router