import React, { useCallback, useState } from "react";
import  useUser  from "../Context/useUser";
import AddPackCard from "../Pages/addPack/AddPackCard";
import ModpackCard from "./ModpackCard";
import { tagOptions } from "../Helper/modifyModpack";
import { IModpack } from "../Utils/Interfaces";
import { useLocation, useNavigate } from "react-router-dom";

const ModpackListView = ({ packData }: {packData: any}) => {
  const { user } = useUser();

  const {
    data,
    isLoading,
    isError,
    error,
    modPackFilterByTags,
    setModPackFilterByTags,
    modPackFilterByInput,
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
      setModPackFilterByInput(evt.target.value),
    [modPackFilterByInput]
  );

  const toggleDropdown = () => setShowModal(!showModal);


  return (
    <>
      <section
        id="modpack__gallery"
        className="grid h-full w-full justify-normal self-center text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
      >
        {/* set the width to ffit the content and assign them to sm md lg for the container  like lg:max-w-[1000px]
        below and assthese same things to the nav width*/}
        <div className=" h-min overflow-hidden border-t-2 bg-sec/20 dark:border-none dark:bg-bg dark:shadow  md:mb-4 md:rounded-b-xl  md:border-none md:shadow-2xl  ">
          {/* map the data variable in a grad 4x2  */}
          <div className="md:space-x-none  flex items-center  justify-between   space-x-4 p-5 text-xl text-text xl:text-2xl ">
            {/* Show this button if you're logged in and a staff member */}
            <div
              className={`relative z-10 flex items-center justify-center gap-2 text-text ${
                user?.isAdmin
                  ? "cursor-pointer select-none rounded-lg px-2 py-1 hover:bg-text/10"
                  : ""
              }`}
              onClick={toggleDropdown}
            >
              {location.pathname === "/archived-pack-list" && "Archived "}
              {location.pathname === "/suggested-pack-list" && "Suggested "}
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
                    className={` absolute top-9 z-[15] space-y-1 rounded-lg  bg-bg p-1 text-sm shadow-md   dark:border-2 dark:border-sec/10  ${
                      showModal ? " block" : "hidden"
                    }`}
                    id="dropdown-menu"
                  >
                    <li
                      className={` active:bg-text/15  mb-1 flex w-full  cursor-pointer gap-1 rounded-lg  px-3 py-1 transition-all delay-0 duration-200 ease-in-out last:mb-0 hover:bg-text/10 `}
                    >
                      <a
                        className={`flex items-center justify-center gap-2 capitalize `}
                        onClick={() => {
                          navigate("/list-suggested-packs");
                        }}
                      >
                        Suggested Packs
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M32,72V56a8,8,0,0,1,8-8H216a8,8,0,0,1,8,8V72a8,8,0,0,1-8,8H40A8,8,0,0,1,32,72Zm8,72H216a8,8,0,0,0,8-8V120a8,8,0,0,0-8-8H40a8,8,0,0,0-8,8v16A8,8,0,0,0,40,144Zm112,32H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H152a8,8,0,0,0,8-8V184A8,8,0,0,0,152,176Zm80,8H216V168a8,8,0,0,0-16,0v16H184a8,8,0,0,0,0,16h16v16a8,8,0,0,0,16,0V200h16a8,8,0,0,0,0-16Z"></path>
                        </svg>
                      </a>
                    </li>
                    <li
                      className={` active:bg-text/15  mb-1 flex w-full  cursor-pointer gap-1 rounded-lg  px-3 py-1 transition-all delay-0 duration-200 ease-in-out last:mb-0 hover:bg-text/10 `}
                    >
                      <a
                        className={`flex items-center justify-center  gap-2 capitalize `}
                        onClick={() => {
                          navigate("/list-archived-packs");
                        }}
                      >
                        Archived Packs
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm-72,96H104a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm72-56H32V64H224V88Z"></path>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </>
              )}
            </div>

            <input
              className={`z-[5]  h-9 w-80 rounded-full border-2 bg-bg  px-3 py-1 text-sm`}
              placeholder="Search for modpacks"
              type="text"
              name="tagSearch"
              onChange={(e) => changeViewByInput(e)}
            />
            <button
              className="z-[5] flex w-[96.81px] justify-end"
              onClick={() => {
                setShowFilterTags((open) => !open);
                if (showFilterTags) {
                  setModPackFilterByTags("");
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
            <div className=" relative z-[5] mb-4 px-4">
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
              {location.pathname === "/list-archived-packs" && " archived "}
              {location.pathname === "/list-suggested-packs" && " suggested "}
              Modpacks
            </div>
          ) : (
            <>
              <div className=" z-20  grid grid-cols-2 gap-5 p-5 max-[400px]:grid-cols-1 sm:grid-cols-3  md:grid-cols-3   lg:grid-cols-4   ">
                {user?.isLinked &&
                  !(
                    location.pathname === "/list-archived-packs" ||
                    location.pathname === "/list-suggested-packs"
                  ) && <AddPackCard />}
                {data?.map((modpack: IModpack) => {
                  return <ModpackCard {...modpack} />;
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
