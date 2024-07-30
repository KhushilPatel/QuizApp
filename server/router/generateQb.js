const express = require('express');
const qbController = require('../controllers/generateQbController');

const router = express.Router();

router.post('/generate', qbController.generateQb);


module.exports = router;