import express from 'express'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import { connectDB } from './config/db.js'
import otpRoutes from './routes/otpRoutes.js'
import userRoutes from './routes/userRoutes.js'
import swaggerSpec from './config/swagger.js'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('✅ GoldBit API running...')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/otp', otpRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 8080

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err)
  process.exit(1)
})
