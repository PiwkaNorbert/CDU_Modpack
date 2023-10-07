import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandling } from "../Helper/errorHandling";
import { apiBase } from "../Constants";

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
  return useQuery(["login"], fetchProfile, {
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSuccess: (response) => {
      if (response.in_guild === false) return;

      toast.success("Welcome back! You are now logged in!");
    },
  });
};

export default useDiscordProfileData;
