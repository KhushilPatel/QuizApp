const express = require('express');
const router = express.Router();
const questionBankController = require('../controllers/questionBank-controller');

router.post('/', questionBankController.createQuestionBank);
router.get('/', questionBankController.getAllQuestionBanks);
router.get('/:id', questionBankController.getQuestionBankById);
router.put('/:id', questionBankController.updateQuestionBankById);
router.delete('/:id', questionBankController.deleteQuestionBankById);

module.exports = router;
