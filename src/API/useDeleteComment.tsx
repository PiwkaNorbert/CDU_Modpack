import axios from "axios";
import {toast} from "react-toastify";

export const deleteComment = async (modpackId:void, value:string) => {
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