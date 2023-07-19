import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "../Context/useUser";
import { IPackDetails } from "../Utils/Interfaces";
import { errorHandling } from "../Helper/errorHandling";

const PostComment = ({
  borderColor,
  modpackId,
  replyParentId,
  replyingTo,
}: {
  borderColor: string;
  modpackId?: string;
  replyParentId: string;
  replyingTo: boolean;
}) => {
  const [comment, setComment] = React.useState<string>("");

  const { user } = useUser();
  const queryClient = useQueryClient();

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

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
    onError: (error: any) => {
      errorHandling(error);
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
      className={`flex items-start justify-center gap-4  pb-2 pt-4 text-sm  text-text dark:text-text xl:text-base ${
        replyingTo && "pl-10"
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
          className={` min-h-10 min-h-40  w-full resize-none rounded-md border   border-${borderColor}-300 px-3 py-1 `}
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
        className={`h-10  rounded-md text-text  bg-${borderColor}-500 px-3 py-1 hover:opacity-80  disabled:bg-slate-400 disabled:text-bg disabled:hover:opacity-100 `}
      >
        {replyingTo ? (commentMutation.isLoading ? "Replying.." : "Reply") : ""}
        {!replyingTo ? (commentMutation.isLoading ? "Posting.." : "Post") : ""}
      </button>
    </form>
  );
};

export default PostComment;
