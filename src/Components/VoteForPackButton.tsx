import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteForPackButtonProps } from "../Utils/Interfaces";
import { toast } from "react-toastify";
import { useUser } from "../Context/useUser";
import { useIsFetching } from "@tanstack/react-query";
import { IModpack } from "../Utils/Interfaces";
import { errorHandling } from "../Helper/errorHandling";
import HeartCirclePlus from "./SVG/HeartCirclePlus";
import HeartCircleMinus from "./SVG/HeartCircleMinus";

export default function VoteForPackButton({
  modpackId,
  borderColor,
  voteCount,
  timesVoted,
}: VoteForPackButtonProps) {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const { user, votesRemaining } = useUser();

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  function changeVoteCount(response: any) {
    if (response.status !== 200) throw new Error(response.data.error);

    queryClient.setQueryData(["details", modpackId], response?.data.modpack);
    queryClient.setQueryData(["modpacks"], (oldData) => {
      const modpacks = oldData as IModpack[];
      if (!modpacks) return;

      return modpacks.map((modpack: IModpack) => {
        if (modpack.modpackId === modpackId) {
          return {
            ...modpack,
            voteCount: response?.data.modpack.voteCount,
            timesVoted: response?.data.modpack.timesVoted,
          };
        }
        return modpack;
      });
    });
  }

  const addVote = useMutation(
    async () =>
      await axios.get(`${apiBase}/api/add-vote/${modpackId}`, {
        withCredentials: true,
      }),
    {
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSuccess: (response) => {
        if (response.status !== 200) throw new Error(response.data.error);

        changeVoteCount(response);
        votesRemaining(response?.data.votes_remaining);

        toast.success(response?.data.message, { toastId: "add-vote" });
      },
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks", "details", modpackId]);
      },
    }
  );

  const removeVote = useMutation(
    async () =>
      await toast.promise(
        axios.get(`${apiBase}/api/remove-vote/${modpackId}`, {
          withCredentials: true,
        }),
        {
          error:
            "Sorry, there was an error removing your vote for this modpack!",
        },
        {
          autoClose: 5000,
        }
      ),
    {
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSuccess: (response) => {
        if (response.status !== 200) throw new Error(response.data.error);
        changeVoteCount(response);
        votesRemaining(response?.data.votes_remaining);

        toast.success(response?.data.message, { toastId: "remove-vote" });
      },
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks", "details", modpackId]);
      },
    }
  );

  return (
    <>
      {user?.isLinked && (
        <button
          disabled={isFetching !== 0 || timesVoted === 0}
          className={`group h-10 rounded-md text-text hover:bg-opacity-80 dark:hover:bg-opacity-80 disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-500  bg-${borderColor}-500 dark:bg-${borderColor}-600 px-3 py-1 text-sm xl:text-base`}
          onClick={() => {
            if (removeVote.isLoading) return;
            return removeVote.mutate();
          }}
        >
          {isFetching ? "..." : <HeartCircleMinus timesVoted={timesVoted} />}
        </button>
      )}
      <p
        className={` min-w-24 max-w-28 flex h-10 items-center justify-center rounded-md border px-3 py-1 border-${borderColor}-500`}
      >
        {voteCount == 0
          ? "No votes"
          : `${voteCount} ${voteCount === 1 ? "Vote" : "Votes"}`}
      </p>
      {user?.isLinked && (
        <button
          disabled={!(isFetching === 0) || user?.votesRemaining === 0}
          className={` group h-10 rounded-md text-text hover:bg-opacity-80 dark:hover:bg-opacity-80 disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-500  bg-${borderColor}-500 dark:bg-${borderColor}-600 px-3 py-1 text-sm xl:text-base`}
          onClick={() => {
            if (addVote.isLoading || user?.votesRemaining === 0) return;
            return addVote.mutate();
          }}
        >
          {isFetching ? (
            "..."
          ) : (
            <HeartCirclePlus votesRemaining={user?.votesRemaining} />
          )}
        </button>
      )}
    </>
  );
}
