import mongoose from 'mongoose'

const Schema = mongoose.Schema

const questionSchema = new Schema({
    quizId: {
        type: ObjectID,
        ref: 'Quiz'
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
})

const QuestionModel = mongoose.model('Question', questionSchema)

export default QuestionModel
