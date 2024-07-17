const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  questionBank: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
  quizName: { type: String, required: true },
  score: { type: String, required: true },
  description: { type: String, required: false },
  createdAt: { type: String },
  state: { type: String, default: 'Draft' },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
