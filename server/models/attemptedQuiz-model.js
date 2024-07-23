const mongoose = require('mongoose');

const attemptedQuizSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  answers: [{ question: mongoose.Schema.Types.ObjectId, selectedAnswer: String }],
  score: { type: Number },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date }
}, { timestamps: true });

const AttemptedQuiz = mongoose.model('AttemptedQuiz', attemptedQuizSchema);

module.exports = AttemptedQuiz;
