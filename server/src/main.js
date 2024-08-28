import dotenv from 'dotenv'

dotenv.config()

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { PORT } from './config.js'
import { authRouter } from './routes/auth/authRoutes.js'
import { dbConnect } from './utils/db.js'

// import { swaggerDocs } from './routes/swagger.js'

const corsOptions = {
  origin : ['http://localhost:5173','http://localhost:4200'],
  credentials: true
}

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors(corsOptions))

app.use('/api/auth', authRouter)

dbConnect().then(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`Server is running on http://localhost:${PORT}`)

    // swaggerDocs(app, PORT)
  })
})
