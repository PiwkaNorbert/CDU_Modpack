import { ICommentComponent, IPackDetails } from "../Utils/Interfaces";
import relativeDate from "../Helper/relativeDate";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Context/useUser";
import axios from "axios";
import { toast } from "react-toastify";

export function CommentsComponent({ borderColor, comment, discordId }: ICommentComponent) {
  const modpackId = window.location.pathname.split("/")[2];
  const { user } = useUser();

  const queryClient = useQueryClient();

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
          {user?.isAdmin  && (
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

                  try {
                    const res = await toast.promise(
                      axios.delete(`/api/delete-comment`, {
                        withCredentials: true,
                        headers: {
                          "Content-Type": "application/json",
                        },
                        data: {
                          modpackId,
                          commentId: comment?.uuid,
                        },
                      }),
                      {
                        pending: "Attempting to delete comment...",
                        success: "Comment deleted! 👌",
                        error: "Couldn't delete comment 🤯",
                      }
                    );
                    res.status !== 200 && console.error(res);

                    queryClient.invalidateQueries([
                      "modpacks",
                      "details",
                      modpackId,
                    ]);
                    queryClient.setQueryData(
                      ["details", modpackId],
                      (oldData) => {
                        const oldPackDetails = oldData as IPackDetails;
                        console.log(oldPackDetails);

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
                  } catch (error: Error | unknown | string) {
                    console.error(error);
                    toast.error(`Error: ${error}`);
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-content break-all p-[.5em] text-justify text-sm xl:text-base ">
        {comment?.comment}
      </p>
    </>
  );
}
