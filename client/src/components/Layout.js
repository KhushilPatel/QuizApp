
import { useRouter } from "next/router";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const Layout = ({ children }) => {
  
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex ">

        <Sidebar />
        <main className="flex p-4">{children}</main>
      </div>
      </div>
  
  );
};

export default Layout;
