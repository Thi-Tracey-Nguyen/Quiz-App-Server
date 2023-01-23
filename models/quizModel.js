import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quizSchema = new Schema({
    category: {
        type: mongoose.ObjectID,
        ref: 'Category'
    },
    question: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }, 
    correctAnswer: {
        type: String,
        required: true
    }
})

const QuizModel = mongoose.model('Quiz', quizSchema)

export default QuizModel
