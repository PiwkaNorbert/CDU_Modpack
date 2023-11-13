import { useLocation, useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { IModpack, IPackDetails } from "../Utils/Interfaces";
import Loading from "../Components/Loading";
import VoteForPackButton from "../Components/VoteForPackButton";
import useUser from "../Context/useUser";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { tagMap } from "../Helper/modifyModpack";

// enable with the comment component
// import { LoginButton } from "../Components/LoginButton";
// import { CommentsComponent } from "../Components/CommentsComponent";
// import PostComment from "../Components/PostComment";

import { apiBase, borderColorVariants, textColorVariants } from "../Constants";
import { ImageCarousel } from "../Components/ImageCarousel";
import { twMerge } from "tailwind-merge";

const PackDetails = ({ category }: { category: string }) => {
  const { modpackId: id } = useParams();
  const { pathname } = useLocation();
  const modpackId = id as string;

  const {
    data,
    isError,
    isLoading,
    error,
    //  fetchStatus  eneable with the comment component
  } = usePackDetailData(modpackId);

  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editPackButton = `/edit-${
    category === "main" ? "" : category + "-"
  }modpack/${modpackId}`;
  const returnToButton = category === "main" ? "/" : `/list-${category}-packs`;

  function returnToLists({ message }: { message: string }) {
    toast.success(`${message}! 👌`);

    if (pathname.includes("archived")) {
      updateModpackInList(["modpacks", "archived"]);
      return navigate("/list-archived-modpacks");
    } else if (pathname.includes("suggested")) {
      updateModpackInList(["modpacks", "suggested"]);
      return navigate("/list-suggested-modpacks");
    } else {
      updateModpackInList(["modpacks"]);
      return navigate("/");
    }
  }

  useEffect(() => {
    if (isLoading) return;

    if (data?.isPublished && !data?.isArchived) {
      return navigate(`/pack-details/${data?.modpackId}`);
    } else if (data?.isArchived === true) {
      return navigate(`/archived-pack-details/${data?.modpackId}`);
    } else if (!data?.isPublished) {
      return navigate(`/suggested-pack-details/${data?.modpackId}`);
    }
  }, [data, isLoading, navigate]);

  const deleteModpack = async () =>
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
    await axios.post(
      `${apiBase}/api/archive-modpack`,
      { modpackId },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

  const updateModpackInList = (listName: string[]) => {
    queryClient.setQueryData(listName, (oldData) => {
      const newData = oldData as IModpack[];
      return newData.filter(
        (modpack: IModpack) => modpack.modpackId !== modpackId
      );
    });
  };

  const archiveModpackMutation = useMutation(archiveModpack, {
    onSuccess: ({ data }) => {
      returnToLists(data);
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries([
        "modpacks",
        "pack-details",
        "suggested",
        "archived",
        modpackId,
      ]);
    },
  });

  const deleteModpackMutation = useMutation(deleteModpack, {
    onSuccess: ({ data }) => {
      returnToLists(data);
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["pack-details", modpackId], {
        exact: true,
      });
      queryClient.invalidateQueries([
        "modpacks",
        "suggested-modpacks",
        "archived-modpacks",
      ]);
    },
  });
  const publishModpackMutation = useMutation(
    () =>
      axios.post(
        `${apiBase}/api/publish-modpack`,
        { modpackId },
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

  if (isLoading) return <Loading size="la-lx" fullScreen={true} other="" />;
  if (isError)
    return (
      <div className="grid h-full w-full flex-1  justify-normal py-20 text-center text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px]">
        <p className="py-10">
          {error?.message} 😢 - Please try again later or reload the page.
          <br /> If the problem persists, please contact us on our discord
          server.
          {/* refetch data button */}
        </p>
        <button
          className="mx-auto w-fit rounded-md border-2 border-black bg-text px-4 py-2 text-sm text-bg hover:bg-opacity-80 disabled:bg-slate-600 dark:text-bg xl:text-base"
          onClick={() =>
            queryClient.invalidateQueries(["pack-details", modpackId])
          }
        >
          Reload
        </button>
      </div>
    );

  const {
    name,
    description,
    color,
    galleryImages,
    // comments,
    voteCount,
    officialUrl,
    tags,
    suggestedBy,
    publishedBy,
    timesVoted,
    timesVotedThisMonth,
  }: // isArchived,
  // isPublished,
  IPackDetails = data;

  // enable with the comment component
  // const commentCount = comments
  //   ? comments.length
  //   : Math.floor(Math.random() * 10);

  return (
    <>
      <section
        id="modpack__details"
        key={modpackId}
        className="grid h-full w-full flex-1 justify-normal text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
      >
        <div className="relative h-min overflow-hidden border-t-2 bg-sec/20 pb-4 dark:border-none dark:shadow md:mb-4 md:rounded-b-md md:border-none md:shadow-xl">
          <div className="grid h-full items-center lg:rounded-md">
            <div className="mt-1 flex justify-between gap-2 px-4 pt-4 max-[640px]:flex-col sm:gap-0 md:px-8 ">
              <div className=" z-[5] mx-auto -mt-6 flex w-fit flex-col justify-center  gap-4 rounded-b-lg border border-gray-100 bg-gray-50 p-4 text-center text-sm uppercase text-text empty:hidden  dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300  max-[500px]:w-full sm:hidden  md:mt-0 md:flex-row lg:text-base lg:font-medium ">
                {`${user?.votesRemaining} ${
                  user?.votesRemaining == 1 ? "vote" : "votes"
                } remaining this month`}
              </div>
              {/* backarrow to the root page */}
              <Link
                className="flex min-w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-sm text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2 lg:text-base lg:font-medium"
                to={returnToButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`pointer-events-none h-8 w-8 ${textColorVariants[color]}`}
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
                <p
                  className={`pointer-events-none ${textColorVariants[color]}`}
                >
                  Back
                </p>
              </Link>

              <div className="z-[5] flex justify-center gap-4 border-gray-100 text-sm text-text empty:hidden dark:border-gray-700 dark:text-gray-300 max-[500px]:flex-col  max-[500px]:rounded-lg max-[500px]:border max-[500px]:bg-gray-50  max-[500px]:p-4 max-[500px]:dark:bg-gray-800  md:mt-0 md:flex-row lg:text-base lg:font-medium">
                {/* edit modpack button only is userProfile is superUser */}

                {user?.isLoggedIn && user?.isAdmin && (
                  <>
                    <Link
                      to={editPackButton}
                      className="last:active:bg-text/15 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 transition-all hover:bg-text/10 sm:w-fit sm:justify-normal "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M224,120v88a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h88a8,8,0,0,1,0,16H48V208H208V120a8,8,0,0,1,16,0Zm5.66-50.34-96,96A8,8,0,0,1,128,168H96a8,8,0,0,1-8-8V128a8,8,0,0,1,2.34-5.66l96-96a8,8,0,0,1,11.32,0l32,32A8,8,0,0,1,229.66,69.66Zm-17-5.66L192,43.31,179.31,56,200,76.69Z"></path>
                      </svg>
                      Edit
                    </Link>
                    {category !== "main" && (
                      <button
                        className={`last:active:bg-text/15 mx-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-blue-500 transition-all hover:bg-text/10 sm:w-fit sm:justify-normal`}
                        disabled={publishModpackMutation.isLoading}
                        onClick={async () => {
                          if (publishModpackMutation.isLoading) return;
                          if (
                            confirm(
                              "Are you sure you want to Publish this modpack?\n'OK' to confirm"
                            )
                          ) {
                            publishModpackMutation.mutate();
                          } else {
                            return toast.error("Unable to Publish modpack");
                          }
                        }}
                      >
                        {publishModpackMutation.isLoading ? (
                          "Publishing Modpack..."
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 "
                              fill="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path d="M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3,37.28l84.32,40,40,84.32a19.81,19.81,0,0,0,18,11.44c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM157,220.92l-33.72-71.19,45.25-45.25a12,12,0,0,0-17-17l-45.25,45.25L35.08,99,210,46Z"></path>
                            </svg>
                            Publish
                          </>
                        )}
                      </button>
                    )}
                    {/* delete modpack button only is userProfile is superUser */}
                    {category === "main" && (
                      <button
                        disabled={archiveModpackMutation.isLoading}
                        className="last:active:bg-text/15 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-orange-500 transition-all hover:bg-text/10 sm:w-fit sm:justify-normal "
                        onClick={async () => {
                          if (archiveModpackMutation.isLoading) return;
                          if (
                            confirm(
                              "Are you sure you want to Archive this modpack?\n'OK' to confirm"
                            )
                          ) {
                            archiveModpackMutation.mutate();
                          } else {
                            return toast.error("Unable to Archive modpack");
                          }
                        }}
                      >
                        {archiveModpackMutation.isLoading ? (
                          "Archiving Modpack..."
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path d="M224,48H32A16,16,0,0,0,16,64V88a16,16,0,0,0,16,16v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V104a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48Zm-72,96H104a8,8,0,0,1,0-16h48a8,8,0,0,1,0,16Zm72-56H32V64H224V88Z"></path>
                            </svg>
                            Archive
                          </>
                        )}
                      </button>
                    )}

                    {category === "suggested" && (
                      <button
                        disabled={deleteModpackMutation.isLoading}
                        className="last:active:bg-text/15 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-red-500 transition-all hover:bg-text/10 sm:w-fit sm:justify-normal "
                        onClick={async () => {
                          if (deleteModpackMutation.isLoading) return;
                          if (
                            prompt(
                              "Are you sure you want to delete this modpack?\nType 'Yes' to confirm"
                            ) === "Yes"
                          ) {
                            deleteModpackMutation.mutate();
                          } else {
                            return toast.error("Unable to delete modpack");
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path>
                        </svg>
                        Delete
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className={`grid items-center md:px-4`}>
              <div
                className={twMerge(
                  "grid p-4",
                  galleryImages?.length > 0
                    ? "sm:grid-cols-2 md:space-x-4"
                    : "sm:grid-cols-1"
                )}
              >
                {/* toggle images in production */}
                {galleryImages?.length > 0 && (
                  <ImageCarousel galleryImages={galleryImages} color={color} />
                )}
                <div className="grid content-center items-center space-y-4 md:mr-4">
                  <p
                    className="text-content mt-4 break-normal px-2 text-center text-4xl uppercase md:my-0"
                    aria-label={`Modpack name: ${name}`}
                  >
                    {name ?? "Modpack Name"}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {category === "main" && (
                      <div className="flex items-center justify-center gap-2">
                        <VoteForPackButton
                          modpackId={modpackId}
                          color={color}
                          isLoading={isLoading}
                          voteCount={voteCount}
                          timesVotedThisMonth={timesVotedThisMonth}
                        />
                      </div>
                    )}
                  </div>
                  {category === "main" && (
                    <p className="mx-auto break-normal border-b border-text/75 px-3 py-1 text-center text-xs uppercase text-text/75 md:my-0 ">
                      {timesVoted === 0
                        ? "You've yet to vote!"
                        : timesVoted === 1
                        ? "You've voted " + timesVoted + " time"
                        : "You've voted " + timesVoted + " times"}
                    </p>
                  )}
                  <p
                    data-tooltip={`Discord ID ${suggestedBy}`}
                    className="text-content group/suggestedBy relative mx-auto my-4 flex w-fit cursor-pointer flex-col items-center justify-center break-normal text-center text-xs uppercase md:my-0 "
                    aria-label={`Suggested by ${suggestedBy}`}
                  >
                    Suggested By
                    <br />
                    <span className="text-text/50">
                      {suggestedBy ?? "Unknown"}
                    </span>
                  </p>
                  {category !== "suggested" && (
                    <p
                      data-tooltip={`Discord ID ${publishedBy}`}
                      className="text-content group/publishedBy relative mx-auto my-4 flex w-fit cursor-pointer flex-col items-center justify-center break-normal text-center text-xs uppercase md:my-0"
                      aria-label={`Published by ${publishedBy}`}
                    >
                      Published By
                      <br />
                      <span className="text-text/50">
                        {publishedBy ?? "Unknown"}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* style the descripion to scroll on overflow and a max height of 364px */}
              <div className="mx-auto grid max-w-[412px] items-start justify-between gap-4 p-4 sm:mx-0 sm:mb-0 sm:max-w-full sm:grid-cols-2 sm:flex-row md:gap-0 md:space-x-4">
                {/* map the tags */}
                <div className="flex flex-wrap items-center justify-center gap-[0.333rem] md:w-full ">
                  {tags?.map((tag: string, index: number) => (
                    <div
                      key={index}
                      className={`z-[5] flex min-w-fit items-center justify-start self-start rounded-full border-2 bg-bg px-2 py-0.5 text-sm capitalize text-text/80 ${borderColorVariants[color]} `}
                    >
                      {tagMap.get(tag)}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center ">
                  Modpack official page:
                  <Link
                    to={officialUrl}
                    className={`ml-2 flex items-center gap-1 hover:opacity-80 ${textColorVariants[color]} `}
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
              <div className="flex justify-between gap-2 p-4 max-[500px]:flex-col sm:gap-0  ">
                <div className="mt-4 border-gray-100 text-sm text-text dark:border-gray-700 dark:text-gray-300 max-[500px]:mt-5 max-[500px]:rounded-lg max-[500px]:border  max-[500px]:bg-gray-50 max-[500px]:p-4 max-[500px]:dark:bg-gray-800 md:mt-0 md:flex-row md:rounded-lg md:text-sm md:font-medium xl:text-base">
                  <h3 className="pt-4 text-center text-2xl capitalize text-text sm:text-left xl:text-3xl">
                    description
                  </h3>
                  <div className="p-4">
                    <p className="text-justify">{description}</p>
                  </div>
                </div>
              </div>
              {/* comment component here */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PackDetails;
//  {category !== "suggested" && (
//   <div className="my-4 overflow-hidden px-2 py-4 sm:p-4  ">
//     <h3 className="mb-4 inline-block items-center w-full gap-4 text-2xl capitalize xl:text-3xl text-center sm:text-left">
//       comments ({commentCount})
//       {fetchStatus === "fetching" && (
//         <Loading
//           size="la-sm"
//           fullScreen={false}
//           other="inline-block"
//         />
//       )}
//     </h3>
//     {/* input for posting comments by current user */}
//     {!user?.isLoggedIn && <LoginButton />}
//     <div className="px-4">
//       {/* if user is logged in, show comment input */}
//       {user?.isLoggedIn && user?.isLinked && (
//         <PostComment
//           modpackId={modpackId}
//           color={color}
//           replyingTo={false}
//           replyParentId=""

//         />
//       )}
//       {user?.isLoggedIn && !user?.isLinked && (
//         <div className="flex flex-col items-center justify-center gap-2">
//           <p className="text-center text-sm text-text/70">
//             Link your account to post comments and vote for packs.
//           </p>
//           <a
//             className="text-xs text-blue-500 underline"
//             href="/#"
//           >
//             More info here.
//           </a>
//         </div>
//       )}

//       {/* Map comments from api the the img, username, userId, and the comment from the user */}
//       {comments?.map((comment, idx) => <CommentsComponent color={color} comment={comment} idx={idx} />
//       )}
//     </div>
//   </div>
// )}
