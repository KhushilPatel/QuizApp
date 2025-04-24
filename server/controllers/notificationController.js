const Notification = require("../models/notification-model");

// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { title, message, type } = req.body;

    const notification = new Notification({
      title,
      message,
      type: type || "info",
    });

    await notification.save();

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({
      success: false,
      message: "Error creating notification",
      error: error.message,
    });
  }
};

// Get all active notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};

// Update notification status (admin only)
exports.updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification status updated successfully",
      notification,
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({
      success: false,
      message: "Error updating notification",
      error: error.message,
    });
  }
};
