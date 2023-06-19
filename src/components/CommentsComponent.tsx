import { ICommentComponent } from "../Utils/Interfaces";
import relativeDate from "../Helper/relativeDate";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Context/useUser";
import axios from "axios";
import { toast } from "react-toastify";

export function CommentsComponent({
  index,
  borderColor,
  comment,
}: ICommentComponent) {
  const modpackId = window.location.pathname.split("/")[2];
  const { user } = useUser();

  const queryClient = useQueryClient();

  return (
    <div key={index} className="grid items-center justify-between">
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
          {user?.isAdmin && (
            <div className="flex items-center gap-2">
              <button
                className={`text-content text-justify text-${borderColor}-600 rounded-md px-3 py-1 text-xs hover:bg-hover-1 dark:hover:bg-hover-2`}
                onClick={async () => {
                  if (
                    prompt(
                      "Are you sure you want to delete this comment?\nType 'yes' to confirm"
                    ) !== "yes"
                  ) {
                    return toast.error("Modpack not deleted");
                  }

                  try {
                    const res = await axios.delete(
                      `http://trainjumper.com/api/delete-comment`,
                      {
                        withCredentials: true,
                        headers: {
                          "Content-Type": "application/json",
                        },
                        data: {
                          modpackId,
                          commentId: comment?.uuid,
                        },
                      }
                    );
                    res.status !== 200 && console.error(res);

                    queryClient.invalidateQueries([
                      "modpacks",
                      "details",
                      modpackId,
                    ]);

                    toast.success("Comment deleted");
                    return (window.location.href = "/");
                  } catch (error: Error | unknown | string) {
                    console.error(error);
                    toast.error("Error: Couldn't delete comment");
                    throw new Error(error as string);
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-content p-[.5em] text-justify text-sm xl:text-base  xl:text-base">
        {comment?.comment}
      </p>
    </div>
  );
}
