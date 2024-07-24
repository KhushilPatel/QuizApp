// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/all-client-data', adminController.getAllClientData);

module.exports = router;