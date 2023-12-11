import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IModpack } from "../../Utils/Interfaces";
import { errorHandling } from "../../Helper/errorHandling";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiBase } from "../../Constants";

const DeleteModpackBtn = ({modpackId}: {modpackId: string}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const deleteModpack = async () =>
    await axios.delete(`${apiBase}/api/delete-modpack`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        modpackId,
      },
    });

  const deleteModpackMutation = useMutation(deleteModpack, {
    onSuccess: ({ data }) => {
      const { message } = data;
      toast.success(`${message}! 👌`);

      queryClient.setQueryData(["modpacks", modpackId], (oldData) => {
        const newData = oldData as IModpack[];
        return newData.filter(
          (modpack: IModpack) => modpack.modpackId !== modpackId
        );
      });
      
      return navigate("/");
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
    disabled={deleteModpackMutation.isLoading}
    className="active:bg-text/15 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2  text-rose-800 transition-all hover:bg-text-1/10 active:bg-text-1/20 sm:w-fit sm:justify-normal "
    onClick={async () => {
      if (deleteModpackMutation.isLoading) return;
      if (
        prompt(
          "Are you sure you want to delete this modpack?\nType 'Yes' to confirm"
        ) === "Yes"
      ) {
        deleteModpackMutation.mutate();
      } else {
        return toast.error("Unable to delete modpack");
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
      <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path>
    </svg>
    Delete
  </button>
  )
}

export default DeleteModpackBtn