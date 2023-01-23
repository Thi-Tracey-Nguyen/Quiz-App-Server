import express from 'express'
import cors from 'cors'

const categories = ['Science', 'Movies', 'Geography', 'Music']

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => res.send({ title: 'Quiz App'}))

app.get('/categories', (req, res) => res.send(categories))

export default app
