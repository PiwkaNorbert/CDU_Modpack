import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { apiBase } from "../../Constants";
import { errorHandling } from "../../Helper/errorHandling";

const PublishModpackBtn = ({modpackId}: {modpackId: string}) => {
  const queryClient = useQueryClient();

  const publishModpackMutation = useMutation(
    () =>
      axios.post(
        `${apiBase}/api/publish-modpack`,
        { modpackId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ),
    {
      onSuccess: ({ data }) => {
        queryClient.setQueryData(
          ["modpacks", "pack-details", modpackId],
          data.modpack
        );
        toast.success(data.message);

        return (window.location.pathname = `/pack-details/${modpackId}`);
      },
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks", "pack-details", modpackId]);
      },
    }
  );

  return (
    <button
      className="hover:bg-text-1/10 active:bg-text-1/20 mx-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-blue-500 transition-all h sm:w-fit sm:justify-normal"
      disabled={publishModpackMutation.isLoading}
      onClick={async () => {
        if (publishModpackMutation.isLoading) return;
        if (
          confirm(
            "Are you sure you want to Publish this modpack?\n'OK' to confirm"
          )
        ) {
          publishModpackMutation.mutate();
        } else {
          return toast.error("Unable to Publish modpack");
        }
      }}
    >
      {publishModpackMutation.isLoading ? (
        "Publishing Modpack..."
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 "
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3,37.28l84.32,40,40,84.32a19.81,19.81,0,0,0,18,11.44c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM157,220.92l-33.72-71.19,45.25-45.25a12,12,0,0,0-17-17l-45.25,45.25L35.08,99,210,46Z"></path>
          </svg>
          Publish
        </>
      )}
    </button>
  )
}

export default PublishModpackBtn