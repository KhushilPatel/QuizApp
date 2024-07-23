const AttemptedQuiz = require("../models/attemptedQuiz-model");
const Quiz = require('../models/quiz-model');

exports.submitQuizAttempt = async (req, res) => {
  try {
    const { quizId, userId, answers, score } = req.body;

    const newAttempt = new AttemptedQuiz({
      user: userId,
      quiz: quizId,
      answers,
      score,
      completed: true,
      completedAt: Date.now()
    });

    const savedAttempt = await newAttempt.save();
    res.status(201).json({ message: "Quiz attempt submitted", score, attemptId: savedAttempt._id });
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    res.status(500).json({ message: "Error submitting quiz attempt", error: error.message });
  }
};

exports.getAttemptedQuiz = async (req, res) => {
   
  try {
    const userId = req.params.userId;
    const attempts = await AttemptedQuiz.find({ user: userId }).populate('quiz'); 
    res.status(200).json(attempts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attempted quizzes', error: error.message });
  }
};

exports.getAttemptedQuizById = async (req, res) => {
  try {
    // Find the attempted quiz and populate both the quiz and its question bank
    const attemptedQuiz = await AttemptedQuiz.findById(req.params.id)
      .populate({
        path: 'quiz',
        select: 'quizName questionBank', // Include questionBank in the populated data
        populate: {
          path: 'questionBank',
          select: 'questions' // Adjust this if you want more fields from questionBank
        }
      })
      .populate('user', 'name'); // Populate user details if needed

    if (!attemptedQuiz) {
      return res.status(404).json({ message: 'Attempted quiz not found' });
    }

    // Format the response data
    const formattedResponse = {
      _id: attemptedQuiz._id,
      quiz: {
        _id: attemptedQuiz.quiz._id,
        quizName: attemptedQuiz.quiz.quizName,
        questionBank: attemptedQuiz.quiz.questionBank // Add questionBank details
      },
      user: {
        _id: attemptedQuiz.user._id,
        name: attemptedQuiz.user.name
      },
      score: attemptedQuiz.score,
      completedAt: attemptedQuiz.completedAt,
      answers: attemptedQuiz.answers.map(answer => ({
        question: answer.question,
        options: answer.options,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: answer.correctAnswer
      }))
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error('Error fetching attempted quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

