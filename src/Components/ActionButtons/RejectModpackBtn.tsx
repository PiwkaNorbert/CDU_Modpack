import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { errorHandling } from "../../Helper/errorHandling";
import axios from "axios";
import { apiBase } from "../../Constants";

const RejectModpackBtn = ({modpackId}: {modpackId: string}) => {

    const queryClient = useQueryClient();

    const rejectModpack = async (reason: string) =>
    await axios.post(
      `${apiBase}/api/archive-modpack`,
      { modpackId, reason },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const rejectModpackMutation = useMutation(rejectModpack, {
        onSuccess: ({ data }) => {
            queryClient.setQueryData(
            ["modpacks", "pack-details", modpackId],
            data.modpack
          );
          toast.success(data.message);
        },
        onError: (error) => {
          if (error instanceof Error) {
            return errorHandling(error);
          }
          throw error;
        },
        onSettled: () => {
          queryClient.invalidateQueries(["pack-details", modpackId], {
            exact: true,
          });
          queryClient.invalidateQueries([
            "modpacks",
            "suggested-modpacks",
            "archived-modpacks",
          ]);
        },
      });

  return (
    <button
        disabled={rejectModpackMutation.isLoading}
        className="active:bg-text/15 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-red-600 transition-all hover:bg-text-1/10 active:bg-text-1/20 sm:w-fit sm:justify-normal "
        onClick={async () => {
        if (rejectModpackMutation.isLoading) return;
        const promptInput = prompt("What is the rationale behind the rejection?") 
        if (promptInput) {
            rejectModpackMutation.mutate(promptInput);
        } else {
            return toast.error("Unable to reject modpack");
        }
        }}
    >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 256 256"
        >
        <path d="M168.49,104.49,145,128l23.52,23.51a12,12,0,0,1-17,17L128,145l-23.51,23.52a12,12,0,0,1-17-17L111,128,87.51,104.49a12,12,0,0,1,17-17L128,111l23.51-23.52a12,12,0,0,1,17,17ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128Z"></path>
        </svg>
        Reject
    </button>
  )
}

export default RejectModpackBtn