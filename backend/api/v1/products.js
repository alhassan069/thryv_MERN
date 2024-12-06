const products = require('express').Router()
const Product = require('../../models/Product')
const verifyTokenMiddleare = require('../../middleware/authMiddleware')
const logProductViewMiddleware = require('../../middleware/logProductView')

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Fetches the list of all products available in the store.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Product ID.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Name of the product.
 *                         example: "Product Name"
 *                       description:
 *                         type: string
 *                         description: Description of the product.
 *                         example: "This is a sample product description."
 *                       price:
 *                         type: number
 *                         format: float
 *                         description: Price of the product.
 *                         example: 99.99
 *                       imageUrl:
 *                         type: string
 *                         description: URL of the product image.
 *                         example: "https://example.com/product-image.jpg"
 *       401:
 *         description: Unauthorized access. No token provided or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error!"
 */


products.get("/products",verifyTokenMiddleare, async (req,res)=>{
    try {
        const products = await Product.findAll()
        res.status(200).json({products});
    } catch (error) {
        console.error('Error in fetching products:', error);
        res.status(500).json({error: "Internal server error!"})
    }
})

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     description: Fetches details of a specific product by its ID and logs the product view.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully retrieved product details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Product ID.
 *                       example: 1
 *                     name:
 *                       type: string
 *                       description: Product name.
 *                       example: "Product Name"
 *                     description:
 *                       type: string
 *                       description: Product description.
 *                       example: "Detailed description of the product."
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: Product price.
 *                       example: 99.99
 *                     imageUrl:
 *                       type: string
 *                       description: URL of the product image.
 *                       example: "https://example.com/product-image.jpg"
 *       401:
 *         description: Unauthorized access. No token provided or invalid token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Unauthorized access"
 *       404:
 *         description: Product not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Product not found"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error!"
 */

products.get("/products/:id",verifyTokenMiddleare,logProductViewMiddleware, async (req,res)=>{
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({product});
    } catch (error) {
        console.error('Error in fetching a product:', error);
        res.status(500).json({error: "Internal server error!"})
    }
})


module.exports = products;