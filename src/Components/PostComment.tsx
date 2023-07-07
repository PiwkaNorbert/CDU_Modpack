import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "../Context/useUser";
import { IPackDetails } from "../Utils/Interfaces";

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
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  };

  const fetchReply = async (comment: string) => {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
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
      toast.error(`Couldn't post comment: ${error}`);
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
      className="flex items-start justify-center gap-4  py-4 text-sm xl:text-base "
      onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // short circuit if the user is already posting a comment
        if (commentMutation.isLoading) return;

        // if statement to check if the user has any more comments left to post on this modpack
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
          className={` min-h-10 min-h-40  w-full resize-none rounded-md border  dark:text-bg border-${borderColor}-300 px-3 py-1 `}
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
        {commentMutation.isLoading ? "Replying.." : "Reply"}
      </button>
    </form>
  );
};

export default PostComment;
