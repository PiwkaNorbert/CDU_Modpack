import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { placeholderDetails } from "../Constants";
import { toast } from "react-toastify";

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
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        console.error("error message: ", error.message);
        return toast.error(error.response?.data.message);
      } else {
        console.error("unexpected error: ", error);
        throw new Error(
          "Couldn't fetch Modpack details, please try again later."
        );
      }
    },
  });
};

export default usePackDetailData;
