import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { FaBars, FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

const AdminNavbar = ({ isSidebarOpen, toggleSidebar }) => {
  const router = useRouter();
  const { user, logout } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/signIn");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-800">
                QuizWiz Admin
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none"
              >
                <FaUserCircle className="w-6 h-6 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {user?.name || "Admin"}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    {user?.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-2" />
                    Sign Out
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

export default AdminNavbar;
