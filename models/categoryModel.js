import mongoose from 'mongoose'

const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

const CategoryModel = mongoose.model('Category', categorySchema)

export default CategoryModel
