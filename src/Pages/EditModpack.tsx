import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";

export interface AddModpackProps {
  modpackName: string;
  modpackDescription: string;
  modpackImage: File | undefined;
  modpackColor: string;
  modpackSuggestor: string;
}

const EditModpack = () => {
  //    edit the modpack data from packDetails using a mutation and queryClient to invalidate the cache and update the data on the page without a refresh
  // fetch the data from the server using the modpackName from the url
  const { modpackId: id } = useParams();
  const modpackId = id as string;
  const { data: packDetails } = usePackDetailData(modpackId);

  const [modpackName, setModpackName] = React.useState<string>(
    packDetails?.name
  );
  const [modpackDescription, setModpackDescription] = React.useState<string>(
    packDetails?.description
  );
  const [modpackImage, setModpackImage] = React.useState<File>();
  const [modpackColor, setModpackColor] = React.useState<string>(
    packDetails?.color
  );
  const [modpackSuggestor, setModpackSuggestor] = React.useState<string>(
    packDetails?.suggestedBy
  );

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
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const queryClient = useQueryClient();
  const editModpackMutation = useMutation(
    ({
      modpackName,
      modpackDescription,
      modpackImage,
      modpackColor,
      modpackSuggestor,
    }: AddModpackProps) =>
      axios.post(
        `${apiBase}/api/edit-modpack/`,
        {
         name: modpackName,
         description: modpackDescription,
         image: modpackImage,
         color: modpackColor,
         suggestor: modpackSuggestor,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      ),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["details", modpackId]);
      },
      onSuccess: () => {
        toast.success("Modpack Added!");
      },
      onError: (error) => {
        toast.error(`Couldn't add modpack: ${error}`);
      },
    }
  );

  const fileSelectedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setModpackImage(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Title of the form, centered */}
      <div className="flex items-center justify-center">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">Edit </h1>
      </div>
      <form
        method="post"
        className="grid items-center justify-center gap-4 pt-[.5em] text-sm placeholder:text-slate-400  dark:text-bg xl:text-base"
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (editModpackMutation.isLoading) return;

          editModpackMutation.mutate({
            modpackName,
            modpackDescription,
            modpackImage,
            modpackColor,
            modpackSuggestor,
          });
        }}
      >
        {/* Modpack name field, single line. */}
        <input
          required
          className={` h-8 rounded-md border-2  border-${packDetails?.color}-500 px-3 py-1`}
          type="text"
          placeholder="Modpack Name"
          value={modpackName}
          onChange={(e) => setModpackName(e.target.value)}
        />

        {/* Modpack description field, multi line. */}
        {/* In order to make the modpack field multi line, we need to use a textarea instead of an input. */}
        <textarea
          className={` min-h-[100px] rounded-md border-2   border-${packDetails?.color}-500 w-96 px-3 py-1 out-of-range:border-red-500 `}
          placeholder="Modpack Description"
          value={modpackDescription}
          required
          onChange={(e) => {
            const newLength = e.target.value?.length;
            if (newLength >= 0 && newLength <= 500) {
              return setModpackDescription(e.target.value);
            }
            toast.error("Too many characters");
          }}
        />
        {/* Adds a character counter to the description field */}
        <div className="-mt-2 flex items-center justify-center dark:text-text">
          <p>{modpackDescription?.length}/500</p>
        </div>

        {/*Color selection*/}
        <select
          className={` h-8 rounded-md border-2  dark:text-bg border-${packDetails?.color}-500 bg-${packDetails?.color}-300 px-3 py-1 font-Tilt `}
          value={modpackColor}
          onChange={(e) => setModpackColor(e.target.value)}
        >
          <option
            disabled
            value={packDetails?.color}
            selected
            className="capitalized"
          >
            {packDetails?.color}
          </option>
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

        <p className="-mb-2 dark:text-text">Modpack Image</p>
        <input
          required
          name="modpack__image--input"
          className={`cursor-pointer rounded-md border-2 file:placeholder:text-slate-400 dark:text-text border-${packDetails?.color}-500 h-8 w-full px-3 py-1`}
          type="file"
          onChange={fileSelectedHandler}
        />

        <label
          htmlFor="modpack__image--input"
          className={`-mt-2 text-sm dark:text-text xl:text-base`}
        >
          {" "}
          (PNG or JPG MAX. 5MB, 640x480px){" "}
        </label>

        {/* Modpack suggestor field, single line. */}
        <input
          className={`h-8 rounded-md border-2   border-${packDetails?.color}-500 px-3 py-1 `}
          type="text"
          placeholder="Modpack Suggestor"
          value={modpackSuggestor}
          onChange={(e) => setModpackSuggestor(e.target.value)}
        />

        <br />

        <button
          className={`h-16  rounded-md border-2 border-black dark:text-bg bg-${packDetails?.color}-500 px-3 py-1 text-sm xl:text-base`}
        >
          Edit Modpack
        </button>
      </form>
    </>
  );
};

export default EditModpack;
