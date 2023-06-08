import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IModpack } from "../data";

const useModpackData = () => {
  const fetchModpacks = async () => {
    const { data, status } = await axios.get(
      "https://www.trainjumper.com/api/list-packs"
    );
    if (status !== 200) throw new Error("No Modpacks found");

    return data;
  };

  return useQuery(["modpacks"], fetchModpacks, { keepPreviousData: true });
};

export default useModpackData;
