import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddModpackProps } from "../../Utils/Interfaces";

const AddModpackPhotos = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const addImageMutation = useMutation(
    (body: AddModpackProps) =>
      toast.promise(
        axios.post(
          `${apiBase}/api/add-modpack`,
          {
            body,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        ),
        {
          pending: "Adding Image...",
          success: "Image Added!",
          error: "Couldn't add Image",
        }
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks"]);
      },
      onError: (error: Error) => {
        if (axios.isAxiosError(error)) {
          console.error("error message: ", error.message);
        } else {
          console.error("unexpected error: ", error.message);
          // toast.error(`Couldn't add modpack: ${error.response?.data.message}`);
          toast.error(error.response?.data.message);

          throw new Error(
            "Couldn't fetch Modpack details, please try again later."
          );
        }
      },
      onSuccess: () => {
        return navigate("/");
      },
    }
  );

  return (
    <>
      {/* Title of the form, centered */}
      <div className="flex items-center justify-center">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">
          Add Image/s to your Modpack
        </h1>
      </div>
      <form
        className="grid items-center justify-center gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-bg xl:text-base"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (addImageMutation.isLoading) return;

          const target = e.target as HTMLFormElement;
          console.log(target.image.files);

          addImageMutation.mutate(target.image.files);
        }}
      >
        <p className="-mb-2 dark:text-text">Image</p>
        <input
          required
          name="image"
          className={`h-8 w-full cursor-pointer rounded-md border-2 border-red-500 px-3 py-1 file:placeholder:text-slate-400 dark:text-text`}
          type="file"
          multiple
        />

        <label
          htmlFor="image"
          className={`-mt-2 text-sm dark:text-text xl:text-base`}
        >
          {" "}
          (PNG or JPG MAX. 5MB, 640x480px){" "}
        </label>

        <button
          className={`  rounded-md border-2 border-black bg-red-500 px-3 py-1 text-sm hover:bg-opacity-80 disabled:bg-slate-600 dark:text-bg xl:text-base `}
          disabled={addImageMutation.isLoading}
          type="submit"
        >
          {addImageMutation.isLoading ? "Adding Modpack" : "Add Modpack"}
        </button>
      </form>
    </>
  );
};

export default AddModpackPhotos;
