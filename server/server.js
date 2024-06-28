require("dotenv").config();
const express = require("express");
const app = express();
const authRouter = require("./router/auth-router"); 

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
  //This line enables the Express.js JSON middleware, which parses incoming request bodies as JSON. This means that you can access the data in the body of a POST request using req.body in your route handlers.
  app.use("/api/auth", authRouter);

  app.use(errormMiddleware)
  
  connectDb().then(()=>{
    app.listen(4000, () => {
      console.log("Server is running on port: 4000");
    }); 
  }).catch((error)=>{
    console.log(error) 
  })
  
  