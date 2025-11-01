import nodemailer from 'nodemailer'

import Otp from '../models/otpModel.js'
import User from '../models/userModel.js'
import { OTP_TYPE } from '../constants/otpTypes.js'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const requestOtp = async (req, res) => {
  try {
    const { email, type } = req.body

    if (![OTP_TYPE.REGISTER, OTP_TYPE.FORGOT_PASSWORD].includes(type))
      return res.status(400).json({ message: 'Invalid OTP type' })

    const user = await User.findOne({ email })

    if (type === OTP_TYPE.REGISTER && user)
      return res.status(400).json({ message: 'User already exists' })

    if (type === OTP_TYPE.FORGOT_PASSWORD && !user)
      return res.status(400).json({ message: 'Email not registered' })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await Otp.findOneAndUpdate(
      { email, type },
      { otp, expiresAt, isVerified: false },
      { upsert: true }
    )

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your GoldBit OTP Code',
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    })

    res.json({ message: 'OTP sent successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message })
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, type } = req.body
    const record = await Otp.findOne({ email, type })

    if (!record) return res.status(400).json({ message: 'OTP not found' })
    if (record.expiresAt < new Date()) return res.status(400).json({ message: 'OTP expired' })
    if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' })

    record.isVerified = true
    await record.save()

    res.json({ message: 'OTP verified successfully' })
  } catch (error) {
    res.status(500).json({ message: 'OTP verification failed', error: error.message })
  }
}
