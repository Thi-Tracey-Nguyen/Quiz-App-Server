import express from "express";
import QuizModel from "../models/quizModel.js";

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

router.post("/", async (req, res) => {
  try {
    const quiz = new QuizModel(req.body);
    const newQuiz = await quiz.save();
    res.send(newQuiz);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({ error: "Sorry! Quiz already exists!" });
    }
    res.status(500).send({ error: err.message });
  }
});

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
