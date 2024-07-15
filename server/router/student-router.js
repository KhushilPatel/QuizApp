const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student-controller');
const authMiddleware = require('../middleware/auth-middleware');


router.get('/', studentController.getAllStudents);


module.exports = router;
