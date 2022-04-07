import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";

export const Auth = () => {
  const { userState } = useAuth();
  const location = useLocation();
  return userState ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
