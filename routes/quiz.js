import express from "express"
import QuizModel from "../models/quizModel.js"
import CategoryModel from "../models/categoryModel.js"

const router = express.Router();

router.get("/", async (req, res) => res.send(await QuizModel.find()));

router.get("/:id", async (req, res) => {
  try {
    const quiz = await QuizModel.findById(req.params.id);
    if (quiz) {
      res.send(quiz);
    } else {
      res.status(404).send({ error: "Quiz not found!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// route to post new quiz
router.post("/", async (req, res) => {
  try {
    // 1. extract information from the user's input
    const { category, title, author, image } = req.body

    // 2. Create a new quiz object
    // 2.1 Check if the category exists
    const categoryObject = await CategoryModel.findOne({ _id: category })
    if (categoryObject) {
      const newQuiz = { category, title, author, image }

      // 2.2. Create a new quiz using newQuiz (sanitised values) 
      const insertedQuiz = await QuizModel.create(newQuiz)

      // 2.3. Send back the new quiz with 201 status
      // res.status(201).send(await insertedQuiz.populate({ path: 'category', select: 'name' }))
      res.status(201).send(insertedQuiz)
    } else {
      res.status(404).send({ error: 'Category not found'})
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const quiz = await QuizModel.findByIdAndDelete(req.params.id);
    if (!quiz) {
      res.status(404).send({ error: "Quiz not found!" });
    } else {
      res.send(quiz);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const quiz = await QuizModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) {
      res.status(404).send({ error: "Quiz not found!" });
    } else {
      res.send(quiz);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

export default router;
