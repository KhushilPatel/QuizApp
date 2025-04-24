// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const User = require("../models/user-model");

router.get("/all-client-data", adminController.getAllClientData);

// Debug route to check all users
router.get("/debug/users", async (req, res) => {
  try {
    const users = await User.find({}).select(
      "firstName lastName email isAdmin active"
    );
    console.log("All users in database:", JSON.stringify(users, null, 2));

    const nonAdminUsers = users.filter((user) => !user.isAdmin);
    console.log("Non-admin users:", JSON.stringify(nonAdminUsers, null, 2));

    res.json({
      totalUsers: users.length,
      nonAdminUsers: nonAdminUsers.length,
      users: users,
    });
  } catch (error) {
    console.error("Error in debug route:", error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
