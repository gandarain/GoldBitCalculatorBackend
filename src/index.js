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

app.get('/', (req, res) => res.send('GoldBit API running...'))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
