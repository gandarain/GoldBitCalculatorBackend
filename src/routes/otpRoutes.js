import express from 'express'

import { requestOtp, verifyOtp, resetPassword } from '../controllers/otpController.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: OTP
 *   description: API for managing One-Time Passwords (OTP) for registration and password recovery
 */

/**
 * @swagger
 * /api/otp/request:
 *   post:
 *     summary: Request OTP (for register or forgot password)
 *     tags: [OTP]
 *     description: |
 *       Send an OTP to the user's email for specific purposes such as **registration** or **forgot password**.
 *       <br>Available types: 
 *       - `register` for new user registration  
 *       - `forgot_password` for password recovery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - type
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *               type:
 *                 type: string
 *                 enum: [register, forgot_password]
 *                 example: "register"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Invalid request or validation error
 *       500:
 *         description: Server error
 */
router.post('/request', requestOtp)

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify OTP
 *     tags: [OTP]
 *     description: |
 *       Verify the OTP code sent to user's email for a specific purpose (either registration or forgot password).
 *       If verification is successful, the OTP record will be marked as verified.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - type
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               type:
 *                 type: string
 *                 enum: [register, forgot_password]
 *                 example: "forgot_password"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 *       500:
 *         description: Server error
 */
router.post('/verify', verifyOtp)

/**
 * @swagger
 * /api/otp/reset-password:
 *   post:
 *     summary: Reset password (after verifying OTP)
 *     tags: [OTP]
 *     description: |
 *       Allows a user to reset their password **after successfully verifying OTP**.  
 *       This endpoint should only be called after `/api/otp/verify` with `type = forgot_password` has succeeded.
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
 *                 example: "johndoe@gmail.com"
 *               password:
 *                 type: string
 *                 example: "newStrongPassword123!"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       400:
 *         description: OTP not verified or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP not yet verified or expired"
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.post('/reset-password', resetPassword)

export default router
