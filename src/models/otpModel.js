import mongoose from 'mongoose'

import { OTP_TYPE } from '../constants/otpTypes.js'

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  type: { type: String, enum: [OTP_TYPE.REGISTER, OTP_TYPE.FORGOT_PASSWORD], required: true },
  expiresAt: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
})

export default mongoose.model('Otp', otpSchema)
