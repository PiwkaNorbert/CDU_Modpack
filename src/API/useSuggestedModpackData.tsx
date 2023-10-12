import { QueryClient, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IModpack } from "../Utils/Interfaces";
// import { staticLabels } from "../Constants";
import { useState } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { apiBase } from "../Constants";
import { filterModpacks } from "./filterModpacks";

const useSuggestedModpackData = (queryClient: QueryClient) => {
  const [modPackFilterByInput, setModPackFilterByInput] = useState<string[]>(
    []
  );
  const [modPackFilterByTags, setModPackFilterByTags] = useState<string[]>([]);

  const fetchSuggestedModpacks = async () => {
    const { data, status } = await axios(`${apiBase}/api/list-suggested-packs`);

    if (status !== 200) throw new Error("No Modpacks found");

    data.forEach((modpack: IModpack) => {
      queryClient.setQueryData(["pack-details", modpack.modpackId], modpack);
    });

    return data;
  };

  const { data, isLoading, isError, error } = useQuery<IModpack[], AxiosError>(
    ["suggested-modpacks"],
    fetchSuggestedModpacks,
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      keepPreviousData: true,
      retry: 2,
      // initialData: staticLabels,
      select: (modpack) =>
        filterModpacks(modpack, modPackFilterByInput, modPackFilterByTags),

      onError: (error) => {
        if (axios.isAxiosError(error)) {
          return errorHandling(error);
        }
        throw error;
      },
    }
  );

  return {
    data,
    isLoading,
    isError,
    error,
    modPackFilterByTags,
    modPackFilterByInput,
    setModPackFilterByInput,
    setModPackFilterByTags,
  };
};
export default useSuggestedModpackData;
