import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quizSchema = new Schema({
    category: {
        type: mongoose.ObjectId,
        ref: 'Category'
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
