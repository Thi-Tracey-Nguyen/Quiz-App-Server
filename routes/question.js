import express from "express";
import QuestionModel from "../models/questionModel.js";
import QuizModel from "../models/quizModel.js";

const router = express.Router();

router.get("/", async (req, res) => res.send(await QuestionModel.find()));

router.get("/:id", async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question) {      
      res.send(question);
    } else {
      res.status(404).send({ error: "Question not found!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// route to post new questions
router.post("/", async (req, res) => {
  try {
    //1. Extract question's info from the user input
    const { quizId, question, correctAnswer, incorrectAnswers} = req.body

    //2. Create new question object
    //2.1. Check if quiz exists
    const quiz = await QuizModel.findById(quizId)
    if (quiz) {
      //2.2. create a new question object
      const newQuestion = { quizId, question, correctAnswer, incorrectAnswers }
      const insertedQuestion = await QuestionModel.create(newQuestion)

      //2.3. add the question id into the correct quiz
      quiz.questions.push(insertedQuestion._id)
      await quiz.save()
      res.status(201).send(insertedQuestion)
    } else {
      res.status(404).send({ error: 'Quiz not found' })
    }
  } catch (err) {
    // if (err.code === 11000) {
    //   res.status(409).send({ error: "Question already exists!" })
    // }
    res.status(500).send({ error: err.message })
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const question = await QuestionModel.findByIdAndDelete(req.params.id);
    if (question) {
      res.send(question);
    } else {
      res.status(404).send({ error: "Question not found!" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const question = await QuestionModel.findById(req.params.id);
    if (question) {
      Object.keys(req.body).forEach((key) => {
        question[key] = req.body[key];
      });
      await question.save();
      res.send(question);
    } else {
      res.status(404).send({ error: "Question not found!" });
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
