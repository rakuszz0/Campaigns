import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function PrivateRoute() {
  const [state] = useContext(UserContext);

  console.log(state.user.listAsRole);

  return state.user.list_as_role === "Admin" ? <Outlet /> : <Navigate to="/" />;
}
