import express from 'express'
import CategoryModel from '../models/categoryModel.js'

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

export default router