import { IComment, ICommentComponent } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import useCommentRepliesData, {
  fetchCommentReplies,
} from "../API/useCommentRepliesData.tsx";
import { useState } from "react";
import PostComment from "./PostComment";
import { ReplyComponent } from "./ReplyComponent";
import useUser from "../Context/useUser";
import { useParams } from "react-router-dom";
import { twJoin } from "tailwind-merge";

export function CommentsComponent({
  color,
  comment,
}: Partial<ICommentComponent>) {
  const { user } = useUser();
  const { modpackId } = useParams();
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [showAddReply, setShowAddReply] = useState<boolean>(false);
  const { data, isLoading, isError } = useCommentRepliesData(
    comment?.uuid as string,
    comment?.reply_count as number
  );

  const queryClient = useQueryClient();

  return (
    <>
      <ReplyComponent
        color={color ?? "sky"}
        comment={comment}
        replyingTo={false}
        replyParentId=""
      >
        <>
          {user?.isLoggedIn && (
            <button
              className={twJoin(
                ` w-fit rounded-md border px-3 py-1 text-justify text-xs text-bg hover:border-opacity-80 hover:bg-opacity-80 dark:hover:bg-opacity-80 `,
                borderColorVariants[color ?? "sky"],
                bgColorVariants[color ?? "sky"]
              )}
              onClick={() => {
                setShowAddReply(!showAddReply);
              }}
            >
              Reply
            </button>
          )}
          {comment?.reply_count !== 0 && (
            <>
              <button
                className={` ml-1 w-fit rounded-md border border-sec  px-3 py-1 text-justify text-xs text-blue-500  hover:border-opacity-20 hover:bg-sec hover:bg-opacity-20  dark:hover:bg-hover-2 `}
                disabled={comment?.reply_count === 0}
                onMouseEnter={() => {
                  if (comment?.reply_count === 0 || showReplies) return;
                  queryClient.prefetchQuery(["replies", comment?.uuid], () =>
                    fetchCommentReplies(comment?.uuid as string)
                  );
                }}
                onClick={() => {
                  if (comment?.reply_count === 0) return;
                  setShowReplies(!showReplies);
                }}
              >
                {comment?.reply_count} reply
              </button>
            </>
          )}
        </>
      </ReplyComponent>

      {showAddReply && (
        <PostComment
          color={color ?? "sky"}
          modpackId={modpackId}
          replyingTo={true}
          replyParentId={comment?.uuid || ""}
        />
      )}
      {showReplies && (
        <div className="ml-10 pt-[.5em]">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error</p>
          ) : (
            data?.map((reply: IComment) => (
              <ReplyComponent
                color={color ?? "sky"}
                comment={reply}
                replyingTo={true}
                replyParentId={comment?.uuid || ""}
              >
                <></>
              </ReplyComponent>
            ))
          )}
        </div>
      )}
    </>
  );
}

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
