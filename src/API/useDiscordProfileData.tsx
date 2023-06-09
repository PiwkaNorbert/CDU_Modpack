import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
const useDiscordProfileData = () => {
  const url =  "https://www.trainjumper.com/";

  const fetchProfile = async () => {

    const { data, status } = await axios.get(`${url}profile`, {
      withCredentials: true,
    });

    if (status !== 200) throw new Error("No login data found");
    
    return data;
  };

  return useQuery(["login"], fetchProfile, {
    onError: (_err) =>  toast.error("Sorry, there was an error logging you in!"),
    onSuccess: (_res) => toast.success("Welcome back! You are now logged in!")
  });
};

export default useDiscordProfileData;