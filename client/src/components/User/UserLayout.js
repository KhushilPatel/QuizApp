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

  console.log("isUser",isUser)
  
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

export default UserLayout;