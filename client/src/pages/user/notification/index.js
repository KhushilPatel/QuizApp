import React, { useState, useEffect } from "react";
import axios from "axios";
import UserRoute from "@/components/User/UserRoute";
import UserLayout from "@/components/User/UserLayout";
import {
  FaBell,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";
import Cookies from "js-cookie";

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = Cookies.get("auth");
        const response = await axios.get(
          "http://localhost:4000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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
    const interval = setInterval(fetchNotifications, 300000);
    return () => clearInterval(interval);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="w-6 h-6 text-green-500" />;
      case "warning":
        return <FaExclamationTriangle className="w-6 h-6 text-yellow-500" />;
      case "error":
        return <FaTimesCircle className="w-6 h-6 text-red-500" />;
      default:
        return <FaInfoCircle className="w-6 h-6 text-blue-500" />;
    }
  };

  const getNotificationStyle = (type) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-blue-200 bg-blue-50";
    }
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-500 bg-red-50 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <div className="w-full max-w-4xl py-6 overflow-hidden">
      <div className="flex items-center mb-6">
        <FaBell className="w-6 h-6 text-primary mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-8">
          <FaBell className="w-12 h-12 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No notifications available</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications
            .filter((n) => n.isActive)
            .map((notification) => (
              <div
                key={notification._id}
                className={`flex items-start p-4 rounded-lg border ${getNotificationStyle(
                  notification.type
                )} transition-all duration-200 hover:shadow-md`}
              >
                <div className="flex-shrink-0 mr-4">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {notification.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserNotifications;
