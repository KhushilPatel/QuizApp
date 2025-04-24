import React from "react";
import AdminRoute from "../../../components/Admin/AdminRoute";
import AdminLayout from "../../../components/Admin/AdminLayout";
import NotificationManagement from "../../../components/Admin/Notifications/NotificationManagement";

const NotificationsPage = () => {
  return (
    <AdminRoute>
      <NotificationManagement />
    </AdminRoute>
  );
};

export default NotificationsPage;
