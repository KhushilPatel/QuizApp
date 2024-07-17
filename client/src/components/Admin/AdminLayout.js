import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(null);
const router=useRouter()
  useEffect(() => {
    
    if (user) {
      setIsAdmin(user?.isAdmin);
    }
  }, [user]);

  if (isAdmin === false) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl text-red-600">You are not authorized to view this page</h1>

      </div>
    );
  }


  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
