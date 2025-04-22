import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaBell, FaExchangeAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { user } = useUser();
  const userName = user?.firstName + " " + user?.lastName;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const [isAdminView, setIsAdminView] = useState(
    router.pathname.startsWith("/admin")
  );

  const sidebarRoutes = {
    "/admin/dashboard": "Dashboard",
    "/admin/quizzes": "Quizzes",
    "/admin/students": "Students",
    "/admin/results": "Results",
    "/admin/question-bank": "Question Bank",
    "/user/dashboard": "User Dashboard",
    "/user/quiz": "Quizzes",
    "/user/results": "Results",
  };

  const activeRouteName = sidebarRoutes[router.pathname];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("auth", { path: "/" });
    window.location.href = "/signIn";
  };

  const switchDashboard = () => {
    if (isAdminView) {
      router.push("/user/dashboard");
      setIsAdminView(false);
    } else {
      router.push("/admin/dashboard");
      setIsAdminView(true);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <img
              src="/images/logo1.png"
              alt="Main Logo"
              className="h-8 w-auto"
            />
            {activeRouteName && (
              <span className="ml-4 text-lg font-semibold text-gray-900">
                {activeRouteName}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user?.isAdmin && (
              <button
                onClick={switchDashboard}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <FaExchangeAlt className="mr-2" />
                Switch to {isAdminView ? "User" : "Admin"} Dashboard
              </button>
            )}

            <button
              onClick={() =>
                router.push(user?.isAdmin ? "/admin/quizzes" : "/user/quiz")
              }
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
            >
              <img
                src="/images/newquiz.png"
                alt="Quizzes Icon"
                className="h-5 w-5 mr-2"
              />
              {user?.isAdmin ? "New Quizzes" : "Join Quizzes"}
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full">
              <IoIosMail className="h-5 w-5" />
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full">
              <FaBell className="h-5 w-5" />
            </button>

            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <span className="mr-2">{userName}</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://ui-avatars.com/api/?name=John+Doe"
                  alt=""
                />
              </button>

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
