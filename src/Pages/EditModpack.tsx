import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { useNavigate, Link } from "react-router-dom";
import { AddModpackProps } from "../Utils/Interfaces";
import {tagOptions, colorOptions} from "../Helper/modifyModpack"



const EditModpack = () => {
  //    edit the modpack data from packDetails using a mutation and queryClient to invalidate the cache and update the data on the page without a refresh
  // fetch the data from the server using the modpackName from the url
  const { modpackId: id } = useParams();
  const modpackId = id as string;
  const [modpackTags, setModpackTags] = React.useState<string[]>([]);

  const { data, isLoading, isError }= usePackDetailData(modpackId)
  const [borderColor, setBorderColor] = React.useState();

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const editModpackMutation = useMutation(
    ({ name, description,tags, color, suggestor, officialUrl }: AddModpackProps) =>
      toast.promise(
        axios.post(
          `${apiBase}/api/edit-modpack`,
          {
            modpackId,
            name,
            description,
            tags,
            color,
            suggestor,
            officialUrl
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        ),
        {
          pending: "Editing Modpack...",
        }
      ),
    {
      onSuccess: ({data}) => {
        queryClient.setQueryData(["modpacks","details", modpackId], data.modpack)
        toast.success(data.message);
        return window.location.pathname = (`/pack-details/${modpackId}`);
      },
      onError: (error: Error) => {
        if (axios.isAxiosError(error)) {
          console.error("error message: ", error.message);
          return toast.error(error.response?.data.message);
        } else {
          console.error("unexpected error: ", error.message);
          // toast.error(`Couldn't add modpack: ${error.response?.data.message}`);
          toast.error(error.response?.data.message);

          throw new Error(
            "Couldn't fetch Modpack details, please try again later."
          );
        }
      },onSettled: () => {
        queryClient.invalidateQueries(["modpacks","details", modpackId]);
      },
    }
  );
  
  if(isLoading) return (
      <div className="flex h-full items-center justify-center">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">Loading...</h1>
      </div> )

      const getBorderColor = () => {
        return borderColor ? borderColor : data?.color ? data?.color : "sky";
      }


  return (
    <>
    {/* backarrow to the root page */}
    <div className="lg:mx-auto flex pt-4  lg:min-w-[900px] lg:max-w-[900px]">
      <Link to={`/pack-details/${modpackId}`}
        className="flex min-w-min ml-4 mr-auto cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-8 w-8 text-${borderColor}-500`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <p className={` text-${borderColor}-500`}>Cancel</p>
      </Link>
    </div>


      {/* Title of the form, centered */}
      <div className="flex items-center justify-center">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">Edit</h1>
      </div>

      <form
        className="grid items-center justify-center gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-bg xl:text-base"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (editModpackMutation.isLoading) return;

          const target = e.target as HTMLFormElement;

          editModpackMutation.mutate({
            name: target.name.value,
            description: target.description.value,
            tags: modpackTags,
            color: target.color.value,
            suggestor: target.suggestor.value,
            officialUrl: target.officialUrl.value
          });
        }}
      >
        {/* Modpack name field, single line. */}
        <input
          className={` h-8 rounded-md border-2  border-${getBorderColor()}-500 px-3 py-1`}
          type="text"
          placeholder="Name"
          name="name"
          defaultValue={data?.name}
        />

        {/* Modpack description field, multi line. */}
        {/* In order to make the modpack field multi line, we need to use a textarea instead of an input. */}
        <textarea
          className={` min-h-[100px] rounded-md border-2 h-40   border-${getBorderColor()}-500 w-96 px-3 py-1 out-of-range:border-red-500 `}
          placeholder="Modpack Description"
          defaultValue={data?.description}
          name="description"
          maxLength={500}
          minLength={0}
         
        />
         {/* Tag selector */}
         <select
          className={`  rounded-md border-2  dark:text-bg border-${borderColor}-500 bg-${borderColor}-300 px-3 py-1 font-Tilt `}
          name="tags"
          multiple
          onChange={(e) => {
             listOfTags = Array.from(
              e.target.selectedOptions,
              (option) => option.value
            );
             setModpackTags(listOfTags);
             console.log(modpackTags);
             

          }}
        >
          {tagOptions.map((tagOption, index) => (
            <option
              key={index}
              value={tagOption.value}
              className={`hover:bg-${tagOption?.value}-500`}
            >
              {tagOption.label}
            </option>
          ))}
        </select>


        {/*Color selection*/}
        <select
          className={` h-8 rounded-md border-2  dark:text-bg border-${getBorderColor()}-500 bg-${getBorderColor()}-300 px-3 py-1 font-Tilt `}
          name="color"
          defaultValue={data?.color}
          onChange={(e) => {
            setBorderColor(e.target.value)
          }}
        >
          {colorOptions.map((colorOption, index) => (
            <option
              key={index}
              value={colorOption.value}
              className={`hover:bg-${colorOption?.value}-500`}
            >
              {colorOption.label}
            </option>
          ))}
        </select>

        <p className="-mb-2 dark:text-text">Image</p>
        {/* <input
          name="image"
          className={`cursor-pointer rounded-md border-2 file:placeholder:text-slate-400 dark:text-text border-${getBorderColor()}-500 h-8 w-full px-3 py-1`}
          type="file"
        /> */}

        <label
          htmlFor="image"
          className={`-mt-2 text-sm dark:text-text xl:text-base`}
        >
          {" "}
          (PNG or JPG MAX. 5MB, 640x480px){" "}
        </label>
        <input
          required
          className={` h-8 rounded-md border-2  border-${getBorderColor()}-500 px-3 py-1`}
          type="text"
          placeholder="Official URL"
          name="officialUrl"
          defaultValue={data?.officialUrl}
        />
        {/* Modpack suggestor field, single line. */}
        <input
          className={`h-8 rounded-md border-2   border-${getBorderColor()}-500 px-3 py-1 `}
          type="text"
          placeholder="Modpack Suggestor"
          name="suggestor"
          defaultValue={data?.suggestedBy}
        />

        <br />

        <button
          className={`h-16 rounded-md border-2 border-black hover:bg-opacity-80  disabled:bg-slate-600 dark:text-bg bg-${getBorderColor()}-500 px-3 py-1 text-sm xl:text-base`}
          disabled={editModpackMutation.isLoading}
        >
          {editModpackMutation.isLoading ? "Editing Modpack" : "Edit Modpack"}
        </button>
      </form>
    </>
  );
};

export default EditModpack;
