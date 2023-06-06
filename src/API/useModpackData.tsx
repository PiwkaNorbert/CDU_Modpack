import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IModpack } from "../data";

const useModpackData = () => {
  const fetchModpacks = async () => {
    const { data, status } = await axios.get(
      "http://www.trainjumper.com:7270/list-packs"
    );
    if (status !== 200) throw new Error("No data found");

    return data;
  };

  return useQuery(["modpacks"], fetchModpacks);
};

export default useModpackData;
