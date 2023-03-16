import mongoose from 'mongoose'
import { dbConnect } from '../db.js'

dbConnect(process.env.ATLAS_DB_URL)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
}) 

const User = mongoose.model('User', userSchema) 

export default User