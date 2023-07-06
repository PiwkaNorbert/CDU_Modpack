import { ICommentComponent, IPackDetails } from "../Utils/Interfaces";
import relativeDate from "../Helper/relativeDate";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useUser } from "../Context/useUser";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import axios from "axios";


export function ReplyComponent({ borderColor, comment, replyingTo, replyParentId }: ICommentComponent) {
  const { modpackId} = useParams<{ modpackId: string }>();
  const { user } = useUser();


  const queryClient = useQueryClient();


  const deleteComment = async (value:string) => {
    try {
      const res = await toast.promise(
        axios.delete(`/api/delete-comment`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            modpackId,
            commentId: value,
          },
        }),
        {
          error: "Couldn't delete comment 🤯",
        }
      );
      res.status !== 200 && console.error(res);

    } catch (error: Error | unknown | string) {
      console.error(error);
      toast.error(`Error: ${error}`);
    }
  }

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      toast.success("Comment deleted! 👌");
      if (replyingTo) {

        queryClient.setQueryData(
          ["details", modpackId],
          (oldData: any) => {
          console.log(oldData);
          
            return {
              ...oldData,
              oldData: oldData.filter(
                (c) => c.uuid !== replyParentId
              )
             
            };
          }
        );
      
      }

      if (!replyingTo) {

        queryClient.setQueryData(
          ["details", modpackId],
          (oldData) => {
            const oldPackDetails = oldData as IPackDetails;

            return {
              ...oldPackDetails,
              comments: [
                ...oldPackDetails.comments.filter(
                  (c) => c.uuid !== comment?.uuid
                ),
              ],
            };
          }
        );
      }


    },
    onError: (error: Error | unknown | string) => {
      console.error(error);
      toast.error(`Error: ${error}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        "modpacks",
        "details",
        modpackId,
      ]);
        // queryClient.invalidateQueries(["replies", replyTo]);

    }
  })

  return (
    <>
      <div className="  flex items-center gap-4 pt-[1em] text-base">
        <img
          className="h-10 w-10 rounded-full"
          src={comment?.avatar_url}
          alt="user"
        />
        <div className="flex items-center gap-2">
          <p className={`text-content  text-justify text-${borderColor}-600`}>
            {comment.username}
          </p>
          <p className="text-content text-justify text-xs text-gray-400 xl:text-sm">
            {relativeDate(comment?.timestamp)}
          </p>

   
    
          {/* If userProfile is super user / moderator show delete comment button underneith */}
          {(user?.isAdmin || user?.id === comment?.discord_id)  &&  (
            <div className="flex items-center gap-2 justify-self-end">
              <button
                className={`text-content rounded-md border border-sec  px-3 py-1 text-justify text-xs text-red-500 hover:bg-sec hover:bg-opacity-20 hover:border-opacity-20  dark:hover:bg-hover-2 `}
                onClick={async () => {
                  if (
                    prompt(
                      "Are you sure you want to delete this comment?\nType 'yes' to confirm"
                    ) !== "yes"
                  ) {
                    return toast.error("Modpack not deleted");
                  }
                  deleteCommentMutation.mutate(
                    comment?.uuid
                  );

                  
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-content break-word p-[.5em] text-justify text-sm xl:text-base ">
        {comment?.comment}
      </p>
    </>
  );
}
