import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { errorHandling } from "../../Helper/errorHandling";
import { IAddImageProps, IPackDetails } from "../../Utils/Interfaces";
import { apiBase, bgColorVariants, borderColorVariants } from "../../Constants";

const AddImage = ({ path, color }: { path: string; color: string }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
        queryClient.invalidateQueries(["modpacks, details", modpackId]);

      },
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSuccess: ({data}) => {
        queryClient.setQueryData(["details", modpackId], (oldData) => {
          const oldPackDetails = oldData as IPackDetails;
          // inject the new gallery images into the cached data
          return {
            ...oldPackDetails,
            galleryImages: data.modpack.galleryImages,
          };  
        });  
        if (path === "edit") return navigate(`/edit-modpack/${modpackId}`);
        return navigate("/");
      },
    }
  );

  return (
    <div className="mx-auto">
      {/* Title of the form, centered */}
      <h1 className="m-3 mt-5 text-2xl xl:text-3xl">
        Add Image/s to your Modpack
      </h1>
      <form
        className="mb-8 grid gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-bg xl:text-base"
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
        <input
          required
          name="image"
          className={`h-8 w-full cursor-pointer rounded-md border-2 px-3 py-1 file:placeholder:text-slate-400 dark:text-text ${borderColorVariants[color]}`}
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
          className={`  rounded-md border-2 border-black  px-3 py-1 text-sm hover:bg-opacity-80 disabled:bg-slate-600 dark:text-bg xl:text-base ${bgColorVariants[color]}`}
          disabled={addImageMutation.isLoading}
          type="submit"
        >
          {addImageMutation.isLoading ? "Adding Image..." : "Add Image"}
        </button>
      </form>
    </div>
  );
};

export default AddImage;
