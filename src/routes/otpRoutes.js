import express from 'express'
import { requestOtp, verifyOtp } from '../controllers/otpController.js'

const router = express.Router()

router.post('/request', requestOtp)
router.post('/verify', verifyOtp)

export default router
