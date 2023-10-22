import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AddModpackProps } from "../../Utils/Interfaces";
import { tagOptions, colorOptions } from "../../Helper/modifyModpack";
// import SuggestedByUserSearch from "../../Components/SuggestedByUserSearch";
import { errorHandling } from "../../Helper/errorHandling";
import { twMerge } from "tailwind-merge";
import { apiBase, borderColorVariants, isDev } from "../../Constants";
import { debounce } from "lodash"
import { DebounceInput } from "react-debounce-input";

export const CreateModpack = () => {
  const [modpackDescription, setModpackDescription] =
    React.useState<string>("");
  const [modpackColor, setModpackColor] = React.useState<string>("sky");
  const [modpackTags, setModpackTags] = React.useState<string[]>([]);
  const [isAvailable, setIsAvailable] = React.useState(false);
  const [modpackName, setModpackName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { username } = JSON.parse(localStorage.getItem("profileData") || "{}");

  const re = /^(?=[a-zA-Z0-9._]{2,32}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const isValid = modpackName.length > 1 && modpackName.length < 32 && re.test(modpackName);
  const isTouched = modpackName.length > 0;
  const isTaken = isValid && !isAvailable && !loading;


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addModpackMutation = useMutation(
    ({
      name,
      description,
      tags,
      color,
      officialUrl,
    }: AddModpackProps) =>
      axios.post(
        `${apiBase}/api/suggest-modpack`,
        {
          name,
          description,
          tags,
          color,
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
        queryClient.invalidateQueries(["modpacks", "suggested-modpacks", "archived-modpacks"]);
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
        return navigate(`/add-modpack/photos/${data.modpackId}`);
      },
    }
  );

  const debouncedCheckAvailability = React.useRef(debounce(checkAvailability, 500)).current;
  console.log("debouncedCheckAvailability", debouncedCheckAvailability);
  

  function handleModpackNameChange(newModpackName: string) {
    console.log("handleModpackNameChange", newModpackName);
    
    setModpackName(newModpackName);
    setLoading(true);
    setIsAvailable(false);
    debouncedCheckAvailability(newModpackName);
  }

  async function checkAvailability(modpackName: string) {
    console.log("checkAvailability", modpackName);
    
  
    const { data, status } = await axios.post(
      `${apiBase}/api/check-duplicate-modpack-name`,
      { modpackName },
      { withCredentials: true }
    );
    if (status !== 200) throw new Error("Error checking modpack name availability");
    const exists = data.exists;

    setIsAvailable(!exists);
    setLoading(false);
  }

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
        className="mb-8 flex flex-col flex-wrap  justify-center gap-4 pt-[.5em] w-96  mx-auto  text-sm text-text placeholder:text-slate-400  bg-blue-400  xl:text-base"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (addModpackMutation.isLoading || !confirm("Are you sure you want to submit this modpack?")) return;
          

          const target = e.target as HTMLFormElement & {
            name: { value: string };
            description: { value: string };
            color: { value: string };
            officialUrl: { value: string };
          };

          addModpackMutation.mutate({
            name: target.name.value,
            description: target.description.value,
            tags: modpackTags,
            color: target.color.value,
            officialUrl: target.officialUrl.value,
          });
        }}
      >
        {/* Modpack name field, single line. */}
        <div className="relative">

        <DebounceInput
          required
          className={twMerge(` h-8 w-full mr-10 rounded-md border-2 bg-bg active:border-none focus:border-transparent focus:outline-none focus:ring-0 active:outline-none border-${borderColor}-500 px-3 py-1`,
          !isValid && isTouched && "border-red-500",
          isTaken && "border-yellow-500",
          isAvailable && isValid && !loading && "border-green-500"
          )}
          type="text"
          placeholder="Name"
          name="name"
          minLength={3}
          debounceTimeout={500}
          onChange={(e)=>{
            // if the the input is empty return
            if(!e.target.value) return;
            handleModpackNameChange(e.target.value)}}
          autoComplete="false"
          />
            {loading && (
              <div className="absolute right-0 top-0 bottom-0 flex bg-black items-center pr-3">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
              </div>
            )
                    }
          </div>
          <div className=" truncate w-full items-center gap-2 pt-1 text-base relative ">

        {loading ? (
          <div className="break-all    w-full  sm:items-center sm:gap-2 ">

            Checking availability of @{modpackName}...
         
          </div>
          ) :  !isValid && isTouched ? (
            <p className="text-error text-sm">
              must be 3-16 characters long, alphanumeric only
            </p>
          ) : isValid && !isAvailable && !loading ? (
            <p className="text-warning text-sm">
              @{modpackName} is not available
            </p>
          ) : isValid && isTouched && isAvailable ? (
            <button className="btn btn-success">Confirm modpack name @{modpackName} </button>
            ) : null
          }
          </div>
        {/* Modpack description field, multi line. */}
        {/* In order to make the modpack field multi line, we need to use a textarea instead of an input. */}
        <textarea
          className={` min-h-[100px] rounded-md border-2 bg-bg  border-${borderColor}-500  px-3 py-1 out-of-range:border-red-500 `}
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
        <div className="t -mt-2 flex items-center justify-center">
          <p>{modpackDescription.length}/500</p>
        </div>
        {/* A Tag selector that has pill shaped containers from tagOptions that when clicked once it pushes the tagoptions value to listOfTags and if clicked again it removes the tagoptions value from listOfTags and if the value is in the listOfTags it gets a checkmark on the left handside of the text */}
        <div className=" mb-4 ">
          <div className=" flex flex-wrap justify-center gap-2">
            {tagOptions.map((tagOption, index) => (
              <button
                type="button"
                key={index}
                className={twMerge(
                  " flex items-center justify-center rounded-full px-3 py-1 text-sm transition-all hover:bg-opacity-80",
                  modpackTags.includes(tagOption.value)
                    ? `bg-${borderColor}-500 text-bg dark:text-bg `
                    : `bg-slate-300 text-text dark:bg-slate-700`
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

        {/*Color selection*/}
        <select
          className={` h-8 cursor-pointer rounded-md border-2  dark:text-bg border-${borderColor}-500 bg-${borderColor}-400 px-3 py-1 font-Tilt `}
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
          className={` h-8 rounded-md border-2 bg-bg  ${borderColorVariants[borderColor]} px-3 py-1`}
          type="text"
          placeholder="Official URL"
          name="officialUrl"
        />

        {/* Modpack suggestor field, single line. */}
        {/* <SuggestedByUserSearch /> */}
        <div className="grid">
          <label htmlFor="suggestor" className="text-text/50 dark:text-text/70">
            Suggested By
          </label>
          <input
            className="h-8 select-none rounded-md  bg-bg px-3 py-1 disabled:bg-slate-300  dark:text-bg"
            placeholder="Suggested By"
            name="suggestor"
            type="text"
            value={username}
            disabled
          />

        </div>
        {isDev && (
          <Link
            to={"/add-modpack/photos/12312"}
            className="ml-4 flex min-w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1  hover:bg-sec hover:bg-opacity-20  dark:hover:bg-hover-2"
          >
            Test link to photos
          </Link>
        )}

        <button
          className={` h-10 rounded-md border-2 border-black hover:bg-opacity-80 disabled:bg-slate-600 bg-${borderColor}-500 px-3 py-1  text-sm  xl:text-base`}
          disabled={addModpackMutation.isLoading}
          type="submit"
        >
          {addModpackMutation.isLoading ? "Adding Modpack" : "Add Modpack"}
        </button>
      </form>
    </>
  );
};

