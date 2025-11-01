import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'
import Otp from '../models/otpModel.js'
import { OTP_TYPE } from '../constants/otpTypes.js'

export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body

    if (!fullName || !email || !password)
      return res.status(400).json({ message: 'Semua field wajib diisi' })

    const existingUser = await User.findOne({ email })

    if (existingUser) return res.status(400).json({ message: 'Email sudah terdaftar' })

    const otpRecord = await Otp.findOne({ email, type: OTP_TYPE.REGISTER })

    if (!otpRecord || !otpRecord.isVerified) {
      return res.status(400).json({ message: 'Email belum diverifikasi melalui OTP' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({ fullName, email, password: hashedPassword })

    await Otp.deleteOne({ email, type: OTP_TYPE.REGISTER })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    return res.json({ message: 'Registrasi berhasil', token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Registrasi gagal' })
  }
}
