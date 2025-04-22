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
      router.push("/signIn"); // Redirect to sign-in page if not authenticated
      toast("Please sign in first");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return children;
};

export default AdminRoute;
