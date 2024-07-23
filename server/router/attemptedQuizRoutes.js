const express = require('express');
const router = express.Router();
const attemptedQuizController = require('../controllers/attemptedQuizController');


// Submit a quiz attempt
router.post('/submit', attemptedQuizController.submitQuizAttempt);

// Get an attempted quiz
router.get('/:userId', attemptedQuizController.getAttemptedQuiz);
router.get('/result/:id', attemptedQuizController.getAttemptedQuizById);

module.exports = router;