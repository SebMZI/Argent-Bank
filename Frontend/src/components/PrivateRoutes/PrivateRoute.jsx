import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";

const PrivateRoute = () => {
  const tokenAuth = JSON.parse(localStorage.getItem("persist:auth"));
  const token = useSelector(selectCurrentToken);

  if (token && !tokenAuth) {
    return <Outlet />;
  } else if (tokenAuth.token) {
    return <Outlet />;
  } else {
    <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
