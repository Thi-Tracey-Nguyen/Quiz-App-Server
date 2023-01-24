import express from 'express'
import cors from 'cors'
import categoryRouter from './routes/category.js'

// const categories = ['Science', 'Movies', 'Geography', 'Music']

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ title: 'Quiz App'}))

// app.get('/categories', async (req, res) => res.send(await CategoryModel.find()))

app.use('/categories', categoryRouter)

export default app
