import { QueryClient, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IModpack } from "../Utils/Interfaces";
// import { staticLabels } from "../Constants";
import { useCallback, useState } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { apiBase } from "../Constants";

const useModpackData = (queryClient: QueryClient) => {
  const [modPackFilterByInput, setModPackFilterByInput] = useState("");
  const [modPackFilterByTags, setModPackFilterByTags] = useState("");

  const filterModpacks = useCallback(
    (modpacks: IModpack[]) => {
      if (!(modPackFilterByInput || modPackFilterByTags)) return modpacks;

      let filteredModpacks = modpacks;

      // sort packs by input value
      if (modPackFilterByInput) {
        filteredModpacks = filteredModpacks.filter(
          (modpack) =>
            modpack.name
              .toLowerCase()
              .includes(modPackFilterByInput.toLowerCase()) ||
            modpack.tags.some(
              (tag) => tag.toLowerCase() === modPackFilterByInput.toLowerCase()
            )
        );
      }
      // sort packs by tags
      if (modPackFilterByTags) {
        const tags = modPackFilterByTags.split(" ");
        filteredModpacks = filteredModpacks.filter((modpack: IModpack) =>
          tags.every((tag) => modpack.tags.includes(tag))
        );
      }

      return filteredModpacks;
    },
    [modPackFilterByInput, modPackFilterByTags]
  );

  const fetchModpacks = async () => {
    const { data, status } = await axios.get(`${apiBase}/api/list-packs`);

    if (status !== 200) throw new Error("No Modpacks found");

    data.forEach((modpack: IModpack) => {
      queryClient.setQueryData(["details", modpack.modpackId], modpack);
    });

    return data;
  };

  const { data, isLoading, isError, error } = useQuery<IModpack[], AxiosError>(
    ["modpacks"],
    fetchModpacks,
    {
      staleTime: 1000 * 60 * 1, // 1 minutes
      retry: 2,
      // placeholderData: staticLabels,
      select: filterModpacks,

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
export default useModpackData;
