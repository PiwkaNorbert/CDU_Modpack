import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { errorHandling } from "../Helper/errorHandling";
import { IPackDetails } from "../Utils/Interfaces";
import { apiBase } from "../Constants";

export const fetchPackDetail = async (modpackId: string) => {
  const { data, status } = await axios.get(
    `${apiBase}/api/pack-details/${modpackId}`
  );

  if (status !== 200) throw new Error("No data found");

  return data;
};

const usePackDetailData = (modpackId: string) => {
  return useQuery<IPackDetails, AxiosError>(
    ["details", modpackId],
    () => fetchPackDetail(modpackId),
    {
      enabled: modpackId.length > 0,
      staleTime: 1000 * 60 * 1,
      refetchOnWindowFocus: false,
      retry: 2,

      // placeholderData: placeholderDetails,
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
    }
  );
};

export default usePackDetailData;
