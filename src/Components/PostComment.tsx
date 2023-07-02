import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useUser } from "../Context/useUser";
import { IPackDetails } from "../Utils/Interfaces";

const PostComment = ({
  borderColor,
  modpackId,
}: {
  borderColor: string;
  modpackId: string;
}) => {
  const [comment, setComment] = React.useState<string>("");

  const { user } = useUser();
  const queryClient = useQueryClient();

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const commentMutation = useMutation(
    (comment: string) =>
      toast.promise(
        axios.post(
          `${apiBase}/api/comment`,
          { comment, modpackId },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        {
          success: "Comment posted! 👌",
          error: "Comment rejected 🤯",
        }
      ),
    {
      onSuccess: (response) => {
        console.log(response);
        queryClient.invalidateQueries(["details", modpackId]);
        queryClient.setQueriesData(["details", modpackId], (oldData) => {
          const oldPackDetails = oldData as IPackDetails;
          setComment("");
          return {
            ...oldPackDetails,
            comments: [
              ...oldPackDetails.comments,
              { comment, username: "You" },
            ],
          };
        });
        setComment("");
      },
      onError: (error) => {
        toast.error(`Couldn't post comment: ${error}`);
      },
    }
  );

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
          className={` min-h-10 min-h-40  resize-none w-full rounded-md border  dark:text-bg border-${borderColor}-300 px-3 py-1 `}
          placeholder="Add a comment..."
          value={comment}
          maxLength={360}
          onChange={(e) => {
            const newLength = e.target.value.length;
            if (newLength <= 360) {
              return setComment(e.target.value);
            }
            toast.error("Too many characters!", {
              toastId: "too-many-characters"
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
        className={`h-10  rounded-md text-text  bg-${borderColor}-500 disabled:bg-slate-400 disabled:text-bg disabled:hover:opacity-100  px-3 py-1 hover:opacity-80 `}
      >
        Post
      </button>
    </form>
  );
};

export default PostComment;
