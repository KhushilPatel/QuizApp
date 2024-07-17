import { useUser } from '@/context/UserContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const UserRoute = ({ children }) => {
  const router = useRouter();
  const { user, loading } = useUser();
  console.log("Login data:", user);
  useEffect(() => {
    if (!user && !loading) {
      router.push('/signIn');
      toast("Please sign in first");
    } 
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default UserRoute;