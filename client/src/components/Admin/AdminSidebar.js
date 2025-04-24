import { useRouter } from "next/router";
import React from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaBell,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";

const AdminSidebar = ({ isCollapsed }) => {
  const router = useRouter();

  const isActive = (route) => {
    return router.pathname === route
      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
      : "hover:bg-gray-50";
  };

  const menuItems = [
    {
      icon: <FaTachometerAlt className="w-5 h-5" />,
      label: "Dashboard",
      route: "/admin/dashboard",
      section: "Overview",
    },
    {
      icon: <FaBook className="w-5 h-5" />,
      label: "Quizzes",
      route: "/admin/quizzes",
      section: "Content Management",
    },
    {
      icon: <FaClipboardList className="w-5 h-5" />,
      label: "Question Bank",
      route: "/admin/question-bank",
      section: "Content Management",
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      label: "Students",
      route: "/admin/students",
      section: "User Management",
    },
    {
      icon: <FaChartBar className="w-5 h-5" />,
      label: "Results",
      route: "/admin/results",
      section: "Analytics",
    },
    {
      icon: <FaBell className="w-5 h-5" />,
      label: "Notifications",
      route: "/admin/notifications",
      section: "Communication",
    },
    {
      icon: <FaCog className="w-5 h-5" />,
      label: "Settings",
      route: "/admin/settings",
      section: "System",
    },
    {
      icon: <FaQuestionCircle className="w-5 h-5" />,
      label: "Help & Support",
      route: "/admin/support",
      section: "System",
    },
  ];

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {});

  return (
    <div className="h-full py-6">
      {!isCollapsed && (
        <div className="px-4 mb-6">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section}>
            {!isCollapsed && (
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {section}
              </h3>
            )}
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.label}>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${isActive(
                      item.route
                    )}`}
                    onClick={() => router.push(item.route)}
                    title={isCollapsed ? item.label : ""}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {!isCollapsed && item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
