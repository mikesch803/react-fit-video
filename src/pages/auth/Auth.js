import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";

export const Auth = () => {
  const { userState } = useAuth();

  return userState ? <Outlet /> : <Navigate to="/login" />;
};
