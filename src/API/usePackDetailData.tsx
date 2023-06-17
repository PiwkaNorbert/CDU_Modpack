import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const staticLabels = 
  {
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'grey',
    description: "This is a placeholder description",
    timesVoted: 0,
    voteCount: 0,
    comments: [
      {
        username: "Placeholder",
        comment: "This is a placeholder comment",
        timestamp: 0,
        discord_id: "0",
        avatar_url: "https://unsplash.it/1000",
      },
    ]

  }




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
    initialData: staticLabels,

  });
};

export default usePackDetailData;
