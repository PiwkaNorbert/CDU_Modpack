import { IComment, ICommentComponent } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import useCommentRepliesData, {
  fetchCommentReplies,
} from "../API/useCommentRepliesData.tsx";
import { useState } from "react";
import PostComment from "./PostComment";
import { ReplyComponent } from "./ReplyComponent";
import { useUser } from "../Context/useUser.tsx";
import { useParams } from "react-router-dom";

export function CommentsComponent({
  borderColor,
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
        borderColor={borderColor && borderColor ? borderColor : "sky"}
        comment={comment}
        replyingTo={false}
        replyParentId=""
      />

      <div className="flex ">
        {user?.isLoggedIn && (
          <button
            className={`ml-[.5em] mr-1 w-fit rounded-md border border-${borderColor}-500 dark:border-${borderColor}-600  px-3 py-1 text-justify text-xs text-text hover:border-opacity-80  dark:text-text bg-${borderColor}-500 dark:bg-${borderColor}-600 hover:bg-opacity-80  dark:hover:bg-opacity-80 `}
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
      </div>
      {showAddReply && (
        <PostComment
          borderColor={borderColor && borderColor ? borderColor : "sky"}
          modpackId={modpackId}
          replyingTo={true}
          replyParentId={comment?.uuid || ""}
          setShowAddReply={setShowAddReply}
          setShowReplies={setShowReplies}
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
                borderColor={borderColor && borderColor ? borderColor : "sky"}
                comment={reply}
                replyingTo={true}
                replyParentId={comment?.uuid || ""}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}
