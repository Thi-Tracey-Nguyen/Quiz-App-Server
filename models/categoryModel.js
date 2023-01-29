import mongoose from 'mongoose'
import { dbConnect } from '../db.js'

dbConnect()
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: false
    }
})

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
