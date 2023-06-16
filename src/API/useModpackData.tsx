import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// srtucture the staticLabels to match the data from the api
// url for 100x100 placeholder image 

const staticLabels = [
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/100",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  }

];

const useModpackData = () => {
  const fetchModpacks = async () => {
    const { data, status } = await axios.get("/api/list-packs");
    if (status !== 200) throw new Error("No Modpacks found");
  console.log(data);
  
    return data;
  };

  return useQuery(["modpacks"], fetchModpacks, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    // initialData: staticLabels,

    onError: (_err) =>  {throw new Error("Couldn't fetch Modpack data, please try again later.")},
  }
  );
};

export default useModpackData;
