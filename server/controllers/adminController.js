// controllers/adminController.js
const User = require('../models/user-model');
const AttemptedQuiz = require('../models/attemptedQuiz-model');
const Quiz = require('../models/quiz-model'); // Make sure to import the Quiz model

exports.getAllClientData = async (req, res) => {
  console.log("getAllClientData called");
  try {
    // Fetch all non-admin users
    const clients = await User.find({ isAdmin: false });
    console.log(`Found ${clients.length} non-admin users`);

    // Fetch attempted quizzes for all clients
    const clientData = await Promise.all(clients.map(async (client) => {
      const attemptedQuizzes = await AttemptedQuiz.find({ user: client._id })
        .populate('quiz', 'quizName') // Change 'title' to 'quizName'
        .select('quiz score completed completedAt');
      
      console.log(`User ${client.email} attempted quizzes:`, attemptedQuizzes);

      return {
        userId: client._id,
        firstName: client.firstName,
        lastName: client.lastName,
        email: client.email,
        dateOfBirth: client.dateOfBirth,
        gender: client.gender,
        active: client.active,
        attemptedQuizzes: attemptedQuizzes.map(aq => ({
          quizId: aq.quiz?._id,
          quizName: aq.quiz?.quizName, // Change 'quizTitle' to 'quizName'
          score: aq.score,
          completed: aq.completed,
          completedAt: aq.completedAt
        }))
      };
    }));

    console.log('Final clientData:', clientData);
    res.json(clientData);
  } catch (error) {
    console.error('Error fetching client data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};