const users = require('express').Router()
const redisClient = require('../../config/redis')
const verifyTokenMiddleware = require('../../middleware/authMiddleware')

/**
 * @swagger
 * /api/v1/users/recentlyViewed:
 *   get:
 *     summary: Get recently viewed products
 *     description: Retrieves the list of recently viewed products for the authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved recently viewed products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 recentlyViewed:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         description: ID of the product.
 *                         example: "12345"
 *                       timestamp:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp when the product was viewed.
 *                         example: "2023-12-06T12:34:56Z"
 *       401:
 *         description: Unauthorized access. No token provided.
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
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error"
 */

users.get("/users/recentlyViewed", verifyTokenMiddleware, async (req, res) => {
    const userId  = req.userId;

    try {
        const redisKey = `recentlyViewed:${userId}`;
        const recentlyViewed = await redisClient.lRange(redisKey, 0, -1);

        const parsedRecentlyViewed = recentlyViewed.map((item) => JSON.parse(item));
        res.status(200).json({ "recentlyViewed" :parsedRecentlyViewed});
    } catch (error) {
        console.error('Error fetching recently viewed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = users;