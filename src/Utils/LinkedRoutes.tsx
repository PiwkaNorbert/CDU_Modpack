import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.tsx";
import { useContext } from "react";
import LoginButton from "../Components/LoginButton.tsx";

const LinkedRoutes = () => {
  
  const { user } = useContext(UserContext);
  if (!user) {
    return (
      <div className="py-24">
        <LoginButton message="to suggest a modpack" />
      </div>
    );
  }

  if (!user.isLinked) {
    return (
      <div className="py-24">
        To suggest a modpack, you need to link your discord account to your
        minecraft account.
      </div>
    );
  }


  return user.isLinked ? <Outlet /> : <Navigate to="/404" />;
};

export default LinkedRoutes;
