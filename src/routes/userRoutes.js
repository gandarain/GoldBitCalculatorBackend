import express from 'express'

import {
  registerUser,
  resetPassword,
  loginUser,
  getProfile,
  updatePassword,
  updateProfile
} from '../controllers/userController.js'
import { verifyToken } from '../middleware/authMiddleware.js'

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


/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     description: Retrieve the profile of the currently authenticated user using JWT token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64ffab77c05b1234abcd5678
 *                 fullName:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@gmail.com
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/profile', verifyToken, getProfile)

/**
 * @swagger
 * /api/users/update-password:
 *   put:
 *     summary: Update user password
 *     tags: [Users]
 *     description: Update the password of the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "OldP@ssw0rd"
 *               newPassword:
 *                 type: string
 *                 example: "NewP@ssw0rd123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid request (missing fields or wrong current password)
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Internal server error
 */
router.put('/update-password', verifyToken, updatePassword)

/**
 * @swagger
 * /api/users/profile/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     description: Update the user's profile information (currently only fullName).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Johnathan Doe"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 user:
 *                   type: object
 *                   properties:
 *                     fullName:
 *                       type: string
 *                       example: "Johnathan Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@gmail.com"
 *       400:
 *         description: Invalid or missing full name
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Server error
 */
router.put('/profile/update', verifyToken, updateProfile)

export default router
