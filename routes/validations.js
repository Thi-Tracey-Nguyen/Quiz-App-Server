import express from 'express'
import { body, validationResult } from 'express-validator'

export default function QuestionValidation() {
  return [
    body('question')
      .exists()
      .withMessage('Please provide a question')
      .isLength({ min: 4 })
      .withMessage('Question too short'),
    body('correctAnswer')
      .exists()
      .withMessage('Please provide a correct answer'),
    body('incorrectAnswers')
      .exists()
      .withMessage('Please provide 3 incorrect answers')
  ]
}