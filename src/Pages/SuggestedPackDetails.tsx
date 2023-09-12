import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { IModpack, IPackDetails } from "../Utils/Interfaces";
import Loading from "../Components/Loading";
import { useUser } from "../Context/useUser";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useRef, useState } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { tagMap } from "../Helper/modifyModpack";
import { ImageCarousel } from "./PackDetails";

const SuggestedPackDetails = () => {
  const { modpackId: id } = useParams();
  const modpackId = id as string;

  const [packdetailMenuShow, setPackdetailMenuShow] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { data, isError, isLoading, error } = usePackDetailData(modpackId);

  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  const delteModpack = async () =>
    await axios.delete(`${apiBase}/api/delete-modpack`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        modpackId,
      },
    });

  const archiveModpack = async () =>
    await axios.post(`${apiBase}/api/archive-modpack`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        modpackId,
      },
    });

  const archiveModpackMutation = useMutation(archiveModpack, {
    onSuccess: () => {
      queryClient.setQueryData(["modpacks"], (oldData: any) => {
        return oldData.filter(
          (modpack: IModpack) => modpack.modpackId !== modpackId
        );
      });

      return navigate("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["modpacks", "details", modpackId]);
    },
  });

  const deleteModpackMutation = useMutation(delteModpack, {
    onSuccess: () => {
      queryClient.setQueryData(["modpacks"], (oldData: any) => {
        return oldData.filter(
          (modpack: IModpack) => modpack.modpackId !== modpackId
        );
      });

      return navigate("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["modpacks", "details", modpackId]);
    },
  });
  if (isLoading) return <Loading size="la-lx" fullScreen={true} other="" />;
  if (isError) return <p>{error?.message}</p>;

  const {
    name,
    description,
    color: borderColor,
    galleryImages,
    officialUrl,
    tags,
    suggestedBy,
    isArchived,
  }: IPackDetails = data;

  return (
    <>
      <section
        id="modpack__details"
        key={modpackId}
        className="z-[11] grid h-full w-full  flex-1 justify-normal  text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
      >
        <div className="relative h-min overflow-hidden border-t-2 bg-bg pb-4 dark:border-none dark:shadow  md:mb-4 md:rounded-b-md  md:border-none md:shadow-xl   ">
          <div className={` z-[11] grid h-full items-center  lg:rounded-md  `}>
            <div className=" z-[11] flex justify-between gap-2  px-8 pt-4  max-[350px]:flex-col sm:gap-0 md:px-4 ">
              {/* backarrow to the root page */}
              <Link
                className="z-[11] flex min-w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
                to={"/suggested-pack-details"}
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
                <p className={` text-${borderColor}-500`}>Back</p>
              </Link>

              <div className="flex  gap-2 text-sm text-text max-[350px]:mt-5 max-[350px]:flex-col xl:text-base ">
                {/* edit modpack button only is userProfile is superUser */}

                {user?.isLoggedIn && user?.isAdmin && (
                  <>
                    <button
                      className="flex  w-12 items-center justify-center rounded-md  hover:opacity-60"
                      id="dropdown-button-packdetails"
                      data-dropdown-toggle="dropdown"
                      type="button"
                      ref={menuButtonRef}
                      onClick={() => {
                        setPackdetailMenuShow((open) => !open);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M216,130.16q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.6,107.6,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.29,107.29,0,0,0-26.25-10.86,8,8,0,0,0-7.06,1.48L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.6,107.6,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"></path>
                      </svg>
                    </button>
                    {packdetailMenuShow && (
                      <div
                        id="dropdown"
                        className="w-min-content absolute right-2 top-[67px] z-20 rounded-xl border border-text/20 bg-bg shadow-sm shadow-text/20"
                        ref={menuRef}
                      >
                        <ul
                          className="gap-1 p-1 text-sm last:mb-0 "
                          aria-labelledby="dropdown-button"
                        >
                          <li>
                            <Link
                              to={`/edit-modpack/${modpackId}`}
                              className="last:active:bg-text/15  mb-1 flex w-full cursor-pointer items-center  gap-2 rounded-lg  px-4 py-2 transition-all delay-0 duration-200  ease-in-out hover:bg-text/10 "
                            >
                              Edit
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                              >
                                <path d="M224,120v88a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h88a8,8,0,0,1,0,16H48V208H208V120a8,8,0,0,1,16,0Zm5.66-50.34-96,96A8,8,0,0,1,128,168H96a8,8,0,0,1-8-8V128a8,8,0,0,1,2.34-5.66l96-96a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,229.66,69.66Zm-17-5.66L192,43.31,179.31,56,200,76.69Z"></path>
                              </svg>
                            </Link>
                          </li>
                          <li>
                            {/* delete modpack button only is userProfile is superUser */}
                            <button
                              disabled={archiveModpackMutation.isLoading}
                              className="last:active:bg-text/15  flex w-full cursor-pointer items-center  gap-2 rounded-lg  px-4 py-2 text-orange-500 transition-all delay-0 duration-200 ease-in-out hover:bg-text/10 "
                              onClick={async () => {
                                if (archiveModpackMutation.isLoading) return;
                                archiveModpackMutation.mutate();
                              }}
                            >
                              {isArchived ? "Unarchive" : "Archive"}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                              >
                                <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm-72,96H104a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm72-56H32V64H224V88Z"></path>
                              </svg>
                            </button>
                          </li>
                          <li>
                            {/* delete modpack button only is userProfile is superUser */}
                            <button
                              disabled={deleteModpackMutation.isLoading}
                              className="last:active:bg-text/15  flex w-full cursor-pointer items-center  gap-2 rounded-lg  px-4 py-2 text-red-500 transition-all delay-0 duration-200 ease-in-out hover:bg-text/10 "
                              onClick={async () => {
                                if (
                                  prompt(
                                    "Are you sure you want to delete this modpack?\nType 'yes' to confirm"
                                  ) !== "yes"
                                ) {
                                  return toast.error("Modpack not deleted");
                                }
                                if (deleteModpackMutation.isLoading) return;
                                deleteModpackMutation.mutate();
                              }}
                            >
                              Delete{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                viewBox="0 0 256 256"
                              >
                                <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path>
                              </svg>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className={`z-[5] grid items-center md:px-4 `}>
              <div
                className={`${
                  galleryImages?.length > 0
                    ? "sm:grid-cols-2  md:space-x-4"
                    : " sm:grid-cols-1"
                } my-4 grid px-4  `}
              >
                {/* toggle images in production */}
                {galleryImages?.length > 0 && (
                  <ImageCarousel
                    galleryImages={galleryImages}
                    color={borderColor}
                  />
                )}
                <div className="grid w-full content-center items-center md:mr-4 md:space-y-4">
                  <p className="text-content my-4 break-normal text-center text-4xl uppercase  md:my-0 ">
                    {name}
                  </p>

                  <p className="text-content my-4 break-normal text-center text-xs uppercase  md:my-0 ">
                    Suggested By:
                    <br /> <span className="text-text/50">{suggestedBy}</span>
                  </p>
                </div>
              </div>

              {/* style the descripion to scroll on overflow and a max height of 364px */}
              <div className="  my-2 grid w-full  items-start justify-between gap-4 px-4 sm:grid-cols-2 sm:flex-row  md:gap-0 md:space-x-4">
                {/* map the tags */}
                <div className="flex flex-row">
                  {tags?.map((tag, index) => {
                    const label = tagMap.get(tag);

                    return (
                      <div
                        key={index}
                        className={`z-[10] ml-2 flex items-center justify-start self-start rounded-full border-2 capitalize first:ml-4 border-${borderColor}-500 bg-bg px-2 py-0.5 text-sm text-text/80   `}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-center ">
                  Modpack official page:{" "}
                  <Link
                    to={officialUrl}
                    className={`ml-2 flex items-center  gap-1 text-${borderColor}-500 hover:opacity-80`}
                    target="_blank"
                  >
                    Here
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      stroke="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M192,136v72a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V80A16,16,0,0,1,48,64h72a8,8,0,0,1,0,16H48V208H176V136a8,8,0,0,1,16,0Zm32-96a8,8,0,0,0-8-8H152a8,8,0,0,0-5.66,13.66L172.69,72l-42.35,42.34a8,8,0,0,0,11.32,11.32L184,83.31l26.34,26.35A8,8,0,0,0,224,104Z"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="my-4 px-4  ">
                <h3 className="text-2xl capitalize xl:text-3xl ">
                  description
                </h3>
                <div className=" max-h-64 overflow-y-auto p-4 shadow-inner  ">
                  <p className="text-content text-justify">{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 z-0 h-full w-full flex-1 bg-sec opacity-20"></div>
        </div>
      </section>
    </>
  );
};
export default SuggestedPackDetails;
