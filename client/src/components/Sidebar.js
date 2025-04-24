import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";
import React from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaUsers,
  FaChartBar,
  FaBell,
} from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const { user } = useUser();
  const isAdminView = router.pathname.startsWith("/admin");

  const isActive = (route) => {
    return router.pathname === route
      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
      : "hover:bg-gray-50";
  };

  const getRoute = (adminRoute, userRoute) => {
    return isAdminView ? adminRoute : userRoute;
  };

  const menuItems = [
    {
      icon: <FaTachometerAlt className="w-5 h-5" />,
      label: "Dashboard",
      adminRoute: "/admin/dashboard",
      userRoute: "/user/dashboard",
    },
    {
      icon: <FaBook className="w-5 h-5" />,
      label: "Quizzes",
      adminRoute: "/admin/quizzes",
      userRoute: "/user/quiz",
    },
    {
      icon: <FaChartBar className="w-5 h-5" />,
      label: "Results",
      adminRoute: "/admin/results",
      userRoute: "/user/results",
    },
    {
      icon: <FaBell className="w-5 h-5" />,
      label: "Notifications",
      adminRoute: "/admin/notifications",
      userRoute: "/user/notification",
    },
  ];

  const adminOnlyItems = [
    {
      icon: <FaClipboardList className="w-5 h-5" />,
      label: "Question Bank",
      route: "/admin/question-bank",
    },
    {
      icon: <FaUsers className="w-5 h-5" />,
      label: "Students",
      route: "/admin/students",
    },
  ];

  return (
    <div className="h-full py-6">
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold text-gray-800">
          {isAdminView ? "Admin Panel" : "Student Portal"}
        </h2>
      </div>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <button
              className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${isActive(
                getRoute(item.adminRoute, item.userRoute)
              )}`}
              onClick={() =>
                router.push(getRoute(item.adminRoute, item.userRoute))
              }
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}

        {user?.isAdmin && isAdminView && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Admin Tools
            </h3>
            <ul className="mt-2 space-y-2">
              {adminOnlyItems.map((item) => (
                <li key={item.label}>
                  <button
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 ${isActive(
                      item.route
                    )}`}
                    onClick={() => router.push(item.route)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
