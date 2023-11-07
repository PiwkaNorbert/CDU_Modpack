import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiBase } from "../Constants";

const useOAuth = () => {
  const fetchLogin = async () => {
    const { data, status } = await axios.get(`${apiBase}auth/discord`);
    if (status !== 200) throw new Error("No login data found");

    return data;
  };

  return useQuery(["login"], fetchLogin, { keepPreviousData: true });
};

export default useOAuth;
