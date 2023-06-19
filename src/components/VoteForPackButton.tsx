import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteForPackButtonProps } from "../Utils/Interfaces";
import { toast } from "react-toastify";
import { useUser } from "../Context/useUser";
import { useIsFetching } from "@tanstack/react-query";

export default function VoteForPackButton({
  modpackId,
  borderColor,
  voteCount,
}: VoteForPackButtonProps) {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const { user, setRemainingVotes } = useUser();

  const addVote = useMutation(
    () => {
      return axios.get(`/api/add-vote/${modpackId}`, { withCredentials: true });
    },
    {
      onSettled: (response) => {
        queryClient.invalidateQueries(["details", modpackId]);
        setRemainingVotes(response?.data.votes_remaining);
      },
      onError: (err) => {
        console.error(err);
        toast.error("Sorry, there was an error voting for this modpack!");
      },
      onSuccess: () => {
        toast.success("You have voted for this modpack!");
      },
    }
  );

  const removeVote = useMutation(
    () => {
      return axios.get(`/api/remove-vote/${modpackId}`, {
        withCredentials: true,
      });
    },
    {
      onSettled: (response) => {
        queryClient.invalidateQueries(["details", modpackId]);
        setRemainingVotes(response?.data.votes_remaining);
      },
      onError: () =>
        toast.error(
          "Sorry, there was an error removing your vote for this modpack!"
        ),
      onSuccess: () => {
        toast.success("You have removed your vote.");

        // spread operator to spread the old data and to update the  votes remaining in the user profile data from local storage
      },
    }
  );

  return (
    <>
      {user?.isLoggedIn && (
        <button
          disabled={!(isFetching === 0) || voteCount === 0}
          className={`text-content button__for-hearts group h-10 rounded-md disabled:bg-slate-600   bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
          onClick={() => {
            if (removeVote.isLoading) return;
            return removeVote.mutate();
          }}
          onMouseOver={() => {
            // if timeVoted is 0 then remove animate-bounce
            if (voteCount === 0) {
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
          disabled={!(isFetching === 0) || user?.votesRemaining === 0}
          className={`text-content button__for-hearts group h-10 rounded-md disabled:bg-slate-600 bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
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
    </>
  );
}
