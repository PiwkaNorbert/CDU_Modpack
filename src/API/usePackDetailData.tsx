import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { errorHandling } from "../Helper/errorHandling";
import { IPackDetails } from "../Utils/Interfaces";
import { apiBase } from "../Constants";

export const fetchPackDetail = async (
  modpackId: string,
  signal?: AbortSignal
) => {
  const { data, status } = await axios.get(
    `${apiBase}/api/pack-details/${modpackId}`,
    { signal }
  );

  if (status !== 200) throw new Error("No data found");

  return data;
};

const usePackDetailData = (modpackId: string) => {
  return useQuery<IPackDetails, AxiosError>(
    ["pack-details", modpackId],
    ({ signal }) => fetchPackDetail(modpackId, signal),
    {
      enabled: modpackId.length > 0 || !undefined || !null,
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
