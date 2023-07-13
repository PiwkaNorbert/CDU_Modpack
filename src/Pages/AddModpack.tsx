import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AddModpackProps } from "../Utils/Interfaces";
import { tagOptions, colorOptions } from "../Helper/modifyModpack";

const AddModpack = () => {
  const [modpackDescription, setModpackDescription] =
    React.useState<string>("");
  const [modpackColor, setModpackColor] = React.useState<string>("sky");
  const [modpackTags, setModpackTags] = React.useState<string[]>([]);

  let listOfTags = [] as string[];

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addModpackMutation = useMutation(
    ({
      name,
      description,
      tags,
      color,
      suggestor,
      officialUrl,
    }: AddModpackProps) =>
      toast.promise(
        axios.post(
          `/api/add-modpack`,
          {
            name,
            description,
            tags,
            color,
            suggestor,
            officialUrl,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        ),
        {
          pending: "Adding Modpack...",
          success: "Modpack Added!",
          error: "Couldn't add modpack",
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

  const borderColor = modpackColor || "sky";

  return (
    <>
      {/* backarrow to the root page */}
      <div className="flex pt-4 lg:mx-auto  lg:min-w-[900px] lg:max-w-[900px]">
        <Link
          to="/"
          className="ml-4 mr-auto flex min-w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
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
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">
          Create a new CDU Modpack Listing!
        </h1>
      </div>
      <form
        className="grid items-center justify-center gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-bg xl:text-base"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (addModpackMutation.isLoading) return;

          const target = e.target as HTMLFormElement;

          addModpackMutation.mutate({
            name: target.name.value,
            description: target.description.value,
            tags: modpackTags,
            color: target.color.value,
            suggestor: target.suggestor.value,
            officialUrl: target.officialUrl.value,
            // image: target.image.files[0],
          });
        }}
      >
        {/* Modpack name field, single line. */}
        <input
          required
          className={` h-8 rounded-md border-2  border-${borderColor}-500 px-3 py-1`}
          type="text"
          placeholder="Name"
          name="name"
        />

        {/* Modpack description field, multi line. */}
        {/* In order to make the modpack field multi line, we need to use a textarea instead of an input. */}
        <textarea
          className={` min-h-[100px] rounded-md border-2   border-${borderColor}-500 w-96 px-3 py-1 out-of-range:border-red-500 `}
          placeholder="Modpack Description"
          value={modpackDescription}
          name="description"
          required
          onChange={(e) => {
            const newLength = e.target.value.length;
            if (newLength >= 0 && newLength <= 500) {
              return setModpackDescription(e.target.value);
            }
            toast.error("Too many characters!", {
              toastId: "too-many-characters",
            });
          }}
        />
        {/* Adds a character counter to the description field */}
        <div className="-mt-2 flex items-center justify-center dark:text-text">
          <p>{modpackDescription.length}/500</p>
        </div>
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
          className={` h-8 rounded-md border-2  dark:text-bg border-${borderColor}-500 bg-${borderColor}-300 px-3 py-1 font-Tilt `}
          name="color"
          defaultValue="Sky"
          onChange={(e) => {
            setModpackColor(e.target.value);
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

        {/* <p className="-mb-2 dark:text-text">Image</p> */}
        {/* <input
          required
          name="image"
          className={`cursor-pointer rounded-md border-2 file:placeholder:text-slate-400 dark:text-text border-${borderColor}-500 h-8 w-full px-3 py-1`}
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
          className={` h-8 rounded-md border-2  border-${borderColor}-500 px-3 py-1`}
          type="text"
          placeholder="Official URL"
          name="officialUrl"
        />
        {/* Modpack suggestor field, single line. */}
        <input
          className={`h-8 rounded-md border-2   border-${borderColor}-500 px-3 py-1 `}
          type="text"
          placeholder="Modpack Suggestor"
          name="suggestor"
        />

        <br />

        <button
          className={`h-16 rounded-md border-2 border-black hover:bg-opacity-80 disabled:bg-slate-600 dark:text-bg bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
          disabled={addModpackMutation.isLoading}
        >
          {addModpackMutation.isLoading ? "Adding Modpack" : "Add Modpack"}
        </button>
      </form>
    </>
  );
};

export default AddModpack;
