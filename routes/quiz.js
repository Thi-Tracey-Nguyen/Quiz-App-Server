import express from 'express'
import mongoose from 'mongoose'
import QuizModel from "../models/quizModel.js"
import CategoryModel from "../models/categoryModel.js"

const router = express.Router();


router.get("/", async (req, res) => res.send(await QuizModel.find()))

// route to get a quiz by id
router.get("/:id", async (req, res) => {

  //checks of provided id is a mongoose's valid ObjectId (a string of 12 bytes)
  if (mongoose.isValidObjectId(req.params.id)) {
    try {
      const quiz = await QuizModel.findById(req.params.id)
      if (quiz) {
        res.send(quiz)
      } else {
        res.status(404).send({ error: "Quiz not found!" }) // catch error when Id is valid but does not exist in db
      }
    } catch (err) {
      res.status(500).send({ error: err.message })
    }
  } else {
    res.status(500).send({ error: 'Id is invalid' })
  }
})

// route to post new quiz
router.post("/", async (req, res) => {
  try {
    // 1. extract information from the user's input
    const { category, title, author, image } = req.body

    // 2. Create a new quiz object
    // 2.1 Check if the category exists
    const categoryObject = await CategoryModel.findOne({ name: category })
    if (categoryObject) {
      const newQuiz = { 
        category: categoryObject._id, 
        title, 
        author, 
        image: './assets/icon.png' }

      // 2.2. Create a new quiz using newQuiz (sanitised values) 
      const insertedQuiz = await QuizModel.create(newQuiz)

      // 2.3. Send back the new quiz with 201 status
      // res.status(201).send(await insertedQuiz.populate({ path: 'category', select: 'name' }))
      res.status(201).send(insertedQuiz)
    } else {
      res.status(404).send({ error: 'Category not found' })
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const quiz = await QuizModel.findByIdAndDelete(req.params.id);
    if (quiz) {
      res.sendStatus(204)
    } else {
      res.status(404).send({ error: 'Quiz noy found' });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
})

// edit a quiz
router.put("/:id", async (req, res) => {
  try {
    // 1. extract information from the user's input
    const { category, title, author, image } = req.body

    // 2. Create a new quiz object
    // 2.1 Get the quiz from id
    const oldQuiz = await QuizModel.findById(req.params.id)

    // 2.2 if the category is provided, check if it exists
    if (category) {
      const categoryObject = await CategoryModel.findOne({ name: category })
      if (! categoryObject) {
        res.status(404).send({ error: 'Category not found' })
      } 
    // 2.3 if category is not provided, use existing category info
    } else {
      const newQuiz = { 
        category: oldQuiz.category, 
        title: title || oldQuiz.title, 
        author: author || oldQuiz.author, 
        image: image || oldQuiz.image
      }

      // 2.2. Edit the existing wuiz with info from newQuiz 
      const quiz = await QuizModel.findByIdAndUpdate(req.params.id, newQuiz, { returnDocument: 'after' })

      // 2.3. Send back the updated quiz
      if (quiz) {
        res.send(quiz)
      } else {
        res.status(404).send({ error: 'Quiz not found' })
      }
    } 
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// router.patch("/:id", async (req, res) => {
//   try {
//     const quiz = await QuizModel.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!quiz) {
//       res.status(404).send({ error: "Quiz not found!" });
//     } else {
//       res.send(quiz);
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

export default router
