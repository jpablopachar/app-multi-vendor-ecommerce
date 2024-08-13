/* eslint-disable no-undef */
import { connect } from 'mongoose'
import { DB_URL } from '../config.js'

export const dbConnect = async () => {
  try {
    await connect(DB_URL)

    console.log('Db connected')
  } catch (error) {

    console.error(error.message)

    process.exit(1)
  }
}