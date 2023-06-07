import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useOAuth = () => {
  const url = import.meta.env.VITE_URL
    ? import.meta.env.VITE_URL
    : "http://www.trainjumper.com:7270/";

  const fetchLogin = async () => {
    const { data, status } = await axios.get(`${url}auth/discord`);
    if (status !== 200) throw new Error("No login data found");

    return data;
  };

  return useQuery(["login"], fetchLogin, { keepPreviousData: true });
};

export default useOAuth;
