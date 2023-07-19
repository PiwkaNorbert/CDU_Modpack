import { ICommentComponent, IPackDetails } from "../Utils/Interfaces";
import relativeDate from "../Helper/relativeDate";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useUser } from "../Context/useUser";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import axios from "axios";
import { errorHandling } from "../Helper/errorHandling";

export function ReplyComponent({
  borderColor,
  comment,
  replyingTo,
  replyParentId,
}: ICommentComponent) {
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
          return [...oldReplies.filter((c: any) => c.uuid !== comment?.uuid)];
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
    onError: (error: any) => {
      errorHandling(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["modpacks", "details", modpackId]);
      // queryClient.invalidateQueries(["replies", replyTo]);
    },
  });

  return (
    <>
      <div className="  flex items-center gap-4 pt-[1em] text-base first:pt-0">
        <img
          className="h-10 w-10 rounded-full"
          src={comment?.avatar_url}
          alt="user"
        />
        <div className="flex items-center gap-2">
          <p className={`  text-justify text-${borderColor}-600`}>
            {comment.username}
          </p>
          <p className=" text-justify text-xs text-text/60 xl:text-sm">
            {relativeDate(comment?.timestamp)}
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

                  deleteCommentMutation.mutate(comment?.uuid);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className=" break-word p-[.5em] text-justify text-sm xl:text-base ">
        {comment?.comment}
      </p>
    </>
  );
}
