import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddModpackProps } from "../../Utils/Interfaces";
import { tagOptions, colorOptions } from "../../Helper/modifyModpack";
import SuggestedByUserSearch from "../../Components/SuggestedByUserSearch";
export const CreateModpack = () => {
  const [modpackDescription, setModpackDescription] =
    React.useState<string>("");
  const [modpackColor, setModpackColor] = React.useState<string>("sky");
  const [modpackTags, setModpackTags] = React.useState<string[]>([]);

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";


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
      axios.post(
        `${apiBase}/api/add-modpack`,
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
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks"]);
      },
      onError: (response: any) => {
        console.log(response);

        toast.error(response?.data.error);

        throw new Error(
          response?.data.error
            ? response?.data.error
            : "Couldn't add modpack, please try again later."
        );
      },
      onSuccess: (response) => {
        return navigate(`/add-modpack/photos/${response.data.modpackId}`);
      },
    }
  );

  const borderColor = modpackColor || "sky";

  return (
    <>
      {/* Title of the form, centered */}
      <div className="flex items-center justify-center">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">
          Create a new CDU Modpack Listing!
        </h1>
      </div>
      <form
        className="grid items-center justify-center gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-text xl:text-base"
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
        {/* A Tag selector that has pill shaped containers from tagOptions that when clicked once it pushes the tagoptions value to listOfTags and if clicked again it removes the tagoptions value from listOfTags and if the value is in the listOfTags it gets a checkmark on the left handside of the text */}
        <div className=" mb-4 w-96">
          <div className=" flex flex-wrap justify-center gap-2">
            {tagOptions.map((tagOption, index) => (
              <button
                type="button"
                key={index}
                className={`  ${
                  modpackTags.includes(tagOption.value)
                    ? `bg-${borderColor}-400 text-bg dark:text-bg `
                    : `bg-slate-700 text-text`
                }  flex items-center justify-center rounded-full px-3 py-1 text-sm hover:bg-opacity-80 transition-colors duration-200 ease-in-out `}
                onClick={() => {
                  if (modpackTags.includes(tagOption.value)) {
                    setModpackTags(
                      modpackTags.filter((tag) => tag !== tagOption.value)
                    );
                  } else {
                    setModpackTags([...modpackTags, tagOption.value]);
                  }
                }}
              >
                {tagOption.label}
              </button>
            ))}
          </div>
        </div>

        {/*Color selection*/}
        <select
          className={` h-8 rounded-md border-2 cursor-pointer  dark:text-bg border-${borderColor}-500 bg-${borderColor}-300 px-3 py-1 font-Tilt `}
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
       <SuggestedByUserSearch  />

        <button
          className={` h-10 rounded-md border-2 border-black hover:bg-opacity-80 disabled:bg-slate-600 bg-${borderColor}-500 px-3 py-1  text-sm dark:text-bg xl:text-base`}
          disabled={addModpackMutation.isLoading}
          type="submit"
        >
          {addModpackMutation.isLoading ? "Adding Modpack" : "Add Modpack"}
        </button>
      </form>
    </>
  );
};
