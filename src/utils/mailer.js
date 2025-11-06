import axios from 'axios'

export const sendMail = async (to, subject, text) => {
  try {
    const data = {
      sender: {
        name: 'GoldBit Calculator',
        email: 'goldbitcalculator@gmail.com',
      },
      to: [{ email: to }],
      subject,
      textContent: text,
    }

    const headers = {
      'api-key': process.env.BREVO_API_KEY,
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }

    const response = await axios.post(process.env.BREVO_API_URL, data, { headers })

    console.log('✅ Email sent via Brevo:', response.data)
  } catch (error) {
    console.error('❌ Failed to send email via Brevo:', error.response?.data || error.message)
    throw new Error('Failed to send OTP email')
  }
}
