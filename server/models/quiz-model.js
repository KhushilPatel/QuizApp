const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  questionBank: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank', required: true },
  quizName: { type: String, required: true },
  duration: { type: Number, required: true },
  score: { type: Number, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
