import express from 'express'
import cors from 'cors'
import categoryRouter from './routes/category.js'
import quizRouter from './routes/quiz.js'

// const categories = ['Science', 'Movies', 'Geography', 'Music']

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ title: 'Quiz App'}))

// app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))


app.use('/categories', categoryRouter)


app.use('/quizzes', quizRouter)



export default app
