import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { errorHandling } from "../Helper/errorHandling";

export const fetchProfile = async () => {
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const { data, status } = await axios.get(`${apiBase}/profile`, {
    withCredentials: true,
  });
  if (status !== 200) throw new Error("No login data found");

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
