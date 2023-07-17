import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IModpack } from "../Utils/Interfaces";
import { staticLabels } from "../Constants";
import { useCallback, useState } from "react";

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
          (modpack: IModpack) =>
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
    const isDev = import.meta.env.VITE_NODE_ENV === "development";
    const apiBase = isDev ? "https://www.trainjumper.com" : "";

    const { data, status } = await axios.get(`${apiBase}/api/list-packs`);

    if (status !== 200) throw new Error("No Modpacks found");

    data.forEach((pack: IModpack) => {
      queryClient.setQueryData(["details", pack.modpackId], pack);
    });

    return data;
  };

  const { data, isLoading, isError, error } = useQuery(
    ["modpacks"],
    fetchModpacks,
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      keepPreviousData: true,
      // placeholderData: staticLabels,
      retry: 2,
      select: filterModpacks,

      onError: (_err: Error) => {
        console.error(_err);

        throw new Error("Couldn't fetch Modpack data, please try again later.");
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
