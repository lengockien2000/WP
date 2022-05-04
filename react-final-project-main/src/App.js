import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from '@ahaui/react';
import ProtectedRoute from 'components/common/ProtectedRoute';
import UnprotectedRoute from 'components/common/UnprotectedRoute';
import LoadingSpinner from 'components/common/LoadingSpinner';
import Layout from 'components/common/Layout';
import GlobalStyle from 'components/common/GlobalStyle';
import Login from 'components/Login';
import PageNotFound from 'components/PageNotFound';
import { useTheme } from 'context/ThemeContext';

const Home = lazy(() => import('components/Home'));
const Register = lazy(() => import('components/Register'));
// const AddProduct = lazy(() => import('components/AddProduct'));
// const UpdateProduct = lazy(() => import('components/UpdateProduct'));

function App() {
  const { theme } = useTheme();
  return (
    <>
      <GlobalStyle theme={theme} />
      <ToastContainer />
      <Layout>
        <Suspense fallback={<LoadingSpinner isLoading />}>
          <Routes>
            <Route path="/" exact element={<Navigate to="/home" />} />
            <Route
              path="/login"
              exact
              element={<UnprotectedRoute component={Login} />}
            />
            <Route
              path="/register"
              exact
              element={<UnprotectedRoute component={Register} />}
            />
            <Route
              path="/home"
              exact
              element={<ProtectedRoute component={Home} />}
            />
            {/* <Route
              path="/product/create"
              exact
              element={<ProtectedRoute component={AddProduct} />}
            />
            <Route
              path="/product/:productId"
              exact
              element={<ProtectedRoute component={UpdateProduct} />}
            /> */}
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
