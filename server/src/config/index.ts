import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'

dotenv.config()

export const {
  APP_MODE = 'production',
  CLIENT_URL,
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
  DB_URL = '',
  PORT = 3000,
} = process.env

cloudinary.config({
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  cloud_name: CLOUDINARY_NAME,
})
