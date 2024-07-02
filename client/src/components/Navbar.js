// components/Navbar.js

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const userName = "KhushilPatel";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const sidebarRoutes = {
    "/admin/dashboard": "Dashboard",
    "/admin/quizzes": "Quizzes",
    "/admin/students": "Students",
    "/admin/results": "Results",
    "/admin/question-bank": "Question Bank",
  };

  const activeRouteName = sidebarRoutes[router.pathname];
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white flex items-center justify-between h-16 border-b-2">
      <div className="flex items-center ml-20">
        <img
          src="/images/logo1.png"
          alt="Main Logo"
          className="w-12 h-12 mr-2 object-contain"
        />
        {activeRouteName && (
          <span className="text-lg font-medium ml-28 text-blue-700 ">
            {activeRouteName}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-6 mr-4">
        <ul className="flex space-x-6">
          <li className="flex items-center hover:bg-gray-100 cursor-pointer">
            <img
              src="/images/newquiz.png"
              alt="Dashboard Icon"
              className="w-6 h-6 mr-3"
            />
            <a href="/admin/quizzes">New Quizzes</a>
          </li>
          <li className="flex items-center hover:bg-gray-100 cursor-pointer">
            <a href="/contact">
              <IoIosMail className="text-2xl" />
            </a>
          </li>
          <li className="flex items-center hover:bg-gray-100 cursor-pointer">
            <a href="/contact">
              <FaBell className="text-xl" />
            </a>
          </li>
        </ul>

        <div className="relative">
          <span onClick={toggleDropdown} className="cursor-pointer">
            {userName}
          </span>
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg">
              <ul>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-red-500 bg-red-400 text-white cursor-pointer"
                    onClick={() => router.push("/logout")}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
