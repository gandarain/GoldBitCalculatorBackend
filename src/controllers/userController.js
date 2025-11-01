import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'
import Otp from '../models/otpModel.js'
import { OTP_TYPE } from '../constants/otpTypes.js'

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password)
      return res.status(400).json({ message: 'All fields are required' })

    const existingUser = await User.findOne({ email })

    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' })

    const otpRecord = await Otp.findOne({ email, type: OTP_TYPE.REGISTER })

    if (!otpRecord || !otpRecord.isVerified)
      return res.status(400).json({ message: 'Email not verified by OTP yet' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ fullName, email, password: hashedPassword })

    await Otp.deleteOne({ email, type: OTP_TYPE.REGISTER })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({ message: 'Registration successful', token })
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' })

    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: 'User not found' })

    const otpRecord = await Otp.findOne({ email, type: OTP_TYPE.FORGOT_PASSWORD })

    if (!otpRecord || !otpRecord.isVerified)
      return res.status(400).json({ message: 'OTP not yet verified or expired' })

    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword

    await user.save()
    await Otp.deleteOne({ _id: otpRecord._id })

    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' })

    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: 'User not found' })

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch)
      return res.status(400).json({ message: 'Invalid email or password' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Login failed', error: error.message })
  }
}
