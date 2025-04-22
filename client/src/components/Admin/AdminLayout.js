import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsAdmin(user?.isAdmin);
    }
  }, [user]);

  if (isAdmin === false) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-600">
          You are not authorized to view this page
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex pt-16">
        <div className="fixed left-0 top-16 h-screen w-64 bg-white shadow-lg">
          <Sidebar />
        </div>
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
