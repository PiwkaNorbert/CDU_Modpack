import { ICommentComponent } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import useCommentRepliesData,{ fetchCommentReplies } from "../API/useCommentRepliesData.tsx";
import { useState } from "react";
import  PostComment  from "./PostComment";
import  {ReplyComponent}  from "./ReplyComponent";


export function CommentsComponent({ borderColor, comment }: ICommentComponent) {
  const modpackId = window.location.pathname.split("/")[2];
  const [showReplies, setShowReplies] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const {data, isLoading, isError} = useCommentRepliesData(comment?.uuid, comment?.reply_count );
  
  // console.log(comment)
  console.log(data)


  const queryClient = useQueryClient();


  return (
    <>
      <ReplyComponent borderColor={borderColor} comment={comment}  />

      <div className="flex ">

        <button
          className={` mr-1 rounded-md w-fit border border-sec  px-3 py-1 text-justify text-xs text-text  hover:bg-sec hover:bg-opacity-20 hover:border-opacity-20  dark:hover:bg-hover-2 `}
          onClick={() => {
            setShowAddReply(!showAddReply);
          }}
          >
            Reply
        </button>
        {comment?.reply_count !== 0 && (
        <>
        <button
        className={` ml-1 rounded-md w-fit border border-sec  px-3 py-1 text-justify text-blue-500 text-xs  hover:bg-sec hover:bg-opacity-20 hover:border-opacity-20  dark:hover:bg-hover-2 `}
        disabled={comment?.reply_count === 0}
        onMouseEnter={() => {
          if (comment?.reply_count === 0) return;
          queryClient.prefetchQuery(["replies", comment?.uuid], () =>
          fetchCommentReplies(comment?.uuid as string)
          
          );
        }}
        
        onClick={() => {
          if (comment?.reply_count === 0) return;
          setShowReplies(!showReplies);
           }}>

          {comment?.reply_count} reply
        </button>
    
      </>

      )}
      </div>
      {showAddReply && (
          <>
            <PostComment borderColor={borderColor} modpackId={modpackId}  replyingTo={true}
              replyParentId={comment?.uuid} />
          </>
        )}
      {showReplies && (
        <div className="ml-10">
          {isLoading ? <p>Loading...</p> :
          isError ? <p>Error</p> :
          data?.map((reply: any) => (
            <ReplyComponent
              borderColor={borderColor}
              comment={reply}
              replyingTo={true}
              replyParentId={comment?.uuid}
         

            />
          ))}
        </div>
      )}

    </>
  );
}
