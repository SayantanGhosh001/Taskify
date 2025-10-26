import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PublicRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/todos" replace /> : <Outlet />;
};

export default PublicRoute;

