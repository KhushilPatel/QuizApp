require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router");
const questionBanksRoute = require("./router/questionBank-router");
const quizRoutes = require("./router/quiz-router");
const studentRoutes = require("./router/student-router");
const attemptedQuizRoutes = require("./router/attemptedQuizRoutes");
const adminRoutes = require("./router/adminRouter");
const generateRoutes = require("./router/generateQb");
const notificationRoutes = require("./router/notificationRouter");
const connectDb = require("./utils/db");
const errormMiddleware = require("./middleware/error-middleware");
const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4001"],
  methods: "GET,POST,PUT,DELETE,UPDATE,HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize database connection
connectDb()
  .then(() => {
    console.log("Database connection established, setting up routes...");

    // Setup routes
    app.use("/api/auth", authRouter);
    app.use("/api/questionBanks", questionBanksRoute);
    app.use("/api/quizzes", quizRoutes);
    app.use("/api/students", studentRoutes);
    app.use("/api/attempted-quizzes", attemptedQuizRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/generateQb", generateRoutes);
    app.use("/api/notifications", notificationRoutes);

    // Error middleware
    app.use(errormMiddleware);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
