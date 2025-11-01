import express from 'express'

import { registerUser, resetPassword, loginUser } from '../controllers/userController.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: User Registration
 *     tags: [Users]
 *     description: Register a new user after OTP verification.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd123"
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Validation error or unverified OTP
 *       500:
 *         description: Server error
 */
router.post('/register', registerUser)

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Reset Password
 *     tags: [Users]
 *     description: Reset the user's password after OTP verification for forgot password.
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
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "NewP@ssword123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: OTP not verified or invalid input
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/reset-password', resetPassword)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User Login
 *     tags: [Users]
 *     description: Authenticate user and return JWT token.
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
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/login', loginUser)

export default router
