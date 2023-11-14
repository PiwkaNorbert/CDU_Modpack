import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { errorHandling } from "../Helper/errorHandling";
import { useState } from "react";
import filterVersionsByInput from "../Utils/filterVersionsByInput";

export const fetchMCVersion = async () => {
  const { data } = await axios(
    `https://private-anon-96b42d0b7f-modpackindex.apiary-proxy.com/api/v1/minecraft/versions`
  );

  console.log(data);

  const response = data.data;
  console.log(response);

  return response;
};

const useMCVersionData = () => {
  const [versionFilterByInput, setVersionFilterByInput] = useState<string[]>(
    []
  );
  const useMCVersionQuery = useQuery(["versions"], fetchMCVersion, {
    staleTime: 10 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    select: (data) => filterVersionsByInput(data, versionFilterByInput),
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
  });
  return {
    useMCVersionQuery,
    versionFilterByInput,
    setVersionFilterByInput,
  };
};

export default useMCVersionData;

// type MCVersion = {
//   id: number;
//   curse_id: number;
//   name: string;
//   slug: string;
//   curse_date_modified: string;
//   updated_at: string;
// };
