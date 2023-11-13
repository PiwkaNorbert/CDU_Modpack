import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandling } from "../Helper/errorHandling";
import { apiBase } from "../Constants";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const fetchProfile = async () => {
  const { data, status } = await axios.get(`${apiBase}/profile`, {
    withCredentials: true,
  });
  if (status !== 200) {
    toast.error("No login data found");
    throw new Error("No login data found");
  }

  return data;
};

const useDiscordProfileData = () => {
  const { setUser } = useContext(UserContext);

  return useQuery(["login"], fetchProfile, {
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSuccess: (response) => {
      if (response.in_guild === false) return;

      const profileData = {
        isLoggedIn: true,
        avatar: response.avatar,
        globalName: response.global_name,
        id: response.id,
        username: response.username,
        isAdmin: response.is_admin,
        votesRemaining: response.votes_remaining,
        tokenExpiry: response.token_expiry,
        isLinked: response.is_linked,
        inGuild: response.in_guild,
        playerData: response.player_data,
      };
      localStorage.setItem("profileData", JSON.stringify(profileData));
      setUser(profileData);

      toast.success("Welcome back! You are now logged in!");
    },
  });
};

export default useDiscordProfileData;
