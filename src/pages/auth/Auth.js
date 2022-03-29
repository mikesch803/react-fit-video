import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context";

export const Auth = () => {
  const { userState } = useContext(AuthContext);

  return userState ? <Outlet /> : <Navigate to="/login" />;
};
