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
    avatar:
      "https://cdn.discordapp.com/avatars/123456789012345678/123456789012345678.png?size=128",
    globalName: "username#1234",
    id: "123456789012345678",
    username: "username",
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
