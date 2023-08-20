import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoginToken } from "../../selectors/user.selectors";

const PrivateRoute = () => {
  const token = useSelector(selectLoginToken);
  return token ? <Outlet /> : <Navigate to={"/login"} />;
};

export default PrivateRoute;
