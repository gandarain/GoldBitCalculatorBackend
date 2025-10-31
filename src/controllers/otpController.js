import Otp from '../models/otpModel.js'
import { sendMail } from '../utils/mailer.js'

export const requestOtp = async (req, res) => {
  try {
    const { email } = req.body
    
    if (!email) return res.status(400).json({ message: 'Email wajib diisi' })

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    await Otp.deleteMany({ email })

    await Otp.create({ email, otp, expiresAt })

    await sendMail(email, 'Kode OTP GoldBit Calculator', `Kode OTP kamu: ${otp}`)

    return res.json({ message: 'OTP telah dikirim ke email' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal mengirim OTP' })
  }
}

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body
    const record = await Otp.findOne({ email, otp })

    if (!record) return res.status(400).json({ message: 'OTP salah' })
    if (record.expiresAt < new Date()) return res.status(400).json({ message: 'OTP kadaluarsa' })

    await Otp.deleteMany({ email })
    return res.json({ message: 'OTP valid, silakan lanjut register' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Gagal memverifikasi OTP' })
  }
}
