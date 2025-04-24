import React, { useState, useEffect } from "react";
import axios from "axios";
import { X, CheckCircle2, Bell } from "lucide-react";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/notifications"
        );
        setNotifications(response.data.notifications);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
    // Refresh notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 300000);
    return () => clearInterval(interval);
  }, []);

  const getNotificationColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const handleDismiss = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/notifications/${id}`);
      setNotifications(notifications.filter((notif) => notif._id !== id));
    } catch (err) {
      console.error("Error dismissing notification:", err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.put("http://localhost:4000/api/notifications/mark-all-read");
      setNotifications([]);
    } catch (err) {
      console.error("Error marking notifications as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <div className="p-4 text-red-500 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell className="w-6 h-6 text-gray-700 mr-2" />
            <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <CheckCircle2 className="w-12 h-12 mb-4 text-gray-400" />
            <p className="text-lg font-medium">No new notifications</p>
            <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`border rounded-lg p-4 ${getNotificationColor(
                  notification.type
                )} transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base">
                      {notification.title}
                    </h3>
                    <p className="text-sm mt-1">{notification.message}</p>
                    <p className="text-xs mt-2 text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDismiss(notification._id)}
                    className="ml-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
