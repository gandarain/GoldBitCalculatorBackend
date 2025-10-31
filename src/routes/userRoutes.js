import express from 'express'
import { registerUser } from '../controllers/userController.js'

const router = express.Router()

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd123"
 *     responses:
 *       400:
 *         description: Error validation
 *       500:
 *         description: Server error
 *       200:
 *         description: Register success
 */
router.post('/register', registerUser)

export default router
