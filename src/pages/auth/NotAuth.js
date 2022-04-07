import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context";

export const NotAuth = () => {
  const { userState } = useAuth();

  return !userState ? <Outlet /> : <Navigate to="/" />;
};
