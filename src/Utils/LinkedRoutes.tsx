import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.tsx";
import { useContext } from "react";

const LinkedRoutes = () => {
  const { user } = useContext(UserContext);
  if (!user) return;

  const isLinked = user.isLinked;

  return isLinked ? <Outlet /> : <Navigate to="/404" />;
};

export default LinkedRoutes;
