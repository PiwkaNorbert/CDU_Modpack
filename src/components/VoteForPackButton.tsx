import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteForPackButtonProps } from "../UTILS/Interfaces";
import { toast } from "react-toastify";

export default function VoteForPackButton({modpackId, borderColor, timesVoted, userProfile}: VoteForPackButtonProps) {

  const queryClient =  useQueryClient();

  const addVote = useMutation(() => {
    return axios.get(`/add-vote/${modpackId}`,
    {withCredentials: true})},
  {
    onSettled: () => queryClient.invalidateQueries(["details", modpackId]),
    onError: () =>  toast.error("Sorry, there was an error voting for this modpack!"),
    onSuccess: () => toast.success("You have voted for this modpack!")
  });

  const removeVote = useMutation(() => {
    return axios.get(`/remove-vote/${modpackId}`,
    {withCredentials: true})},
  {
    onSettled: () => queryClient.invalidateQueries(["details", modpackId]),
    onError: () =>  toast.error("Sorry, there was an error removing your vote for this modpack!"),
    onSuccess: () => toast.success("You have removed your vote.")
  });

  return (

    <button
      disabled={addVote.isLoading || removeVote.isLoading}
      className={`text-content disabled:bg-black-300 h-10 rounded-md group  bg-${borderColor}-500 px-3 py-1 text-sm`}
      onClick={() => {
        if (userProfile.isLoggedIn === false) return toast.error("You must be logged in to vote!")
        if (addVote.isLoading || removeVote.isLoading) return;
        if (!timesVoted) {
          return addVote.mutate()

        } 
        if (timesVoted) {
          return removeVote.mutate()

        }
      }}
    >
      {timesVoted ? 
      <div className=" bg-heartBreak w-6 h-6 bg-center bg-contain bg-no-repeat group-hover:bg-heartBreak  delay-0 group-hover:animate-bounce duration-200"></div>
      :  
      <div className=" bg-heart w-6 h-6 bg-center bg-contain bg-no-repeat group-hover:bg-heart  delay-0 group-hover:animate-bounce duration-200"></div>
    }
    
    </button>
  );
}
