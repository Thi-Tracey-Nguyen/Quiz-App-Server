import express from 'express'
import QuizModel from '../models/quizModel.js'

const router = express.Router()

router.get('/', async (req, res) => res.send(await QuizModel.find()))

router.get('/:id', async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id)
    if (quiz) {
      res.send(quiz)
    } else {
      res.status(404).send({ error: 'Quiz not found!' })
    }
  } 
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router