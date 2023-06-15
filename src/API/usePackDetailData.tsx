import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export const fetchPackDetail = async (modpackId:string) => {
  const { data, status } = await axios.get(`/api/pack-details/${modpackId}`,
 );

  if (status !== 200) throw new Error("No data found");

  return data;
};

const usePackDetailData = (modpackId: string) => {



  return useQuery(["details", modpackId], ()=>fetchPackDetail(modpackId), {
    enabled: modpackId.length > 0,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export default usePackDetailData;
