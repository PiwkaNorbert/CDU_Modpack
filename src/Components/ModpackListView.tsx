import React, { useCallback, useState, useEffect } from "react";
import useUser from "../Context/useUser";
import SuggestPackCard from "../Pages/SuggestPack/SuggestPackCard";
import ModpackCard from "./ModpackCard";
import { IModpack, iPackData } from "../Utils/Interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { packLocation } from "../Constants";
import { twMerge } from "tailwind-merge";
import { ModpackTags } from "./ModpackTags";

const ModpackListView = ({
  packData,
  category,
}: {
  packData: iPackData;
  category: string;
}) => {
  const { user } = useUser();

  const {
    data,
    isLoading,
    isError,
    error,
    modPackFilterByTags,
    setModPackFilterByTags,
    // modPackFilterByInput,
    setModPackFilterByInput,
  } = packData;

  // set state for a button to scroll to the top of the page
  const [pageBottom, setPageBottom] = useState(false);
  const [showFilterTags, setShowFilterTags] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  window.addEventListener("scroll", () => {
    window.innerHeight + window.scrollY >= document.body.offsetHeight
      ? setPageBottom(true)
      : setPageBottom(false);
  });

  const changeViewByInput = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) =>
      setModPackFilterByInput([...evt.target.value.split(" ")]),
    [setModPackFilterByInput]
  );

  const toggleDropdown = () => setShowModal(!showModal);

  const handleTagClick = (tag: string) => {
    if (modPackFilterByTags.includes(tag)) {
      // remove the tag from the filter if it's already in the filter
      setModPackFilterByTags((prevTags: string[]) =>
        prevTags.filter((t: string) => t !== tag)
      );
    } else {
      // add the tag to the filter
      setModPackFilterByTags((prevTags: string[]) => [...prevTags, tag]);
    }
  };

  // check what the category is and set the title accordingly and set the data to the correct data for that category and set the path to the correct path for that category
  useEffect(() => {
    if (category === "suggested") {
      document.title = "Suggested Modpacks";
    } else if (category === "archived") {
      document.title = "Archived Modpacks";
    } else {
      document.title = "Modpacks";
    }
  }, [category]);

  return (
    <>
      <section
        id="modpack__gallery"
        className="grid h-full w-full justify-normal self-center text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
      >
        {/* set the width to ffit the content and assign them to sm md lg for the container  like lg:max-w-[1000px]
        below and assthese same things to the nav width*/}
        <div className="overflow-hidden border-t-2 bg-sec/20 dark:border-none dark:bg-bg dark:shadow  md:mb-4 md:rounded-b-xl  md:border-none md:shadow-2xl  ">
          {/* map the data variable in a grad 4x2  */}
          <div className="md:space-x-none  flex flex-col items-center justify-between gap-4  p-5  text-xl   text-text sm:flex-row sm:gap-0 sm:space-x-4 xl:text-2xl ">
            {/* Show this button if you're logged in and a staff member */}
            <div className="flex w-full items-center justify-between sm:w-auto">
              <div
                className={twMerge(
                  "relative z-[5] flex items-center justify-center gap-2 text-text",
                  user?.isAdmin &&
                    "cursor-pointer select-none rounded-lg px-2 py-1 capitalize hover:bg-text/10 ",
                  user?.isAdmin &&
                    showModal &&
                    "before:fixed before:inset-0 before:z-[10] before:bg-black/20"
                )}
                onClick={toggleDropdown}
              >
                {location.pathname === "/list-archived-packs" && "Archived "}
                {location.pathname === "/list-suggested-packs" && "Suggested "}
                Modpacks
                {user?.isAdmin && (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                      className={`transition-transform   ${
                        showModal ? "rotate-90" : "rotate-0"
                      }`}
                    >
                      <path d="M181.66,133.66l-80,80A8,8,0,0,1,88,208V48a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                    </svg>

                    <ul
                      className={` absolute top-9 z-[200] space-y-1 rounded-lg bg-bg p-1
                  text-sm shadow-md      dark:border-2 dark:border-sec/10  ${
                    showModal ? " block" : "hidden"
                  }`}
                      id="dropdown-menu"
                    >
                      {packLocation
                        .filter(
                          (packLocation) =>
                            packLocation.pathname !== location.pathname
                        )
                        .map((packLocation) => {
                          return (
                            <li
                              key={packLocation.name}
                              className={` active:bg-text/15  mb-1 flex w-full  cursor-pointer gap-1 rounded-lg  px-3 py-1 transition-all  last:mb-0 hover:bg-text/10 `}
                            >
                              <a
                                className={`flex items-center justify-center gap-2 capitalize `}
                                onClick={() => {
                                  navigate(packLocation.pathname);
                                }}
                              >
                                {packLocation.name}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  fill="currentColor"
                                  viewBox="0 0 256 256"
                                >
                                  <path d={packLocation.svgPath}></path>
                                </svg>
                              </a>
                            </li>
                          );
                        })}
                    </ul>
                  </>
                )}
              </div>

              <button
                className="flex justify-end  sm:hidden sm:min-w-[96.81px] "
                onClick={() => {
                  setShowFilterTags((open) => !open);
                  if (showFilterTags) {
                    setModPackFilterByTags([]);
                  }
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

            <input
              className={` h-9 w-full rounded-full border-2 bg-bg px-3 py-1 text-sm sm:w-80 `}
              placeholder="Search for modpacks"
              type="text"
              name="tagSearch"
              onChange={(e) => changeViewByInput(e)}
            />
            <button
              className="hidden w-[96.81px] justify-end sm:flex "
              onClick={() => {
                setShowFilterTags((open) => !open);
                if (showFilterTags) {
                  setModPackFilterByTags([]);
                }
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
            <div className=" relative z-[4] border-b-2 px-4 pb-5">
              <div className=" min-h-16 flex flex-wrap items-start justify-start gap-2 px-2">
                <ModpackTags
                  modpacks={data}
                  onTagClick={handleTagClick}
                  modPackFilterByTags={modPackFilterByTags}
                />
              </div>
            </div>
          )}
          {isLoading ? (
            <div className=" my-10 text-center">Loading...</div>
          ) : isError ? (
            <div className=" my-10 text-center">
              <div>
                <h3 className="prose-2xl">{error?.message}</h3>
                <p>
                  {(error?.response?.data as { error?: string })?.error ?? ""}
                </p>
              </div>
            </div>
          ) : // check if data.length is 0 or if the array is empty with
          data?.length === 0 || !Array.isArray(data) ? (
            <div className=" my-10 flex-1 text-center capitalize">
              No {location.pathname.includes("archived") && " archived "}
              {location.pathname.includes("suggested") && " suggested "}
              Modpacks
            </div>
          ) : (
            <>
              <div className=" z-20  grid grid-cols-2 gap-5 p-5 max-[400px]:grid-cols-1 sm:grid-cols-3  md:grid-cols-3   lg:grid-cols-4   ">
                {user?.isLinked &&
                  !(
                    location.pathname.includes("archived") ||
                    location.pathname.includes("suggested")
                  ) && <SuggestPackCard />}
                {data?.map((modpack: IModpack, index: number) => {
                  return <ModpackCard {...modpack} key={index} />;
                })}
              </div>
            </>
          )}
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
