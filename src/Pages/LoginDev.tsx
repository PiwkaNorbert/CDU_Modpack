export interface LoginProps {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  scope: string;
  identify: string;
  token_type: string;
  Bearer: string;
  expires_at: string;
}
import { useSearchParams, Navigate } from "react-router-dom";
import { DiscordProfileData } from "../Utils/Interfaces";
import { useUser } from "../Context/useUser";

const LoginDev = () => {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const { setUser } = useUser();

  // assign random data to the user
  const profileData: DiscordProfileData = {
    isLoggedIn: true,
    avatar: "aa58910dc6d5ca6feba60c415bba2b6b",
    globalName: "iberius#1234",
    id: "176079322140901376",
    username: "Iberius",
    isAdmin: true,
    votesRemaining: 12,
    tokenExpiry: Date.now() + 1209600000,
    isLinked: true,
    inGuild: true,
  };

  setUser(profileData);
  localStorage.setItem("profileData", JSON.stringify(profileData));
  // display a toast message to the user that they have logged in

  if (!returnUrl) return <Navigate to="/" />;

  return <Navigate to={returnUrl} />;
};
export default LoginDev;
