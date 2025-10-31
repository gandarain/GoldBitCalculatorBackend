import express from 'express'
import { requestOtp, verifyOtp } from '../controllers/otpController.js'

const router = express.Router()

/**
 * @swagger
 * /api/otp/request:
 *   post:
 *     summary: Request OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *     responses:
 *       400:
 *         description: Error validation
 *       500:
 *         description: Server error
 *       200:
 *         description: Request OTP success
 */
router.post('/request', requestOtp)

/**
 * @swagger
 * /api/otp/verify:
 *   post:
 *     summary: Verify OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@gmail.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       400:
 *         description: Error invalid OTP
 *       500:
 *         description: Server error
 *       200:
 *         description: Verify OTP success
 */
router.post('/verify', verifyOtp)

export default router
