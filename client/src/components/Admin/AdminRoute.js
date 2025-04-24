// AdminRoute.js
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/signIn");
      toast("Please sign in first");
    } else if (user && !user.isAdmin) {
      router.push("/user/dashboard");
      toast("You don't have admin access");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !user.isAdmin) {
    return null;
  }

  return children;
};

export default AdminRoute;
