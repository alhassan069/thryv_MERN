const auth = require('express').Router()
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const {hashPassword, matchPassword} = require('../../utils')
const secret = process.env.SECRET;


/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: User registration
 *     description: Registers a new user with name, email, and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: User registered successfully.
 *       400:
 *         description: Incomplete details provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Incomplete details. Please provide correct name, email and password!
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
 *                   example: Registration failed.
 */

auth.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Incomplete details. Please provide correct name, email and password!" })
        }
        const hashedPassword = hashPassword(password);
        const user = new User({ name: name, email: email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully." })
    } catch (error) {
        console.error('Error in user registeration:', error);
        res.status(500).json({ error: 'Registration failed.' })
    }
})

/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with email and password and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: User's password.
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully authenticated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Authentication failed due to incorrect password.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Authentication Failed! Incorrect password.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *                   example: Authentication Failed! Incorrect email.
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
 *                   example: Login failed.
 */

auth.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).json({ error: "Authentication Failed! Incorrect email." })
        }
        const passwordMatched = matchPassword(password, user.password);
        if (!passwordMatched) {
            return res.status(401).json({ error: "Authentication Failed! Incorrect password." })
        }
        const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '6h' });
        res.status(200).json({ token })
    } catch (error) {
        console.error('Error in user login:', error);
        res.status(500).json({ error: 'Login failed.' })
    }
})


module.exports = auth;