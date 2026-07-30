import { Navigate, Outlet } from "react-router-dom";

import Loader from "./Loader";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ requiredRole }) => {
  const { loading, isAuthenticated, user } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;