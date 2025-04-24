import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  Plus,
  X,
} from "lucide-react";

const NotificationManagement = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = Cookies.get("auth");
    if (!token) {
      setError("Please log in to access this feature");
      router.push("/signIn");
      return;
    }
    fetchNotifications();
  }, [router]);

  const fetchNotifications = async () => {
    try {
      const token = Cookies.get("auth");
      if (!token) {
        setError("Authentication token not found");
        return;
      }

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
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        Cookies.remove("auth");
        router.push("/signIn");
      } else {
        setError("Failed to load notifications");
      }
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("auth");
      if (!token) {
        setError("Authentication token not found");
        return;
      }

      await axios.post(
        "http://localhost:4000/api/notifications/create",
        newNotification,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewNotification({ title: "", message: "", type: "info" });
      setShowForm(false);
      fetchNotifications();
    } catch (err) {
      console.error("Error creating notification:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        Cookies.remove("auth");
        router.push("/signIn");
      } else {
        setError("Failed to create notification");
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const token = Cookies.get("auth");
      if (!token) {
        setError("Authentication token not found");
        return;
      }

      await axios.put(
        `http://localhost:4000/api/notifications/${id}`,
        { isActive: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchNotifications();
    } catch (err) {
      console.error("Error updating notification:", err);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please log in again.");
        Cookies.remove("auth");
        router.push("/signIn");
      } else {
        setError("Failed to update notification status");
      }
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case "warning":
        return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
      case "error":
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Info className="w-6 h-6 text-blue-500" />;
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
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Bell className="w-6 h-6" />
          <h1 className="text-2xl font-semibold">Notification Management</h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Notification
        </button>
      </div>

      {error && <div className="mb-6 text-red-500">{error}</div>}

      {showForm && (
        <div className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={newNotification.title}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    title: e.target.value,
                  })
                }
                placeholder="Notification Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <textarea
                value={newNotification.message}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    message: e.target.value,
                  })
                }
                placeholder="Notification Message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>
            <div>
              <select
                value={newNotification.type}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    type: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No notifications available
          </div>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleToggleStatus(notification._id, notification.isActive)
                  }
                  className={`px-3 py-1 rounded text-sm ${
                    notification.isActive
                      ? "bg-red-100 text-red-600 hover:bg-red-200"
                      : "bg-green-100 text-green-600 hover:bg-green-200"
                  }`}
                >
                  {notification.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationManagement;
