import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

const UserLayout = ({ children }) => {
  const { user } = useUser();
  const [isUser, setIsUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsUser(!user?.isAdmin);
    }
  }, [user]);

  console.log("isUser", isUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="flex pt-16">
        <div className="fixed left-0 top-16 h-screen w-64 bg-white/80 backdrop-blur-sm shadow-lg">
          <Sidebar />
        </div>
        <main className="flex-1 ml-64 pl-4 pr-4">
          <div className="max-w-screen">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
