import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  
import { QuestionBankProvider } from '@/context/qb_context';

function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutRoutes = ['/signUp', '/signIn', '/admin/question-bank/add', '/admin/question-bank/edit/[id]'];


  // Determine whether to render with or without layout based on route
  const shouldRenderWithLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {shouldRenderWithLayout ? (
        <Layout>
        
            <QuestionBankProvider>
              <Component {...pageProps} />
              <ToastContainer position="top-center" autoClose={5000} />
            </QuestionBankProvider>
         
        </Layout>
      ) : (
        // Render without layout for specific routes
        <div>

          <Component {...pageProps} />
          <ToastContainer position="top-center" autoClose={5000} />
        </div>
      )}
    </>
  );
}

export default App;
