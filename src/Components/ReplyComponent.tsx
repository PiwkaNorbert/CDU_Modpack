import {
  ICommentComponent,
  ICommentComponentChildren,
  IPackDetails,
} from "../Utils/Interfaces";
import relativeDate from "../Helper/relativeDate";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useUser from "../Context/useUser";
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import axios from "axios";
import { errorHandling } from "../Helper/errorHandling";
import { textColorVariants } from "../Constants";
import { DiscordUserData } from "../types/discord-user-data";


const useCDUAPI = (discordID?: string) => {


  const getDiscordUser = async () => {
    const {data, status} = await axios.get(`https://api.playcdu.co/users/discord/?discord=${discordID}`);
    if (status !== 200) throw new Error("Unable to fetch user" );
    return data;
  }

  return useQuery<DiscordUserData>(["discord-user", discordID], getDiscordUser, {
    enabled: !!discordID || discordID !== undefined,
  });

}


export function ReplyComponent({
  children,
  color,
  comment,
  replyingTo,
  replyParentId,
}: ICommentComponentChildren) {
  const { modpackId } = useParams<{ modpackId: string }>();
  const { user } = useUser();


  const { data: discordUser, isSuccess } = useCDUAPI(comment?.discord_id as string);
  

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
        queryClient.setQueryData(["pack-details", modpackId], (oldData) => {
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
      queryClient.invalidateQueries(["modpacks", "pack-details", modpackId]);
      // queryClient.invalidateQueries(["replies", replyTo]);
    },
  });


  return (
    <div className="grid grid-cols-auto-fit grid-rows-auto-fit  gap-2  border-b border-gray-50 py-4 dark:border-gray-700 ">

      <UserAvatar isSuccess={isSuccess}  discordUser={discordUser} />

      <div className="flex w-full justify-between gap-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
          <p
            className={`text-justify capitalize ${
              textColorVariants[color ?? "sky"]
            }`}
          >
            {comment?.username}
          </p>
          <p className=" text-justify text-xs  text-text-1/60 xl:text-sm ">
            {comment && relativeDate(comment.timestamp)}
          </p>
        </div>
        {/* If userProfile is super user / moderator show delete comment button underneith */}
        {(user?.isAdmin || user?.id === comment?.discord_id) && (
          <button
            disabled={deleteCommentMutation.isLoading}
            className={` rounded-md border border-sec px-3 py-1 text-justify text-xs text-red-500 hover:border-opacity-20 hover:bg-sec/20  dark:hover:bg-hover-2 `}
            onClick={async () => {
              if (deleteCommentMutation.isLoading) return;
              if (
                confirm(
                  "Are you sure you want to delete this comment?\n'OK' to confirm"
                )
              ) {
                const commentId = comment?.uuid as string;

                deleteCommentMutation.mutate(commentId);
              } else {
                return toast.error("Unable to delete comment");
              }
            }}
          >
            Delete
          </button>
        )}
      </div>

      <p className="comment__content break-word relative col-span-full flex w-full flex-col gap-2 pt-1 text-justify  text-sm text-gray-800 dark:text-gray-200 sm:ml-0 xl:text-base">
        {comment?.comment}
      </p>
      {children}
    </div>
  );
}

interface UserAvatarProps {
  isSuccess: boolean;
  discordUser?: {
    player_stats?: {
      uuid?: string;
    };
  };
}


export const UserAvatar: React.FC<UserAvatarProps> = ({ isSuccess, discordUser }) => {
  return (
    isSuccess ? (
      <img
        loading="lazy"
        className="aspect-1/1 max-h-10 rounded-full"
        src={`https://mc-heads.net/head/${discordUser?.player_stats?.uuid}`}
        alt="user avatar"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/steve.png";
          return;
        }}
      />
    ) : (
      <img
        loading="lazy"
        className="aspect-1/1 max-h-10 rounded-full"
        src="/steve.png"
        alt="user avatar"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/steve.png";
          return;
        }}
      />
    )
  );
};