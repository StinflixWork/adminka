import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import helmet from 'helmet'
import compression from 'compression'

import router from './router/index.js'
import { errorMiddleware } from './middlewares/error-middleware.js'

dotenv.config()
const PORT = process.env.DEV_PORT || 5000
const DB_URL = process.env.DB_URL

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}))
app.use(helmet())
app.use(compression())
app.use('/api', router)
app.use(errorMiddleware)

app.all('*', (req, res) => {
	res.status(404).json({ message: 'Not Found' })
})

const start = async () => {
	app.listen(PORT, () => console.log('Server started on port:', PORT))
}

start().then(async () => {
	await mongoose.connect(DB_URL)
}).catch(async (err) => {
	console.error(err)
})
