import React, { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { AddModpackProps } from "../Utils/Interfaces";
import { tagOptions, colorOptions } from "../Helper/modifyModpack";
import { errorHandling } from "../Helper/errorHandling";
import { ImageCarousel } from "../Components/ImageCarousel";
import { twMerge } from "tailwind-merge";
import {
  apiBase,
  bgColorVariants,
  borderColorVariants,
  textColorVariants,
} from "../Constants";
import AddImage from "./SuggestPack/AddImage";
import Loading from "../Components/Loading";
import useMCVersionData from "../API/useMCVersionData";
import { DebounceInput } from "react-debounce-input";

const EditModpack = () => {
  // fetch the data from the server using the modpackName from the url
  const { modpackId: id } = useParams();
  const modpackId = id as string;
  const [modpackColor, setModpackColor] = useState<string>("sky");
  const [modpackTags, setModpackTags] = useState<string[]>([]);
  const [modpackVersion, setModpackVersion] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [description, setDescription] = useState<string>("");

  const { data, isLoading, isError, error } = usePackDetailData(modpackId);
  const { useMCVersionQuery, setVersionFilterByInput, versionFilterByInput } =
    useMCVersionData();
  const {
    data: mcVerData,
    isLoading: isLoadingMcVer,
    error: errorMcVer,
    isError: isErrorMcVer,
    fetchStatus,
  } = useMCVersionQuery;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editModpackMutation = useMutation(
    ({
      name,
      description,
      tags,
      color,
      suggestor,
      officialUrl,
      minecraftVersion,
    }: AddModpackProps) =>
      axios.post(
        `${apiBase}/api/edit-modpack`,
        {
          modpackId,
          name,
          description,
          tags,
          color,
          suggestor,
          officialUrl,
          minecraftVersion,
        },
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
  function getDropdownItems() {
    if (
      versionFilterByInput.length === 1 &&
      versionFilterByInput[0] === modpackVersion
    )
      return false;
    return true;
  }

  useEffect(() => {
    if (data?.tags) {
      setModpackTags(data?.tags);
      setModpackColor(data?.color);
    }
  }, [data?.tags, data?.color]);

  if (isLoading) return <Loading size="la-lx" fullScreen={true} other="" />;
  if (isError)
    return (
      <div className="flex h-full items-center justify-center text-text-1">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">{error.message}</h1>
      </div>
    );
  if (!data)
    return (
      <div className="flex h-full items-center justify-center text-text-1">
        <h1 className="m-3 mt-5 text-2xl xl:text-3xl">Modpack not found</h1>
      </div>
    );

  const borderColor = modpackColor || "sky";

  return (
    <section
      id="modpack__addpack"
      className="z-[5] grid h-full w-full flex-1 justify-normal text-text-1 lg:mx-auto  lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px]  "
    >
      <div className="relative h-min border-t-2 bg-card pb-4 dark:border-none dark:shadow md:mb-4 md:rounded-md md:border-none md:shadow-xl">
        <div className={`z-10 grid h-full items-center lg:rounded-md`}>
          <div className="z-10 mb-6 flex flex-col justify-between gap-2 px-8 pt-4 max-[350px]:mb-0 sm:gap-0 md:grid md:grid-cols-3 md:px-4">
            <div
              className={`ml-4 mr-auto flex min-w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1 hover:bg-sec/20  dark:hover:bg-hover-2 ${
                textColorVariants[data?.color]
              } `}
              onClick={() => {
                navigate(-1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 `}
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
              <p>Cancel</p>
            </div>
          </div>

          {/* Title of the form, centered */}
          <div className="flex items-center justify-center">
            <h1 className="m-3 mt-5 text-2xl xl:text-3xl">Edit</h1>
          </div>
          <div className="mx-auto grid max-w-min items-center justify-center">
            <div className="flex py-[1em]">
              {data.galleryImages.length > 0 && (
                <ImageCarousel
                  galleryImages={data?.galleryImages ?? []}
                  color={data?.color ?? "sky"}
                />
              )}
            </div>
            <div className="py-[1em]">
              <AddImage color={data?.color} path="edit" />
            </div>

            <form
              className="grid gap-4 pt-[.5em] text-sm text-text-1 placeholder:text-slate-400 xl:text-base"
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                if (editModpackMutation.isLoading) return;

                const target = e.target as HTMLFormElement & {
                  name: { value: string };
                  color: { value: string };
                  suggestor: { value: string };
                  officialUrl: { value: string };
                };

                editModpackMutation.mutate({
                  name: target.name.value,
                  description: description,
                  tags: modpackTags,
                  color: target.color.value,
                  suggestor: target.suggestor.value,
                  officialUrl: target.officialUrl.value,
                });
              }}
            >
              {/* Modpack name field, single line. */}
              <input
                className={`h-8 rounded-md border bg-bg px-3 py-1 ${
                  borderColorVariants[data?.color]
                } `}
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={data?.name}
              />

              {/* Modpack description field, multi line. */}
              {/* In order to make the modpack field multi line, we need to use a textarea instead of an input. */}
              <textarea
                className={`h-40 min-h-[100px] w-96 rounded-md border bg-bg px-3 py-1 out-of-range:border-red-500 ${
                  borderColorVariants[data?.color]
                }  `}
                placeholder="Modpack Description"
                defaultValue={data?.description}
                name="description"
                maxLength={500}
                minLength={0}
                onChange={(e) => setDescription(e.target.value)}
              />
              {/* Tag selector */}
              <div className="mb-4 w-96">
                <div className="flex flex-wrap justify-center gap-2 text-text-1 ">
                  {tagOptions.map((tagOption, index) => (
                    <button
                      type="button"
                      key={index}
                      className={twMerge(
                        "flex items-center justify-center rounded-full px-3 py-1 text-sm transition-all hover:bg-opacity-80",
                        (data?.tags?.includes(tagOption.value) ||
                          modpackTags.includes(tagOption.value)) &&
                          modpackTags.includes(tagOption.value)
                          ? `${bgColorVariants[data?.color]} text-bg`
                          : `bg-slate-300  dark:bg-slate-700 `
                      )}
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
              <div className="relative">
                <div className="relative inset-y-0 left-0 flex h-8 w-full items-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="pointer-events-none absolute inset-y-0 my-auto h-full left-0 ml-2 flex  w-5 items-center"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>

                  <DebounceInput
                    className="spacer-left h-8 w-full rounded-md border bg-bg py-1 pr-3 focus:border-transparent focus:outline-none focus:ring-0 active:border-none active:outline-none "
                    type="text"
                    placeholder="Select minecraft version"
                    name="minecraftVersion"
                    minLength={1}
                    debounceTimeout={500}
                    value={modpackVersion}
                    onChange={(e: { target: { value: string } }) => {
                      // if the the input is empty return
                      if (!e.target.value) return;
                      setVersionFilterByInput([e.target.value]);
                      setModpackVersion(e.target.value);
                    }}
                    onFocus={() => setIsInputTouched(true)}
                    onBlur={() =>
                      setTimeout(() => setIsInputTouched(false), 100)
                    }
                    autoComplete="off"
                    required
                  />
                </div>
                {/* create a dropdown menu with max of 5 results from the data that the user can select */}
                <div className="relative max-h-[100px] w-full  overflow-y-scroll ">
                  {fetchStatus === "idle" && isLoadingMcVer === true ? (
                    <Loading />
                  ) : isErrorMcVer ? (
                    <p>{errorMcVer.message}</p>
                  ) : getDropdownItems() === false &&
                    isInputTouched === true ? (
                    <div className="absolute mt-1 h-24 w-24  rounded-md bg-bg  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <ul
                        className=" py-1 empty:hidden"
                        style={{ overflowY: "auto", maxHeight: "16rem" }}
                      >
                        {/* make a list element that on click changes the search value into the set value */}
                        {mcVerData &&
                          mcVerData.map((version) => {
                            const index = version.name
                              .toLowerCase()
                              .indexOf(modpackVersion.toLowerCase());
                            const beforeStr = version.name.slice(0, index);
                            const matchStr = version.name.slice(
                              index,
                              index + modpackVersion.length
                            );
                            const afterStr = version.name.slice(
                              index + modpackVersion.length
                            );
                            return (
                              <li
                                key={version.id}
                                className="relative cursor-pointer select-none py-2 pl-3 pr-9  text-text-1/[.75] hover:bg-sec/20 "
                                onClick={() => {
                                  setModpackVersion(version.name);
                                  setVersionFilterByInput([version.name]);
                                }}
                              >
                                <div className="flex items-center justify-center gap-2 tracking-widest">
                                  <span className="truncate  tracking-widest">
                                    {beforeStr}
                                    <span className=" font-normal tracking-widest text-text-1">
                                      {matchStr}
                                    </span>
                                    {afterStr}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/*Color selection*/}
              <select
                className={`h-8 rounded-md border px-3 py-1 font-Tilt dark:text-bg
                border-${borderColor}-500 bg-${borderColor}-400`}
                name="color"
                defaultValue={data?.color}
                onChange={(e) => {
                  setModpackColor(e.target.value);
                }}
              >
                {colorOptions.map((colorOption, index) => (
                  <option
                    key={index}
                    value={colorOption.value}
                    className={`hover:${bgColorVariants[data?.color]}`}
                  >
                    {colorOption.label}
                  </option>
                ))}
              </select>

              <p className="-mb-2 ">Image</p>
              {/* <input
              name="image"
              className={`cursor-pointer rounded-md border file:placeholder:text-slate-400  border-${borderColor}-500 h-8 w-full px-3 py-1`}
              type="file"
            /> */}

              <label htmlFor="image" className={`-mt-2 text-sm xl:text-base`}>
                (PNG or JPG MAX. 5MB, 640x480px)
              </label>
              <input
                required
                className={`h-8 rounded-md border bg-bg px-3 py-1 ${
                  borderColorVariants[data?.color]
                } `}
                type="text"
                placeholder="Official URL"
                name="officialUrl"
                defaultValue={data?.officialUrl}
              />
              {/* Modpack suggestor field, single line. */}
              <input
                className={`h-8 rounded-md border bg-bg px-3 py-1 ${
                  borderColorVariants[data?.color]
                } `}
                type="text"
                placeholder="Modpack Suggestor"
                name="suggestor"
                defaultValue={data?.suggestedBy}
              />
              <br />

              <button
                className={`group h-16 rounded-md border px-3 py-1 text-base hover:bg-opacity-90 disabled:bg-slate-600 dark:text-bg dark:hover:bg-opacity-90 ${
                  borderColorVariants[data?.color]
                }  ${bgColorVariants[data?.color]}
              `}
                disabled={editModpackMutation.isLoading}
              >
                <span className="flex items-center justify-center gap-2 group-hover:scale-105">
                  {editModpackMutation.isLoading ? (
                    "Editing Modpack..."
                  ) : (
                    <>
                      <span>Edit Modpack!</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 "
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3,37.28l84.32,40,40,84.32a19.81,19.81,0,0,0,18,11.44c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM157,220.92l-33.72-71.19,45.25-45.25a12,12,0,0,0-17-17l-45.25,45.25L35.08,99,210,46Z"></path>
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>

          <div className="absolute inset-0 -z-10 h-full w-full flex-1 bg-sec opacity-20"></div>
        </div>
      </div>
    </section>
  );
};

export default EditModpack;
