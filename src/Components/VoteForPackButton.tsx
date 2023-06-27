import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteForPackButtonProps } from "../Utils/Interfaces";
import { toast,ToastContainer } from "react-toastify";
import { useUser } from "../Context/useUser";
import { useIsFetching } from "@tanstack/react-query";

export default function VoteForPackButton({
  modpackId,
  borderColor,
  voteCount,
  timesVoted
}: VoteForPackButtonProps) {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const { user } = useUser();

  const addVote = useMutation(
   async () => await toast.promise(axios.get(`/api/add-vote/${modpackId}`, { withCredentials: true }),
   {
      success: "Voted for this modpack!",
      error: "Sorry, there was an error voting for this modpack!",
   }),
    {

      onError: (error: Error) => {
        console.error(error);
        return toast.error(
          `Error: ${error || "Unknown error"}}`
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["details", modpackId]);
        // queryClient.setQueryData(["user", user?.id], {
        //   ...user,
        //   votesRemaining: response?.data.votes_remaining,
        // });
     
      },
    }
  );

  const removeVote = useMutation(
   async () =>
    await toast.promise(
      axios.get(`/api/remove-vote/${modpackId}`, {
        withCredentials: true,
       }),
       {
          success: "Removed your vote.",
          error: "Sorry, there was an error removing your vote for this modpack!",
       },
       {
        "autoClose": 5000,
       }
      ),

    {
      onError: (error: Error) => {
        console.error(error);
        return toast.error(
          `Error: ${error || "Unknown error"}}`
        );
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries(["details", modpackId]);
        setRemainingVotes(response?.data.votes_remaining);
      },
    }
  );
  return (
    <>
      {user?.isLoggedIn && (
        <button
          disabled={(isFetching !== 0) || timesVoted === 0}
          className={`text-content button__for-hearts group h-10 rounded-md disabled:bg-slate-400 hover:bg-opacity-80 bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
          onClick={() => {
            if (removeVote.isLoading) return;
            return removeVote.mutate();
          }}
          onMouseOver={() => {
            // if timeVoted is 0 then remove animate-bounce
            if (timesVoted === 0) {
              document
                .querySelector(".btn__vote--heartbreak")
                ?.classList.remove("group-hover:animate-bounce");
            }
          }}
        >
          {isFetching ? (
            "..."
          ) : (
            <div className=" btn__vote--heartbreak h-6 w-6 group-hover:animate-bounce "></div>
          )}
        </button>
      )}
      <p
        className={`flex h-10 items-center rounded-md border px-3 py-1 border-${borderColor}-500`}
      >
        {voteCount == 0
          ? "No votes"
          : `${voteCount} ${voteCount === 1 ? "Vote" : "Votes"}`}
      </p>
      {user?.isLoggedIn && (
        <button
          disabled={!(isFetching === 0) || user?.votesRemaining === 0 }
          className={`text-content button__for-hearts group h-10 rounded-md disabled:bg-slate-400 hover:bg-opacity-80 bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
          onClick={() => {
            if (addVote.isLoading || user?.votesRemaining === 0) return;
            return addVote.mutate();
          }}
          onMouseOver={() => {
            // if timeVoted is 0 then remove animate-bounce
            if (user?.votesRemaining === 0) {
              document
                .querySelector(".btn__vote--heart")
                ?.classList.remove("group-hover:animate-bounce");
            }
          }}
        >
          {isFetching ? (
            "..."
          ) : (
            <div className=" btn__vote--heart h-6 w-6 group-hover:animate-bounce"></div>
          )}
        </button>
      )}
      <ToastContainer limit={1}/>
    </>
  );
}
