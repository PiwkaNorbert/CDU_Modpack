import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// srtucture the staticLabels to match the data from the api
// url for 100x100 placeholder image 

const staticLabels = [
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  },
  {
    modpackId: 'placeholder',
    name: "Modpack",
    imageUrl: "https://unsplash.it/1000",
    color: 'white',
    voteCount: 0,
    commentCount: 0,
  }

];

const useModpackData = () => {
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? 'https://www.trainjumper.com' : '';

  const fetchModpacks = async () => {
    const { data, status } = await axios.get(`${apiBase}/api/list-packs`);

    if (status !== 200) throw new Error("No Modpacks found");
    
      console.log(data);  
  
    return data;
  };

  return useQuery(["modpacks"], fetchModpacks, {
    staleTime: 1000 * 60 * 5, // 5 minutes
    keepPreviousData: true,
    // initialData: staticLabels,

    onError: (_err: Error) =>  {
      console.error(_err);
      
      throw new Error("Couldn't fetch Modpack data, please try again later.")},
  }
  );
};

export default useModpackData;
