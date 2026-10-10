const express = require('express');

const router = express.Router();

const {userController,createCatagory,getAllCatagory,updateCatagory,deleteCatagory}=require("../controllers/userController")



           
/**
 * @swagger
 * /product:
 *   get:
 *     summary: User product route
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Hello user
 */
router.get('/allUser', userController)






/**
 * @swagger
 * /catagory/{name}:
 *   put:
 *     summary: Update category
 *     tags: [Catagory]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Existing category name
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newName:
 *                 type: string
 *                 example: Electronics
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Category not found
 */
router.put("/catagory/:name", updateCatagory)


/**
 * @swagger
 * /catagory/{name}:
 *   delete:
 *     summary: Delete category
 *     tags: [Catagory]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Category name
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Category not found
 */
router.delete("/catagory/:name", deleteCatagory)

module.exports=router