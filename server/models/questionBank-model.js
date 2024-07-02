const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }],
});

const questionBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  time:String,
  questions: [questionSchema],
});

const questionBankModel = mongoose.model('QuestionBank', questionBankSchema);

module.exports = questionBankModel;
