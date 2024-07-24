import { useRouter } from 'next/router';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/context/UserContext';

import UserLayout from '@/components/User/UserLayout';

import AdminRoute from '@/components/Admin/AdminRoute';
import UserRoute from '@/components/User/UserRoute';
import AdminLayout from '@/components/Admin/AdminLayout';

function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutRoutes = ['/signUp', '/signIn', '/admin/question-bank/add', '/admin/question-bank/edit/[id]','/user/quiz/[id]','/user/results/[id]'];

  const getLayout = () => {
    if (noLayoutRoutes.includes(router.pathname)) {
      return <Component {...pageProps} />;
    } else if (router.pathname.startsWith('/admin')) {
      return (
        <AdminRoute>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </AdminRoute>
      );
    } else if (router.pathname.startsWith('/user')) {
      return (
        <UserRoute>
          <UserLayout>
            <Component {...pageProps} />
          </UserLayout>
        </UserRoute>
      );
    }
    return <Component {...pageProps} />;
  };

  return (
    <UserProvider>
      {getLayout()}
      <ToastContainer position="top-center" autoClose={5000} />
    </UserProvider>
  );
}

export default App;