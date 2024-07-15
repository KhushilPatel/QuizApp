import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/context/UserContext';

  

function App({ Component, pageProps }) {
  const router = useRouter();
  //This array lists the routes where you don't want to use the Layout component.Means where i don't want navbar and sidebar
  const noLayoutRoutes = ['/signUp', '/signIn', '/admin/question-bank/add', '/admin/question-bank/edit/[id]'];

  const shouldRenderWithLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <UserProvider>
      
    <>
      {shouldRenderWithLayout ? (
        <Layout>
        
              <Component {...pageProps} />
              <ToastContainer position="top-center" autoClose={5000} />
         
        </Layout>
      ) : (
     
        <div>

          <Component {...pageProps} />
          <ToastContainer position="top-center" autoClose={5000} />
        </div>
      )}
    </>

    </UserProvider>
  );
}

export default App;
