import React, { useCallback, useState } from "react";
import { useUser } from "../Context/useUser";
import AddPackCard from "../Pages/addPack/AddPackCard";
import ModpackCard from "./ModpackCard";
import { tagOptions } from "../Helper/modifyModpack";
import { IModpack } from "../Utils/Interfaces";
import { useLocation } from "react-router-dom";

const ModpackListView = ({ packData }) => {
  const { user } = useUser();

  const {
    data,
    isLoading,
    isError,
    error,
    modPackFilterByTags,
    setModPackFilterByTags,
    setModPackFilterByInput,
  } = packData;

  // set state for a button to scroll to the top of the page
  const [pageBottom, setPageBottom] = useState(false);
  const [showFilterTags, setShowFilterTags] = useState(false);
  const location = useLocation();
  console.log(location);

  window.addEventListener("scroll", () => {
    window.innerHeight + window.scrollY >= document.body.offsetHeight
      ? setPageBottom(true)
      : setPageBottom(false);
  });

  const changeViewByInput = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) =>
      setModPackFilterByInput(evt.target.value),
    [setModPackFilterByInput]
  );

  return (
    <>
      <section
        id="modpack__gallery"
        className="grid h-full  w-full justify-normal self-center text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
      >
        {/* set the width to ffit the content and assign them to sm md lg for the container  like lg:max-w-[1000px]
        below and assthese same things to the nav width*/}
        <div className="relative h-min overflow-hidden border-t-2 bg-bg dark:border-none dark:bg-bg dark:shadow  md:mb-4 md:rounded-b-xl  md:border-none md:shadow-2xl  ">
          {/* map the data variable in a grad 4x2  */}
          <div className="md:space-x-none  flex items-center  justify-between   space-x-4 p-5 text-xl text-text xl:text-2xl ">
            <p className="z-10">
              {location.pathname === "/archived-modpacks" && "Archived "}
              {location.pathname === "/suggested-modpacks" && "Suggested "}
              Modpacks
            </p>
            {/* Show this button if you're logged in and a staff member */}

            <input
              className={`z-10  h-9 w-80 rounded-full border-2 bg-bg  px-3 py-1 text-sm`}
              placeholder="Search for modpacks"
              type="text"
              name="tagSearch"
              onChange={(e) => changeViewByInput(e)}
            />
            <button
              className="z-10 flex w-[96.81px] justify-end"
              onClick={() => {
                setShowFilterTags(!showFilterTags);
                if (showFilterTags) setModPackFilterByTags("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                {showFilterTags ? (
                  <path d="M227.81,66.76l-.08.09L160,139.17v55.49A16,16,0,0,1,152.87,208l-32,21.34A16,16,0,0,1,96,216V139.17L28.27,66.85l-.08-.09A16,16,0,0,1,40,40H216a16,16,0,0,1,11.84,26.76Z"></path>
                ) : (
                  <path d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm108.34,72.28A15.92,15.92,0,0,0,144,139.17v55.49L112,216V139.17a15.92,15.92,0,0,0-4.32-10.94L40,56H216Z"></path>
                )}
              </svg>
            </button>
          </div>
          {showFilterTags && (
            <div className=" mb-4 px-4">
              <div className=" flex flex-wrap justify-center gap-2">
                {tagOptions.map((tagOption, index) => (
                  <button
                    type="button"
                    key={index}
                    className={`${
                      modPackFilterByTags.includes(tagOption.value)
                        ? `bg-slate-700 text-bg dark:bg-slate-300 dark:text-bg `
                        : `bg-slate-300 text-text dark:bg-slate-700`
                    }  z-10 flex items-center justify-center rounded-full px-3 py-1 text-sm transition-colors duration-200 ease-in-out hover:bg-opacity-80 `}
                    onClick={() => {
                      if (modPackFilterByTags.includes(tagOption.value)) {
                        setModPackFilterByTags(
                          modPackFilterByTags
                            .split(" ")
                            .filter((tag: any) => tag !== tagOption.value)
                            .join(" ")
                        );
                      } else {
                        setModPackFilterByTags(
                          modPackFilterByTags
                            ? `${modPackFilterByTags} ${tagOption.value}`
                            : tagOption.value
                        );
                      }
                    }}
                  >
                    {tagOption.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {isLoading ? (
            <div className=" my-10 text-center">Loading...</div>
          ) : isError ? (
            <div className=" my-10 text-center">
              <div>
                <h3 className="prose-2xl">{error?.message}</h3>
                <p>{error?.response?.data?.error ?? ""}</p>
              </div>
            </div>
          ) : data?.length === 0 ? (
            <div className=" my-10 text-center">
              No
              {location.pathname === "/archived-modpacks" && " archived "}
              {location.pathname === "/suggested-modpacks" && " suggested "}
              Modpacks
            </div>
          ) : (
            <>
              <div className=" grid  grid-cols-2 gap-5 p-5 max-[400px]:grid-cols-1 sm:grid-cols-3  md:grid-cols-3   lg:grid-cols-4   ">
                {user?.isAdmin &&
                  !(
                    location.pathname === "/suggested-modpacks" ||
                    location.pathname === "/archived-modpacks"
                  ) && <AddPackCard />}
                {data?.map((modpack: IModpack) => {
                  return <ModpackCard {...modpack} />;
                })}
              </div>
            </>
          )}
          <div className="absolute inset-0 h-full w-full flex-1 bg-sec opacity-20"></div>
        </div>
        <div className="p-body-inner m-4  my-0 flex  h-10   items-center justify-end md:mr-0 lg:mr-0">
          {/* button to scroll to the top of the page */}
          {pageBottom ? (
            <button
              className=" flex w-10 items-center  justify-center rounded-full bg-pri text-sm hover:bg-opacity-80 dark:hover:bg-hover-2 xl:text-base"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ^
            </button>
          ) : (
            <div className="h-10 w-10"></div>
          )}
        </div>
      </section>
    </>
  );
};

export default ModpackListView;
