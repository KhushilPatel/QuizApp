import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import '../styles/globals.css';

import { ToastContainer } from 'react-toastify';

import { QuestionBankProvider } from '@/context/qb_context';

function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutRoutes = ['/signUp', '/signIn', '/admin/quizzes/add-question'];

  // Determine whether to render with or without layout based on route
  const shouldRenderWithLayout = !noLayoutRoutes.includes(router.pathname);

  return (
    <>
      {shouldRenderWithLayout ? (
        <Layout>
        
            <QuestionBankProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </QuestionBankProvider>
         
        </Layout>
      ) : (
        // Render without layout for specific routes
        <Component {...pageProps} />
      )}
    </>
  );
}

export default App;
