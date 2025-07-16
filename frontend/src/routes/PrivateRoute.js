import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  /* Force‑redirect if user visits wrong dashboard */
  if (location.pathname.startsWith('/dashboard') && role !== 'hr') {
    return <Navigate to="/employee-dashboard" replace />;
  }
  if (location.pathname.startsWith('/employee-dashboard') && role === 'hr') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
