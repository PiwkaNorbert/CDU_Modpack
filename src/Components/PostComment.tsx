import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

import { IPackDetails } from "../Utils/Interfaces";
import { errorHandling } from "../Helper/errorHandling";
import useUser from "../Context/useUser";
import { apiBase } from "../Constants";

const PostComment = ({
  color,
  modpackId,
  replyParentId,
  replyingTo,
  setShowAddReply,
  setShowReplies,
}: {
  color: string;
  modpackId?: string;
  replyParentId: string;
  replyingTo: boolean;
  setShowAddReply: React.Dispatch<React.SetStateAction<boolean>>;
  setShowReplies: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [comment, setComment] = React.useState<string>("");

  const { user } = useUser();
  const queryClient = useQueryClient();

  const fetchComment = async (comment: string) => {
    const { data } = await axios.post(
      `${apiBase}/api/comment`,
      { comment, modpackId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  const fetchReply = async (comment: string) => {
    const { data } = await axios.post(
      `${apiBase}/api/add-reply`,
      { comment, parentId: replyParentId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  };

  const commentMutation = useMutation(replyingTo ? fetchReply : fetchComment, {
    onSuccess: (response) => {
      const commentData = {
        uuid: Math.random().toString(),
        comment: comment,
        timestamp: Date.now(),
        username: user?.username,
        avatar_url: user?.avatar,
        reply_count: 0,
      };

      if (replyingTo) {
        setShowAddReply(false);
        setShowReplies(true);
        queryClient.setQueriesData(
          ["replies", replyParentId],
          (oldData: any) => {
            // check it the old data is an array if not make an empty array
            const oldReplies = oldData as Array<any>;
            if (!Array.isArray(oldReplies)) return [response];
            return [...oldReplies, response];
          }
        );
      }
      if (!replyingTo) {
        queryClient.setQueriesData(["details", modpackId], (oldData) => {
          const oldPackDetails = oldData as IPackDetails;
          return {
            ...oldPackDetails,
            comments: [commentData, ...oldPackDetails.comments],
          };
        });
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["details", modpackId]);
      queryClient.invalidateQueries(["replies", replyParentId]);

      setComment("");
    },
  });

  return (
    <form
      method="post"
      className={`flex items-start justify-center gap-2 pb-2 pt-4 text-sm text-text md:gap-4 xl:text-base ${
        replyingTo && "pl-10 "
      } `}
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (commentMutation.isLoading) return;

        commentMutation.mutate(comment);
      }}
    >
      {/* user avatart */}
      <img
        src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}`}
        alt="user avatar"
        loading="lazy"
        className="h-10 w-10 rounded-full"
      />
      <div className=" w-full">
        <textarea
          className={`min-h-10 min-h-40 w-full resize-none rounded-md border bg-bg px-3 py-1 ${
            borderColorVariants[color] + "-500"
          }`}
          placeholder="Add a comment..."
          value={comment}
          maxLength={360}
          onChange={(e) => {
            const newLength = e.target.value.length;
            if (newLength <= 360) {
              return setComment(e.target.value);
            }
            toast.error("Too many characters!", {
              toastId: "too-many-characters",
            });
          }}
        />
        <div className="mt-2 flex items-center justify-center dark:text-text">
          <p>{comment.length}/360</p>
        </div>
      </div>
      {/* Adds a character counter to the description field */}
      <button
        disabled={comment.length === 0 || commentMutation.isLoading}
        type="submit"
        className={`h-10 rounded-md px-3 py-1 text-bg hover:opacity-80 disabled:bg-slate-300 disabled:text-slate-500  disabled:hover:opacity-100 dark:disabled:bg-slate-700 dark:disabled:text-slate-500 ${bgColorVariants[color]}`}
      >
        {replyingTo && (commentMutation.isLoading ? "Replying.." : "Reply")}
        {!replyingTo && (commentMutation.isLoading ? "Posting.." : "Post")}
      </button>
    </form>
  );
};

export default PostComment;

const bgColorVariants: Record<string, string> = {
  red: "bg-red-500 dark:bg-red-400",
  orange: "bg-orange-500 dark:bg-orange-400",
  yellow: "bg-yellow-500 dark:bg-yellow-400",
  lime: "bg-lime-500 dark:bg-lime-400",
  teal: "bg-teal-500 dark:bg-teal-400",
  green: "bg-green-500 dark:bg-green-400",
  blue: "bg-blue-500 dark:bg-blue-400",
  violet: "bg-violet-500 dark:bg-violet-400",
  fuchsia: "bg-fuchsia-500 dark:bg-fuchsia-400",
  sky: "bg-sky-500 dark:bg-sky-400",
};

const borderColorVariants: Record<string, string> = {
  red: "border-red-500 dark:border-red-400",
  orange: "border-orange-500 dark:border-orange-400",
  yellow: "border-yellow-500 dark:border-yellow-400",
  lime: "border-lime-500 dark:border-lime-400",
  teal: "border-teal-500 dark:border-teal-400",
  green: "border-green-500 dark:border-green-400",
  blue: "border-blue-500 dark:border-blue-400",
  violet: "border-violet-500 dark:border-violet-400",
  fuchsia: "border-fuchsia-500 dark:border-fuchsia-400",
  sky: "border-sky-500 dark:border-sky-400",
};
