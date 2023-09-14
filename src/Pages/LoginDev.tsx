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
import useUser from "../Context/useUser";
import { useEffect } from "react";

const LoginDev = () => {
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const { user, setUser } = useUser();

  // assign random data to the user
  const profileData: DiscordProfileData = {
    isLoggedIn: true,
    avatar: "aa58910dc6d5ca6feba60c415bba2b6b",
    globalName: "iberius#1234",
    id: "176079322140901376",
    username: "Iberius",
    isAdmin: true,
    votesRemaining: 12,
    tokenExpiry: Date.now() / 1000 + 3600,
    isLinked: true,
    inGuild: true,
    playerData: {
      uuid: "910823491287319283712938123478124867",
      username: "Iberius",
      discord_id: "176079322140901376",
      mc_avatar_url:
        "https://crafatar.com/avatars/c5ef334745934f398bb12eaa40dd986e?size=100&overlay",
      mc_head_url:
        "https://crafatar.com/renders/head/c5ef334745934f398bb12eaa40dd986e?size=100&overlay",
      mc_avatar_url_fallback:
        "https://mc-heads.net/avatar/c5ef334745934f398bb12eaa40dd986e/100",
    },
  };

  // set the user in the context provider to the data but without this error  "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
  function setDevUser(data: DiscordProfileData) {
    setUser(data);
  }

  useEffect(() => {
    if (user) return;

    setDevUser(profileData);
    localStorage.setItem("profileData", JSON.stringify(profileData));
  }, []);

  if (!returnUrl) return <Navigate to="/" />;

  return (window.location.pathname = returnUrl);
};
export default LoginDev;
