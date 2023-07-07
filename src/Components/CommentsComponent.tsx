import { ICommentComponent } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import useCommentRepliesData, {
  fetchCommentReplies,
} from "../API/useCommentRepliesData.tsx";
import { useState } from "react";
import PostComment from "./PostComment";
import { ReplyComponent } from "./ReplyComponent";
import { useUser } from "../Context/useUser.tsx";
import { useParams } from "react-router-dom";

export function CommentsComponent({ borderColor, comment }: ICommentComponent) {
  const { user } = useUser();
  const { modpackId } = useParams();
  const [showReplies, setShowReplies] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const { data, isLoading, isError } = useCommentRepliesData(
    comment?.uuid,
    comment?.reply_count
  );

  const queryClient = useQueryClient();

  return (
    <>
      <ReplyComponent
        borderColor={borderColor}
        comment={comment}
        replyingTo={false}
        replyParentId=""
      />

      <div className="flex ">
        {user?.isLoggedIn && (
          <button
            className={` mr-1 w-fit rounded-md border border-${borderColor}-500  px-3 py-1 text-justify text-xs text-text  hover:border-opacity-80 bg-${borderColor}-500 hover:bg-opacity-80  dark:hover:bg-hover-2 `}
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
            borderColor={borderColor}
            modpackId={modpackId}
            replyingTo={true}
            replyParentId={comment?.uuid}
            showAddReply={showAddReply}
          />
          
   
      )}
      {showReplies && (
        <div className="ml-10">
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p>Error</p>
          ) : (
            data?.map((reply: any) => (
              <ReplyComponent
                borderColor={borderColor}
                comment={reply}
                replyingTo={true}
                replyParentId={comment?.uuid}
                
              />
            ))
          )}
        </div>
      )}
    </>
  );
}
