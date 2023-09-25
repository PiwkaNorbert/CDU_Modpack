import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiBase, placeholderDetails } from "../Constants";
import { errorHandling } from "../Helper/errorHandling";

export const fetchCommentReplies = async (commentId: string) => {
  const { data, status } = await axios.get(
    `${apiBase}/api/fetch-comment-replies/${commentId}`
  );

  if (status !== 200) throw new Error("No data found");

  return data;
};

const useCommentRepliesData = (commentId: string, replyCount: number) => {
  return useQuery(
    ["replies", commentId],
    () => fetchCommentReplies(commentId),
    {
      enabled: replyCount > 0,
      keepPreviousData: true,
      staleTime: 1000 * 60 * 1,
      refetchOnWindowFocus: false,
      initialData: placeholderDetails,
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
    }
  );
};

export default useCommentRepliesData;
