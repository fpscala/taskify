import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = () => {
    // Your authentication logic here, return true if authenticated, false otherwise
    // Example: Check if a user is logged in by looking at the authentication token
    const authToken = localStorage.getItem("accessToken");
    return !!authToken;
  };
  return <>{isAuthenticated() ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoutes;
