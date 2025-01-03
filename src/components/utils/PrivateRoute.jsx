import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const token = localStorage.getItem("access_token");

  // Check if we have a token and it's still valid (simple check)
  const isValidToken = token ? true : false;

  // If no valid token or not authenticated, redirect to login
  if (!isValidToken) {
    return <Navigate to="/login" replace />;
  }

  // If everything is fine, render the protected route
  return <Outlet />;
};

export default PrivateRoute;
