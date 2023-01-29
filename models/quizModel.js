import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quizSchema = new Schema({
    category: {
        type: mongoose.ObjectId,
        ref: 'Category'
    },
    title: {
        type: String,
        required: true,
        unique: true
    }, 
    author: {
        type: String,
        required: true
    },
    questions: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

const QuizModel = mongoose.model('Quiz', quizSchema)

export default QuizModel
