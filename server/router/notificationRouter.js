const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/auth-middleware");

// Admin routes (protected)
router.post(
  "/create",
  authMiddleware,
  notificationController.createNotification
);
router.put(
  "/:id",
  authMiddleware,
  notificationController.updateNotificationStatus
);

// Public routes
router.get("/", notificationController.getNotifications);

module.exports = router;
