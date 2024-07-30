const User = require("../models/user-model");


const getAllStudents = async (req, res) => {
    try {
    
        const studentData =await User.find()

     
      return res.status(200).json(studentData );
    } catch (err) {
      console.log(`error from the user route `);
    }
  };


module.exports = { getAllStudents};