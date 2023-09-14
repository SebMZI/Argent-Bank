import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

const PrivateRoute = () => {
  const token = useSelector(selectCurrentToken);
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
