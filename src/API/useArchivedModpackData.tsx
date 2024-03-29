import { QueryClient, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IModpack } from "../Utils/Interfaces";
// import { staticLabels } from "../Constants";
import { useState } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { apiBase } from "../Constants";
import { filterModpacks } from "../Utils/filterModpacks";

const useArchivedModpackData = (queryClient: QueryClient) => {
  const [modPackFilterByInput, setModPackFilterByInput] = useState<string[]>(
    []
  );
  const [modPackFilterByTags, setModPackFilterByTags] = useState<string[]>([]);

  const fetchArchivedModpacks = async (signal?: AbortSignal) => {
    const { data, status } = await axios.get(
      `${apiBase}/api/list-archived-packs`,
      { signal }
    );

    if (status !== 200) throw new Error("No Modpacks found");

    data.forEach((modpack: IModpack) => {
      queryClient.setQueryData(["pack-details", modpack.modpackId], modpack);
    });
    return data;
  };

  const { data, isLoading, isError, error } = useQuery<IModpack[], AxiosError>(
    ["modpacks", "archived"],
    ({ signal }) => fetchArchivedModpacks(signal),
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      // placeholderData: staticLabels,
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
export default useArchivedModpackData;
