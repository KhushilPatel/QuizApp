// AdminRoute.js
import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const AdminRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useUser();
  console.log("User in AdminRoute:", user);

  useEffect(() => {
    if (!user && !loading) {
      router.push('/signIn'); // Redirect to sign-in page if not authenticated
      toast("Please sign in first");
    } else if (user && !user.isAdmin) {
      router.push('/not-authorized'); // Redirect to a "not authorized" page or any other page
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return children;
};

export default AdminRoute;
