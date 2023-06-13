import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useModpackData = () => {
  const fetchModpacks = async () => {
    const { data, status } = await axios.get("/api/list-packs");
    if (status !== 200) throw new Error("No Modpacks found");
  
    return data;
  };

  return useQuery(["modpacks"], fetchModpacks, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    onError: (_err) =>  {throw new Error("Couldn't fetch Modpack data, please try again later.")},
  }
  );
};

export default useModpackData;
