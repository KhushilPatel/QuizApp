const AttemptedQuiz = require("../models/attemptedQuiz-model");

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
