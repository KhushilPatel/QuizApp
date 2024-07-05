const QuestionBank = require("../models/Questionbank-model");


const createQuestionBank = async (req, res) => {
  try {
    const questionBank = new QuestionBank(req.body);
  
    await questionBank.save();
    res.status(201).json({
      msg: "Question bank created successfully",
      questionBankId: questionBank._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error creating question bank");
  }
};

const getAllQuestionBanks = async (req, res) => {
  try {
    const questionBanks = await QuestionBank.find();
    res.status(200).json(questionBanks);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving question banks");
  }
};

const getQuestionBankById = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findById(req.params.id);
    if (!questionBank) {
      return res.status(404).json("Question bank not found");
    }
    res.status(200).json(questionBank);
  } catch (error) {
    console.log(error);
    res.status(500).json("Error retrieving question bank");
  }
};

const updateQuestionBankById = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!questionBank) {
      return res.status(404).json("Question bank not found");
    }
    res.status(200).json({
      msg: "Question bank updated successfully",
      questionBank,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Error updating question bank");
  }
};

const deleteQuestionBankById = async (req, res) => {
  try {
    const questionBank = await QuestionBank.findByIdAndDelete(req.params.id);
    if (!questionBank) {
      return res.status(404).json("Question bank not found");
    }
    res.status(200).json({
      msg: "Question bank deleted successfully",
      questionBankId: questionBank._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error deleting question bank");
  }
};

module.exports = {
  createQuestionBank,
  getAllQuestionBanks,
  getQuestionBankById,
  updateQuestionBankById,
  deleteQuestionBankById,
};
