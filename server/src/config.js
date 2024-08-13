/* eslint-disable no-undef */
import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000
export const DB_URL = process.env.DB_URL
export const SECRET = process.env.SECRET