const User = require("../models/user-model");
const AttemptedQuiz = require("../models/attemptedQuiz-model");
const Quiz = require("../models/quiz-model");

exports.getAllClientData = async (req, res) => {
  console.log("=== Starting getAllClientData ===");
  try {
    // Fetch all non-admin users
    console.log("Attempting to find non-admin users...");
    const clients = await User.find({ isAdmin: false });
    console.log(`Found ${clients.length} non-admin users`);
    console.log("Non-admin users:", JSON.stringify(clients, null, 2));

    if (clients.length === 0) {
      console.log("No non-admin users found in the database");
      return res.json([]);
    }

    // Fetch attempted quizzes for all clients
    console.log("Starting to fetch attempted quizzes for each client...");
    const clientData = await Promise.all(
      clients.map(async (client) => {
        try {
          console.log(`\nProcessing client: ${client.email} (${client._id})`);

          console.log("Fetching attempted quizzes...");
          const attemptedQuizzes = await AttemptedQuiz.find({
            user: client._id,
          })
            .populate("quiz", "quizName")
            .select("quiz score completed completedAt answers");

          console.log(
            `Found ${attemptedQuizzes.length} attempted quizzes for ${client.email}`
          );
          console.log(
            `Attempted quizzes for ${client.email}:`,
            JSON.stringify(attemptedQuizzes, null, 2)
          );

          const formattedQuizzes = attemptedQuizzes.map((aq) => {
            console.log(
              `Processing quiz attempt:`,
              JSON.stringify(aq, null, 2)
            );
            return {
              quizId: aq.quiz?._id,
              quizName: aq.quiz?.quizName,
              score: aq.score,
              totalQuestions: aq?.answers?.length || 0,
              completed: aq.completed,
              completedAt: aq.completedAt,
            };
          });

          console.log(
            `Formatted quizzes for ${client.email}:`,
            JSON.stringify(formattedQuizzes, null, 2)
          );

          const clientResult = {
            userId: client._id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            dateOfBirth: client.dateOfBirth,
            gender: client.gender,
            active: client.active,
            attemptedQuizzes: formattedQuizzes,
          };

          console.log(
            `Final client result for ${client.email}:`,
            JSON.stringify(clientResult, null, 2)
          );
          return clientResult;
        } catch (error) {
          console.error(`Error processing client ${client.email}:`, error);
          return {
            userId: client._id,
            firstName: client.firstName,
            lastName: client.lastName,
            email: client.email,
            dateOfBirth: client.dateOfBirth,
            gender: client.gender,
            active: client.active,
            attemptedQuizzes: [],
            error: error.message,
          };
        }
      })
    );

    console.log("\n=== Final Results ===");
    console.log("Number of clients processed:", clientData.length);
    console.log("Final clientData:", JSON.stringify(clientData, null, 2));
    res.json(clientData);
  } catch (error) {
    console.error("Error in getAllClientData:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
