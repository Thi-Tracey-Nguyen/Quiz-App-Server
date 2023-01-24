import mongoose from 'mongoose'

const Schema = mongoose.Schema

const questionSchema = new Schema({
    quizId: {
        type: mongoose.ObjectId,
        ref: 'Quiz'
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
    },
    incorrectAnswers: {
        type: Array,
        required: true
    }
})

const QuestionModel = mongoose.model('Question', questionSchema)

export default QuestionModel
