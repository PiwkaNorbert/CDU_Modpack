import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./../Context/UserContext.tsx";
import { useContext } from "react";

const AdminRoutes = () => {
  const { user } = useContext(UserContext);
  if (!user) return;

  const isAdmin = user.isAdmin;

  return isAdmin ? <Outlet /> : <Navigate to="/404" />;
};

export default AdminRoutes;
