import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context";

export const NotAuth = () => {
  const { userState } = useContext(AuthContext);

  return !userState ? <Outlet /> : <Navigate to="/" />;
};
