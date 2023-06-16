import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteForPackButtonProps } from "../UTILS/Interfaces";
import { toast } from "react-toastify";
import { useUser } from "../HELPER/UserContext"
import { useIsFetching } from "@tanstack/react-query";

export default function VoteForPackButton({modpackId, borderColor, timesVoted}: VoteForPackButtonProps) {

  const queryClient =  useQueryClient();
  const isFetching = useIsFetching()

  const { user:userProfile, increaseRemainingVotes, decreaseRemainingVotes, setRemainingVotes } = useUser();

  const addVote = useMutation(() => {
    return axios.get(`/api/add-vote/${modpackId}`,
    {withCredentials: true})},
  {
    onSettled: (response) => {
      queryClient.invalidateQueries(["details", modpackId]);
      // decreaseRemainingVotes()
      setRemainingVotes(response?.data.votes_remaining);
    },
    onError: (err) =>  {
      console.error(err);
      toast.error("Sorry, there was an error voting for this modpack!")},
      onSuccess: () => {
        toast.success("You have voted for this modpack!")
    }
  });

  const removeVote = useMutation(() => {
    return  axios.get(`/api/remove-vote/${modpackId}`,
    {withCredentials: true})},
  {
    onSettled: (response) => {
      queryClient.invalidateQueries(["details", modpackId])
      // increaseRemainingVotes()
      setRemainingVotes(response?.data.votes_remaining);
    },
    onError: () =>  toast.error("Sorry, there was an error removing your vote for this modpack!"),
    onSuccess: () => {
      
      toast.success("You have removed your vote.")

     // spread operator to spread the old data and to update the  votes remaining in the user profile data from local storage
  }
  });

  return (
    <>
      {userProfile?.isLoggedIn &&
          (
            <button
              disabled={isFetching ||  userProfile?.votesRemaining === 0}
              className={`text-content disabled:bg-slate-600 h-10 rounded-md group  bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
              onClick={() => {
                if (addVote.isLoading || userProfile?.votesRemaining === 0) return;
                return addVote.mutate()
                }
              }
            >
                   {isFetching ? "...":
              <div className=" btn__vote--heart w-6 h-6 delay-0 group-hover:animate-bounce duration-200"></div>
            }
            </button>
          )
      
      }

      {userProfile?.isLoggedIn &&
          (
            <button
              disabled={isFetching || timesVoted === 0}
              className={`text-content disabled:bg-slate-600 h-10 rounded-md group  bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
              onClick={() => {
                if ( removeVote.isLoading ) return;
                return removeVote.mutate()
                }
              }
            > 
            {isFetching ? "...":
              <div className=" btn__vote--heartbreak w-6 h-6 delay-0 group-hover:animate-bounce duration-200"></div>
            }
            </button>)
      }
    </>

    // <button
    //   disabled={addVote.isLoading || removeVote.isLoading}
    //   className={`text-content disabled:bg-slate-600 h-10 rounded-md group  bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
    //   onClick={() => {
    //     if (userProfile.isLoggedIn === false) return toast.error("You must be logged in to vote!")
    //     if (addVote.isLoading || removeVote.isLoading) return;
    //     if (!timesVoted) {
    //       return addVote.mutate()

    //     } 
    //     if (userProfile?.votesRemaining <=0) {
    //       return removeVote.mutate()

    //     }
    //   }}
    // >
    //   {timesVoted ? 
    //   <div className=" bg-heartBreak w-6 h-6 bg-center bg-contain bg-no-repeat group-hover:bg-heartBreak  delay-0 group-hover:animate-bounce duration-200">vote</div>
    //   :  
    //   <div className=" bg-heart w-6 h-6 bg-center bg-contain bg-no-repeat group-hover:bg-heart  delay-0 group-hover:animate-bounce duration-200">unvote</div>
    // }
    
    // </button>
  );


}

