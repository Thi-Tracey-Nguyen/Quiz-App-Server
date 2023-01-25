import express from 'express'
import CategoryModel from '../models/categoryModel.js'
import QuizModel from '../models/quizModel.js'

const router = express.Router()

router.get('/', async (req, res) => res.send(await CategoryModel.find()))

router.get('/:id', async (req, res) => {
  try {
    const cat = await CategoryModel.findById(req.params.id)
    if (cat) {
      // res.send(cat)
      const quizzes = await QuizModel.find({ category: req.params.id })
      res.send(quizzes)
    } else {
      res.status(404).send({ error: 'Category not found!' })
    }
  } 
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router