const User = require("../models/user-model");


const getAllStudents = async (req, res) => {
    try {
    
        const studentData =await User.find()
        // console.log(studentData);
      console.log("studentData",studentData)
     
      return res.status(200).json(studentData );
    } catch (error) {
      console.log(`error from the user route `);
    }
  };


module.exports = { getAllStudents};