import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { IModpack } from "../Utils/Interfaces";
import { useNavigate } from "react-router-dom";

export interface AddModpackProps {
  name: string;
  description: string;
  image: File | undefined;
  color: string;
  suggestor: string;
}

const AddModpack = () => {
  const [modpackDescription, setModpackDescription] =
    React.useState<string>("");
  const [modpackColor, setModpackColor] = React.useState<string>("sky");

  const colorOptions = [
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "lime", label: "Lime" },
    { value: "green", label: "Green" },
    { value: "teal", label: "Teal" },
    { value: "sky", label: "Sky" },
    { value: "blue", label: "Blue" },
    { value: "violet", label: "Violet" },
    { value: "fuchsia", label: "Fuchsia" },
  ];

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addModpackMutation = useMutation(
    (addModpackBody: AddModpackProps) =>
    toast.promise(
      axios.post(
        `/api/add-modpack`,
        { addModpackBody },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
        ),{
          pending: "Adding Modpack...",
          success: "Modpack Added!",
          error: "Couldn't add modpack",
        }
        ),
        {
      onSuccess: (data) => {
        queryClient.setQueryData(["modpacks"], data.data as IModpack[]);
        queryClient.invalidateQueries(["modpacks"]);
        navigate("/");
      },
      onError: (error: Error) => {
        if (axios.isAxiosError(error)) {
          console.error('error message: ', error.message);
          
        } else {
          console.error('unexpected error: ', error.message);
          toast.error(`Couldn't add modpack: ${error.response?.data.message}`);
          throw new Error(
            "Couldn't fetch Modpack details, please try again later."
          );
        }
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
        className="grid items-center justify-center gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-bg xl:text-base"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (addModpackMutation.isLoading) return;

          const target = e.target as HTMLFormElement;

          addModpackMutation.mutate({
            name: target.name.value,
            description: target.description.value,
            color: target.color.value,
            suggestor: target.suggestor.value,
            image: target.image.files[0],
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
            toast.error("Too many characters");
          }}
        />
        {/* Adds a character counter to the description field */}
        <div className="-mt-2 flex items-center justify-center dark:text-text">
          <p>{modpackDescription.length}/500</p>
        </div>

        {/*Color selection*/}
        <select
          className={` h-8 rounded-md border-2  dark:text-bg border-${borderColor}-500 bg-${borderColor}-300 px-3 py-1 font-Tilt `}
          name="color"
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

        <p className="-mb-2 dark:text-text">Image</p>
        <input
          required
          name="image"
          className={`cursor-pointer rounded-md border-2 file:placeholder:text-slate-400 dark:text-text border-${borderColor}-500 h-8 w-full px-3 py-1`}
          type="file"
        />

        <label
          htmlFor="image"
          className={`-mt-2 text-sm dark:text-text xl:text-base`}
        >
          {" "}
          (PNG or JPG MAX. 5MB, 640x480px){" "}
        </label>

        {/* Modpack suggestor field, single line. */}
        <input
          className={`h-8 rounded-md border-2   border-${borderColor}-500 px-3 py-1 `}
          type="text"
          placeholder="Modpack Suggestor"
          name="suggestor"
        />

        <br />

        <button
          className={`h-16  rounded-md border-2 border-black dark:text-bg bg-${borderColor}-500 px-3 py-1 text-sm xl:text-base`}
          disabled={addModpackMutation.isLoading}
        >
          {addModpackMutation.isLoading ? "Adding Modpack" : "Add Modpack"}
        </button>
      </form>
    </>
  );
};

export default AddModpack;
