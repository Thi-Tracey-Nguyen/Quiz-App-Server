import express from 'express'
import CategoryModel from '../models/categoryModel.js'
import QuizModel from '../models/quizModel.js'

const router = express.Router()

router.get('/', async (req, res) => res.send(await CategoryModel.find()))

router.get('/:id', async (req, res) => {
  try {
    const cat = await CategoryModel.findById(req.params.id)
    if (cat) {
      res.send(cat)
    } else {
      res.status(404).send({ error: 'Category not found!' })
    }
  } 
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const newCategory = new CategoryModel(req.body)
    await newCategory.save()
    res.status(201).send(newCategory)
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({ error: 'Sorry! Category already exists!' })
    } else {
     res.status(500).send({ error: err.message })
    }
  } 
})

router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id)
    if (deletedCategory) {
      res.sendStatus(204)
    } else {
      res.status(404).send({ error: 'Category not found!' })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.put('/:id', async (req, res) => {
  const { name, image } = req.body
  const newCategory = { name, image }


  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(req.params.id, newCategory, { returnDocument: 'after' })
    if (updatedCategory) {
      res.send(updatedCategory)
    } else {
      res.status(404).send({ error: 'Category not found!' })
    }
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

export default router