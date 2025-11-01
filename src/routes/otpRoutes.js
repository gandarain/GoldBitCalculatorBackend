import express from 'express'

import { requestOtp, verifyOtp } from '../controllers/otpController.js'

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
 *     summary: Request OTP
 *     tags: [OTP]
 *     description: Request OTP for registration or forgot password
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
 *                 example: "john.doe@example.com"
 *               type:
 *                 type: string
 *                 enum: ["register", "forgot_password"]
 *                 example: "register"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       400:
 *         description: Missing fields or invalid type
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
 *     description: Verify an OTP sent to user's email.
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
 *                 example: "john.doe@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               type:
 *                 type: string
 *                 enum: ["register", "forgot_password"]
 *                 example: "forgot_password"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid OTP or expired
 *       500:
 *         description: Server error
 */
router.post('/verify', verifyOtp)

export default router
