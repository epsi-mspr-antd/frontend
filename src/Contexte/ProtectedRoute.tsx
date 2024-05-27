import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext.tsx';

const ProtectedRoute = () => {
  const user = useContext(AuthContext);

  if (!user.accessToken) {
    console.log(user.accessToken)
    // If user is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the requested route
  return <Outlet />;
};

export default ProtectedRoute;
