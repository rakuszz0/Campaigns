import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function PrivateRoute() {
  const [state] = useContext(UserContext);

  if (!state.isLogin) return <Navigate to="/" />;

  return !state.user.isAdmin !== "Admin" ? <Outlet /> : <Navigate to="/admin/dashboard" />;
}
