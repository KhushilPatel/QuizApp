require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router"); 
const questionBanksRoute=require("./router/questionBank-router")
const quizRoutes = require('./router/quiz-router');
const studentRoutes = require('./router/student-router');
const attemptedQuizRoutes = require('./router/attemptedQuizRoutes');
const adminRoutes = require('./router/adminRouter');
const connectDb=require("./utils/db");
const errormMiddleware = require("./middleware/error-middleware");
const cors=require('cors');


const corsOptions={
    origin:"http://localhost:4001",
    methods:"GET,POST,PUT,DELETE,UPDATE,HEAD",
    credentials:true
  }
  app.use(cors(corsOptions))

  app.use(express.json());
  app.use("/api/auth", authRouter);
  app.use("/api/questionBanks", questionBanksRoute);
  app.use('/api/quizzes', quizRoutes);
  app.use('/api/students', studentRoutes);
  app.use('/api/attempted-quizzes', attemptedQuizRoutes);
  app.use('/api/admin', adminRoutes);

  app.use(errormMiddleware)
  
  connectDb().then(()=>{
    app.listen(4000, () => {
      console.log("Server is running on port: 4000");
    }); 
  }).catch((error)=>{
    console.log(error) 
  })
  
  