import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchProfile = async () => {

  const { data, status } = await axios.get(`/profile`, {
    withCredentials: true,
  });
  if (status !== 200) throw new Error("No login data found");

  
  return data 
};


const useDiscordProfileData = () => {

  return useQuery(["login"], fetchProfile, {
    onError: (_err: Error) =>  {
      console.error(_err);
      toast.error("Sorry, there was an error logging you in!")
    },
    onSuccess: () => toast.success("Welcome back! You are now logged in!")
  });
};

export default useDiscordProfileData;