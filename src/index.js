import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import { connectDB } from './config/db.js'
import otpRoutes from './routes/otpRoutes.js'
import userRoutes from './routes/userRoutes.js'
import swaggerSpec from './config/swagger.js'

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/otp', otpRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.send('🚀 GoldBit API running...')
})

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`)
})

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...')
  server.close(() => {
    console.log('✅ Server closed.')
    process.exit(0)
  })
})
