import * as React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
