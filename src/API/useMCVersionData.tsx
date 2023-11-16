import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { errorHandling } from "../Helper/errorHandling";
import { useState, useCallback } from "react";
import { MCVersion } from "../Utils/Types";

export const fetchMCVersion = async () => {
  const { data } = await axios(
    `https://private-anon-96b42d0b7f-modpackindex.apiary-proxy.com/api/v1/minecraft/versions`
  );

  const response = data.data;

  return response;
};

const useMCVersionData = () => {
  const [versionFilterByInput, setVersionFilterByInput] = useState<string[]>(
    []
  );

  const filterVersionsByInput = useCallback(
    (data: MCVersion[]) => {
      if (!versionFilterByInput || versionFilterByInput[0] === "") return data;
      return data.filter(({ name }) => name.includes(versionFilterByInput[0]));
    },
    [versionFilterByInput]
  );

  const useMCVersionQuery = useQuery<MCVersion[], AxiosError>(
    ["versions"],
    fetchMCVersion,
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      select: filterVersionsByInput,
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
    }
  );
  return {
    useMCVersionQuery,
    versionFilterByInput,
    setVersionFilterByInput,
  };
};

export default useMCVersionData;
