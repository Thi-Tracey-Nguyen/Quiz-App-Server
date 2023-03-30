import mongoose from 'mongoose'
import express from 'express'
import Quiz from "../models/quizModel.js"
import Question from "../models/questionModel.js"
import Category from "../models/categoryModel.js"

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find()
    const categories = await Category.find()
    const questions = await Question.find()
    const data = {
      quizzes,
      categories, 
      questions
    }
    res.send(data)
  }
  catch(err) {
    res.status(500).send(err.message)
  }
})

export default router