const mongoose = require("mongoose");
// const URI="mongodb://localhost:27017";
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(URI);
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDb;
