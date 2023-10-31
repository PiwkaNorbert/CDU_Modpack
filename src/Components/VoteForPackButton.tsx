import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VoteForPackButtonProps } from "../Utils/Interfaces";
import { toast } from "react-toastify";
import useUser from "../Context/useUser";
import { useIsFetching } from "@tanstack/react-query";
import { IModpack } from "../Utils/Interfaces";
import { errorHandling } from "../Helper/errorHandling";
import HeartCirclePlus from "./SVG/HeartCirclePlus";
import HeartCircleMinus from "./SVG/HeartCircleMinus";
import { twMerge } from "tailwind-merge";
import { apiBase } from "../Constants";

export default function VoteForPackButton({
  modpackId,
  color,
  voteCount,
  timesVoted,
}: VoteForPackButtonProps) {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  const { user, votesRemaining } = useUser();

  function changeVoteCount(response: any) {
    console.log(response);

    if (response.status !== 200) throw new Error(response.data.error);

    queryClient.setQueryData(["pack-details", modpackId], (oldData) => {
      const modpack = oldData as IModpack;

      console.log({
        ...modpack,
        voteCount: response?.data.modpack_votes,
        timesVoted: response?.data.n_votes,
      });
      if (!modpack) return;

      return {
        ...modpack,
        voteCount: response?.data.modpack_votes,
        timesVoted: response?.data.n_votes,
      };
    });
    queryClient.setQueryData(["modpacks"], (oldData) => {
      const modpacks = oldData as IModpack[];

      if (!modpacks) return;

      return modpacks.map((modpack: IModpack) => {
        if (modpack.modpackId === modpackId) {
          console.log({
            ...modpack,
            voteCount: response?.data.modpack_votes,
            timesVoted: response?.data.n_votes,
          });

          return {
            ...modpack,
            voteCount: response?.data.modpack_votes,
            timesVoted: response?.data.n_votes,
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
        queryClient.invalidateQueries(["modpacks", "pack-details", modpackId]);
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
        queryClient.invalidateQueries(["modpacks", "pack-details", modpackId]);
      },
    }
  );

  return (
    <>
      {user?.isLinked && (
        <button
          disabled={isFetching !== 0 || timesVoted === 0}
          className={`${bgColorVariants[color]} group h-10 rounded-md px-3 py-1 text-sm text-bg transition-all hover:bg-opacity-80 hover:text-bg  disabled:bg-slate-300 disabled:text-slate-500 dark:text-bg dark:hover:bg-opacity-80 dark:hover:text-bg dark:disabled:bg-slate-700 dark:disabled:text-slate-500 xl:text-base`}
          onClick={() => {
            if (removeVote.isLoading) return;
            return removeVote.mutate();
          }}
        >
          {isFetching ? "..." : <HeartCircleMinus />}
        </button>
      )}
      <p
        className={` min-w-24 max-w-28 flex h-10 items-center justify-center rounded-md border px-3 py-1 ${borderColorVariants[color]}`}
      >
        {voteCount == 0
          ? "No votes"
          : `${voteCount} ${voteCount === 1 ? "Vote" : "Votes"}`}
      </p>
      {user?.isLinked && (
        <button
          disabled={!(isFetching === 0) || user?.votesRemaining === 0}
          className={twMerge(
            `${bgColorVariants[color]} group h-10 rounded-md px-3 py-1 text-sm text-bg transition-all hover:bg-opacity-80 hover:text-bg  disabled:bg-slate-300 disabled:text-slate-500 dark:text-bg dark:hover:bg-opacity-80 dark:hover:text-bg dark:disabled:bg-slate-700 dark:disabled:text-slate-500 xl:text-base`
          )}
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

const bgColorVariants: Record<string, string> = {
  red: "bg-red-400 dark:bg-red-400",
  orange: "bg-orange-400 dark:bg-orange-400",
  yellow: "bg-yellow-400 dark:bg-yellow-400",
  lime: "bg-lime-400 dark:bg-lime-400",
  teal: "bg-teal-400 dark:bg-teal-400",
  green: "bg-green-400 dark:bg-green-400",
  blue: "bg-blue-400 dark:bg-blue-400",
  violet: "bg-violet-400 dark:bg-violet-400",
  fuchsia: "bg-fuchsia-400 dark:bg-fuchsia-400",
  sky: "bg-sky-400 dark:bg-sky-400",
};

const borderColorVariants: Record<string, string> = {
  red: "border-red-400 dark:border-red-400",
  orange: "border-orange-400 dark:border-orange-400",
  yellow: "border-yellow-400 dark:border-yellow-400",
  lime: "border-lime-400 dark:border-lime-400",
  teal: "border-teal-400 dark:border-teal-400",
  green: "border-green-400 dark:border-green-400",
  blue: "border-blue-400 dark:border-blue-400",
  violet: "border-violet-400 dark:border-violet-400",
  fuchsia: "border-fuchsia-400 dark:border-fuchsia-400",
  sky: "border-sky-400 dark:border-sky-400",
};
