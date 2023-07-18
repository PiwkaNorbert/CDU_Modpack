import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import { placeholderDetails } from "../Constants";
import { errorHandling } from "../Helper/errorHandling";

export const fetchPackDetail = async (modpackId: string) => {
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const { data, status } = await axios.get(
    `${apiBase}/api/pack-details/${modpackId}`
  );

  if (status !== 200) throw new Error("No data found");

  return data;
};

const usePackDetailData = (modpackId: string) => {
  return useQuery(["details", modpackId], () => fetchPackDetail(modpackId), {
    enabled: modpackId.length > 0,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,

    // initialData: placeholderDetails,
    onError: (error: any) => {
      errorHandling(error);
    },
  });
};

export default usePackDetailData;
