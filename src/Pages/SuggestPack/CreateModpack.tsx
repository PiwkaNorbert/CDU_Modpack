import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AddModpackProps } from "../../Utils/Interfaces";
import { tagOptions, colorOptions } from "../../Helper/modifyModpack";
import { errorHandling } from "../../Helper/errorHandling";
import { twJoin, twMerge } from "tailwind-merge";
import { apiBase, borderColorVariants, isDev } from "../../Constants";
import { debounce } from "lodash";
import { DebounceInput } from "react-debounce-input";
import useMCVersionData from "../../API/useMCVersionData";
import Loading from "../../Components/Loading";

export default function CreateModpack() {
  const [modpackDescription, setModpackDescription] = useState<string>("");
  const [modpackColor, setModpackColor] = useState<string>("sky");
  const [modpackTags, setModpackTags] = useState<string[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [modpackName, setModpackName] = useState("");
  const [modpackVersion, setModpackVersion] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { username } = JSON.parse(localStorage.getItem("profileData") || "{}");

  const { useMCVersionQuery, setVersionFilterByInput, versionFilterByInput } =
    useMCVersionData();

  const { data, isLoading, error, isError, fetchStatus } = useMCVersionQuery;

  const re = /^[ a-zA-Z0-9'"._-]{5,50}$/;

  const isNameValid = re.test(modpackName);
  const isTouched = modpackName.length > 0;
  // const isTaken = isValid && !isAvailable && !loading;

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addModpackMutation = useMutation(
    ({
      name,
      description,
      tags,
      color,
      officialUrl,
      minecraftVersion,
    }: AddModpackProps) =>
      axios.post(
        `${apiBase}/api/suggest-modpack`,
        {
          name,
          description,
          tags,
          color,
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
      onSettled: () => {
        queryClient.invalidateQueries([
          "modpacks",
          "suggested-modpacks",
          "archived-modpacks",
        ]);
      },
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSuccess: ({ data }) => {
        queryClient.setQueryData(["suggested-modpacks"], (oldData) => {
          const oldSuggestedModpacks = oldData as AddModpackProps[];

          if (!oldSuggestedModpacks) {
            return [data.modpack];
          }

          return [...oldSuggestedModpacks, data.modpack];
        });

        toast.success("Modpack added!", {
          toastId: "modpack-added",
        });
        return navigate(`/suggest-modpack/photos/${data.modpackId}`, {
          state: { modpackID: data?.modpackId },
        });
      },
    }
  );

  const debouncedCheckAvailability = useRef(
    debounce(checkAvailability, 500)
  ).current;

  function handleModpackNameChange(newModpackName: string) {
    setModpackName(newModpackName);
    // checkAvailability(newModpackName);
    debouncedCheckAvailability(newModpackName);
  }

  async function checkAvailability(modpackName: string) {
    setLoading(true);
    setIsAvailable(false);

    const { data, status } = await axios.post(
      `${apiBase}/api/check-duplicate-modpack-name`,
      { modpackName },
      { withCredentials: true }
    );
    if (status !== 200)
      throw new Error("Error checking modpack name availability");

    setLoading(false);

    if (data.success === true) {
      setIsAvailable(true);
    }
    if (data.success === false) {
      setIsAvailable(false);
    }
  }
  function getDropdownItems() {
    if (
      versionFilterByInput.length === 1 &&
      versionFilterByInput[0] === modpackVersion
    )
      return false;
    return true;
  }

  // make isValid a state to update the button disabled state
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    if (isNameValid && isAvailable && !loading) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isNameValid, isAvailable, loading]);

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
        className="mx-auto mb-8 flex w-96  flex-col flex-wrap justify-center gap-4 pt-[.5em] text-sm text-text-1 placeholder:text-slate-400 xl:text-base"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (
            addModpackMutation.isLoading ||
            !confirm("Are you sure you want to submit this modpack?")
          )
            return;

          const target = e.target as HTMLFormElement & {
            name: { value: string };
            description: { value: string };
            color: { value: string };
            officialUrl: { value: string };
            minecraftVersion: { value: string };
          };

          addModpackMutation.mutate({
            name: target.name.value,
            description: target.description.value,
            tags: modpackTags,
            color: target.color.value,
            officialUrl: target.officialUrl.value,
            minecraftVersion: target.minecraftVersion.value,
          });
        }}
      >
        {/* Modpack name field, single line. */}
        <div className="relative text-gray-500">
          {loading ? (
            <div className="spacer-left-2 absolute inset-y-0 left-0 flex h-8 items-center">
              <div className="la-ball-clip-rotate la-dark la-sm ">
                <div />
              </div>
            </div>
          ) : (
            <div className="absolute inset-y-0 left-0 flex h-8 items-center pl-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
          )}
          <DebounceInput
            required
            className={twJoin(
              `spacer-left mr-10 h-8 w-full rounded-md border bg-bg py-1 pr-3 focus:border-transparent focus:outline-none focus:ring-0 active:border-none active:outline-none `,
              !isNameValid && isTouched && "border-red-500",
              !isValid && isTouched && "border-yellow-500",
              isValid && isTouched && "border-green-500"
            )}
            type="text"
            placeholder="Name"
            name="name"
            minLength={3}
            debounceTimeout={500}
            onChange={(e: { target: { value: string } }) => {
              // if the the input is empty return
              if (!e.target.value) return;
              handleModpackNameChange(e.target.value);
            }}
            autoComplete="off"
          />
        </div>
        <div className="relative w-full items-center gap-2 truncate text-base">
          {loading ? (
            <div className="w-full break-all sm:items-center sm:gap-2">
              Checking availability of @{modpackName}...
            </div>
          ) : !isNameValid ? (
            <p className="text-red-00 text-sm">
              Name must be 5-50 characters long
            </p>
          ) : !isValid ? (
            <p className="text-warning text-sm">
              @{modpackName} is not available
            </p>
          ) : isValid ? (
            <p className="btn btn-success">
              Confirm modpack name @{modpackName}
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Modpack description field, multi line. */}
        {/* In order to make the modpack field multi line, we need to use a textarea instead of an input. */}
        <textarea
          className={`min-h-[100px] rounded-md border bg-bg ${borderColorVariants[borderColor]}  px-3 py-1 out-of-range:border-red-500 `}
          placeholder="Modpack Description"
          value={modpackDescription}
          name="description"
          required
          onChange={(e) => {
            const newLength = e.target.value.length;
            if (newLength >= 0 && newLength <= 1000) {
              return setModpackDescription(e.target.value);
            }
            toast.error("Too many characters!", {
              toastId: "too-many-characters",
            });
          }}
        />
        {/* Adds a character counter to the description field */}
        <div className="t -mt-2 flex items-center justify-center">
          <p>{modpackDescription.length}/1000</p>
        </div>
        {/* A Tag selector that has pill shaped containers from tagOptions that when clicked once it pushes the tagoptions value to listOfTags and if clicked again it removes the tagoptions value from listOfTags and if the value is in the listOfTags it gets a checkmark on the left handside of the text */}
        <div className="mb-4 ">
          <div className="flex flex-wrap justify-center gap-2">
            {tagOptions.map((tagOption, index) => (
              <button
                type="button"
                key={index}
                className={twMerge(
                  "flex items-center justify-center rounded-full px-3 py-1 text-sm transition-all hover:bg-opacity-80",
                  modpackTags.includes(tagOption.value)
                    ? `bg-${borderColor}-500 text-bg dark:text-bg `
                    : `bg-slate-300 text-text-1 dark:bg-slate-700`
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
        {/* minecraft version input data from api */}

        {/* create a search input with auto complete instead of a dropdown with the data from the api and map it to a div with the results so when the user types in the input it will show the results from the api and dont use select or options */}
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
              onBlur={() => setTimeout(() => setIsInputTouched(false), 100)}
              autoComplete="off"
              required
            />
          </div>
          {/* create a dropdown menu with max of 5 results from the data that the user can select */}
          <div className="relative max-h-[100px] w-full  overflow-y-scroll ">
            {fetchStatus === "idle" && isLoading === true ? (
              <Loading />
            ) : isError ? (
              <p>{error.message}</p>
            ) : getDropdownItems() === false && isInputTouched === true ? (
              <div className="absolute mt-1 h-24 w-24  rounded-md bg-bg  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ul
                  className=" py-1 empty:hidden"
                  style={{ overflowY: "auto", maxHeight: "16rem" }}
                >
                  {/* make a list element that on click changes the search value into the set value */}
                  {data &&
                    data.map((version) => {
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
                          className="relative cursor-pointer select-none py-2 pl-3 pr-9  text-text-1/[.75] hover:bg-sec hover:bg-opacity-20 "
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
          className={`h-8 cursor-pointer rounded-md border dark:text-bg ${borderColorVariants[borderColor]}   px-3 py-1 font-Tilt`}
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

        <input
          required
          className={`h-8 rounded-md border bg-bg ${borderColorVariants[borderColor]} px-3 py-1`}
          type="text"
          placeholder="Official URL"
          name="officialUrl"
        />

        {/* Modpack suggestor field, single line. */}
        {/* <SuggestedByUserSearch /> */}
        <div className="grid">
          <label htmlFor="suggestor" className="text-text-1/[.75]">
            Suggested By
          </label>
          <input
            className="h-8 select-none rounded-md bg-bg px-3 py-1 disabled:bg-slate-300 dark:text-bg"
            placeholder="Suggested By"
            name="suggestor"
            type="text"
            value={username}
            disabled
          />
        </div>
        {isDev && (
          <Link
            to={"/suggest-modpack/photos/12312"}
            className="ml-4 flex min-w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1 hover:bg-sec hover:bg-opacity-20 dark:hover:bg-hover-2"
          >
            Test link to photos
          </Link>
        )}

        <button
          className={`h-10 rounded-md border border-black hover:bg-opacity-80 disabled:bg-slate-600 bg-${borderColor}-500 px-3 py-1 text-sm  xl:text-base`}
          disabled={addModpackMutation.isLoading || !isValid}
          type="submit"
        >
          {addModpackMutation.isLoading ? "Adding Modpack" : "Add Modpack"}
        </button>
      </form>
    </>
  );
};
