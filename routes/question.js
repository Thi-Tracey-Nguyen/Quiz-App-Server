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

router.post("/", async (req, res) => {
  try {
    const newQuestion = new QuestionModel(req.body);
    const savedQuestion = await newQuestion.save();
    res.send(savedQuestion);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).send({ error: "Sorry! Question already exists!" });
    }
    res.status(500).send({ error: err.message });
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
