import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useDiscordProfileData = () => {
  const url =  "https://www.trainjumper.com/";

  const fetchProfile = async () => {

    const { data, status } = await axios.get(`${url}profile`, {
      withCredentials: true,
    });

    if (status !== 200) throw new Error("No login data found");
    
    return data;
  };

  return useQuery(["login"], fetchProfile);
};

export default useDiscordProfileData;