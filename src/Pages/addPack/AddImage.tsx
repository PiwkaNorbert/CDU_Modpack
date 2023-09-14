import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandling } from "../../Helper/errorHandling";
import { IAddImageProps } from "../../Utils/Interfaces";

const AddImage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";
  const { modpackId } = useParams();

  const addImageMutation = useMutation(
    ({ images, modpackId }: IAddImageProps) =>
      axios.post(
        `${apiBase}/api/add_pack_image`,
        {
          images,
          modpackId,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks"]);
      },
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSuccess: () => {
        return navigate("/");
      },
    }
  );

  return (
    <>
      {/* Title of the form, centered */}
      <div className="flex items-center  justify-center">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">
          Add Image/s to your Modpack
        </h1>
      </div>
      <form
        className="mb-8 grid items-center justify-center gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-bg xl:text-base"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (addImageMutation.isLoading) return;

          const target = e.target as HTMLFormElement;

          addImageMutation.mutate({
            images: target.image.files,
            modpackId,
          });
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

export default AddImage;
