const Quiz = require('../models/quiz-model');


exports.createQuiz = async (req, res) => {
  const { questionBank, quizName, score, description,createdAt } = req.body;
  console.log("create",req.body)
  try {
    const newQuiz = new Quiz({
      questionBank,
      quizName,
      score,
      description,
      createdAt
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('questionBank');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id).populate('questionBank');
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { questionBank, quizName, score, description,state } = req.body;
  console.log("update",req.body)
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      {  questionBank, quizName, score, description,state },
      { new: true, runValidators: true }
    );

    if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) return res.status(404).json({ message: 'Quiz not found' });

    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
