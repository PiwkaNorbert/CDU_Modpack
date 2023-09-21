import {
  ICommentComponent,
  ICommentComponentChildren,
  IPackDetails,
} from "../Utils/Interfaces";
import relativeDate from "../Helper/relativeDate";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import useUser from "../Context/useUser";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import axios from "axios";
import { errorHandling } from "../Helper/errorHandling";
import { textColorVariants } from "../Constants";

export function ReplyComponent({
  children,
  color,
  comment,
  replyingTo,
  replyParentId,
}: ICommentComponentChildren) {
  const { modpackId } = useParams<{ modpackId: string }>();
  const { user } = useUser();

  const queryClient = useQueryClient();

  const deleteComment = async (value: string) => {
    const res = await axios.delete(`/api/delete-comment`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        modpackId,
        commentId: value,
      },
    });

    if (res.status !== 200) throw new Error("Unable to delete comment");
    return res.data;
  };

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      if (replyingTo) {
        queryClient.setQueryData(["replies", replyParentId], (oldData) => {
          const oldReplies = oldData as ICommentComponent[];
          // filter the replies to remove the deleted comment
          return [
            ...oldReplies.filter((c: any) => {
              c.uuid !== comment?.uuid;
            }),
          ];
        });
        return toast.success("Comment deleted! 👌");
      }

      if (!replyingTo) {
        queryClient.setQueryData(["details", modpackId], (oldData) => {
          const oldPackDetails = oldData as IPackDetails;

          return {
            ...oldPackDetails,
            comments: [
              ...oldPackDetails.comments.filter(
                (c) => c.uuid !== comment?.uuid
              ),
            ],
          };
        });
        return toast.success("Comment deleted! 👌");
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["modpacks", "details", modpackId]);
      // queryClient.invalidateQueries(["replies", replyTo]);
    },
  });

  return (
    <div className="flex gap-2 pt-[1em] md:gap-4">
      <img
        className="h-10 w-10 rounded-full"
        src={comment?.avatar_url}
        alt="user"
      />
      <div className="  grid items-center gap-2 pt-1 text-base ">
        <div className="flex items-center gap-2">
          <p className={`  text-justify ${textColorVariants[color ?? "sky"]}`}>
            {comment?.username}
          </p>
          <p className=" text-justify text-xs text-text/60 xl:text-sm">
            {comment && relativeDate(comment.timestamp)}
          </p>

          {/* If userProfile is super user / moderator show delete comment button underneith */}
          {(user?.isAdmin || user?.id === comment?.discord_id) && (
            <div className="flex items-center gap-2 justify-self-end">
              <button
                disabled={deleteCommentMutation.isLoading}
                className={` rounded-md border border-sec  px-3 py-1 text-justify text-xs text-red-500 hover:border-opacity-20 hover:bg-sec hover:bg-opacity-20  dark:hover:bg-hover-2 `}
                onClick={async () => {
                  if (
                    prompt(
                      "Are you sure you want to delete this comment?\nType 'yes' to confirm"
                    ) !== "yes"
                  ) {
                    return toast.error("Unable to delete comment");
                  }
                  if (deleteCommentMutation.isLoading) return;

                  const commentId = comment?.uuid as string;

                  deleteCommentMutation.mutate(commentId);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <p className="break-word  text-justify text-sm xl:text-base ">
          {comment?.comment}
        </p>
        {children}
      </div>
    </div>
  );
}
