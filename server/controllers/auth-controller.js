const User = require("../models/user-model");

const home = async (req, res) => {
  try {
    res
      .status(200)
      .send("Welcome to the Home Page of the Auth API using controller");
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName,lastName, email, password,dateOfBirth,gender } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "email already exists" });
    }

    const userCreated = await User.create({ firstName,lastName, email, password,dateOfBirth,gender });
    res
      .status(201)
      .json({
        msg: "registration Successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    res.status(500).json("Internal Server Error");
    
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({message:"Invalid Credentials"});
    }

    const validPassowrd = await user.comparePassword(password);

    if (validPassowrd) {
      return res
        .status(201)
        .json({
          msg: "registration Successful",
          token: await user.generateToken(),
          userId: user._id.toString(),
        });
    } else {
      return res.status(401).json({message:"Invalid Credentials"});
    }
  } catch (err) {

    res.sendStatus(500);
  }
};

//user Logic

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log("userData", userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route `);
  }
};
const updateUser = async (req, res) => {
  
  try {
    const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({
      msg: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error updating user" });
  }
};

const deleteUser = async (req, res) => {
  console.log("request", req.params.id);
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    console.log("deletedUser",deletedUser)
    if (!deletedUser) {
      return res.status(404).json("user not deleted");
    }
    res.status(200).json({
      msg: "user deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Error deleting user");
  }
};


module.exports = { home, register, login, user ,updateUser,deleteUser};
