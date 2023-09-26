import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCurrentRoles,
  selectCurrentToken,
} from "../../features/auth/authSlice";

const PrivateRoute = ({ role }) => {
  const tokenAuth = JSON.parse(localStorage.getItem("persist:auth"));
  const token = useSelector(selectCurrentToken);
  const roles = useSelector(selectCurrentRoles);

  const isRole = roles.includes(role);

  if (token && !tokenAuth) {
    if (isRole) {
      return <Outlet />;
    } else {
      return <Navigate to={"/"} />;
    }
  } else if (tokenAuth.token) {
    if (isRole) {
      return <Outlet />;
    } else {
      return <Navigate to={"/"} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRoute;
