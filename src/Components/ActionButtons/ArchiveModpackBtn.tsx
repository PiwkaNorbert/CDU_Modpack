import axios from "axios";
import { toast } from "react-toastify";
import { apiBase } from "../../Constants";
import { useMutation } from "@tanstack/react-query";
import { errorHandling } from "../../Helper/errorHandling";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IModpack } from "../../Utils/Interfaces";

const ArchiveModpackBtn = ({modpackId}: {modpackId: string}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const archiveModpack = async () =>
  await axios.post(
    `${apiBase}/api/archive-modpack`,
    { modpackId },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const archiveModpackMutation = useMutation(archiveModpack, {
    onSuccess: ({ data }) => {
      
      const { message } = data;
      toast.success(`${message}! 👌`);

      queryClient.setQueryData(["modpacks", "archived"], (oldData) => {
        const newData = oldData as IModpack[];
        return newData.filter(
          (modpack: IModpack) => modpack.modpackId !== modpackId
        );
      });
        return navigate("/list-archived-modpacks");
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        "modpacks",
        "pack-details",
        "suggested",
        "archived",
        modpackId,
      ]);
    },
  });


  return (
    <button
      disabled={archiveModpackMutation.isLoading}
      className="hover:bg-text-1/10 active:bg-text-1/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-orange-500 transition-all sm:w-fit sm:justify-normal "
      onClick={async () => {
        if (archiveModpackMutation.isLoading) return;
        if (
          confirm(
            "Are you sure you want to Archive this modpack?\n'OK' to confirm"
          )
        ) {
          archiveModpackMutation.mutate();
        } else {
          return toast.error("Unable to Archive modpack");
        }
      }}
    >
      {archiveModpackMutation.isLoading ? (
        "Archiving Modpack..."
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm-72,96H104a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm72-56H32V64H224V88Z"></path>
          </svg>
          Archive
        </>
      )}
    </button>
  )
}

export default ArchiveModpackBtn