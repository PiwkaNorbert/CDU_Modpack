import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePackDetailData = (modpackId: string | undefined) => {
  const url = import.meta.env.VITE_URL
    ? import.meta.env.VITE_URL
    : "https://www.trainjumper.com/";

  const fetchPackDetail = async () => {
    const { data, status } = await axios.get(`${url}pack-details/${modpackId}`);

    if (status !== 200) throw new Error("No data found");

    return data;
  };

  return useQuery(["details", modpackId], fetchPackDetail, {
    enabled: modpackId?.length > 0,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export default usePackDetailData;
