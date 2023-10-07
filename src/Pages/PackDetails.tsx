import { useLocation, useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { CommentsComponent } from "../Components/CommentsComponent";
import { IModpack, IPackDetails } from "../Utils/Interfaces";
import Loading from "../Components/Loading";
import VoteForPackButton from "../Components/VoteForPackButton";
import PostComment from "../Components/PostComment";
import useUser from "../Context/useUser";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginButton } from "../Components/LoginButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { tagMap } from "../Helper/modifyModpack";
import { DropDown } from "../Components/Dialog";

import { apiBase, borderColorVariants, textColorVariants } from "../Constants";
import { ImageCarousel } from "../Components/ImageCarousel";
import { twMerge } from "tailwind-merge";

const PackDetails = ({ category }: { category: string }) => {
  const { modpackId: id } = useParams();
  const { pathname } = useLocation();
  const modpackId = id as string;

  const [packdetailMenuShow, setPackdetailMenuShow] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { data, isError, isLoading, fetchStatus, error } =
    usePackDetailData(modpackId);
  
    

  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const editPackButton = `/edit-${
    category === "main" ? "" : category + "-"
  }modpack/${modpackId}`;
  const returnToButton = category === "main" ? "/" : `/list-${category}-packs`;

  

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

    const updateModpackInList = (listName: string) => {
      queryClient.setQueryData([listName], (oldData) => {
        const newData = oldData as IModpack[];
        return newData.filter(
          (modpack: IModpack) => modpack.modpackId !== modpackId
        );
      });
    }

  const archiveModpackMutation = useMutation(archiveModpack, {
    onSuccess: ({data}) => {
      updateModpackInList("modpacks");
      
      toast.success(`${data.message}! 👌`);
      return navigate("/");
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
  });

  const deleteModpackMutation = useMutation(delteModpack, {
    onSuccess: ({data}) => {

      if (pathname.includes("archived")) {
        updateModpackInList("archived-modpacks");
      } else if (pathname.includes("suggested")) {
        updateModpackInList("suggested-modpacks");
      } else {
        updateModpackInList("modpacks");
      }

      toast.success(`${data.message}! 👌`);

      return navigate("/");
    },
    onError: (error) => {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    },
    onSettled: () => {
      queryClient.invalidateQueries(["pack-details", modpackId], {exact: true});
      queryClient.invalidateQueries(["modpacks","suggested-modpacks", "archived-modpacks"]);
    },
  });
  if (isLoading) return <Loading size="la-lx" fullScreen={true} other="" />;
  if (isError) return <p>{error?.message}</p>;

  const {
    name,
    description,
    color,
    galleryImages,
    comments,
    voteCount,
    officialUrl,
    tags,
    suggestedBy,
    publishedBy,
    timesVoted,
  }: // isArchived,
  // isPublished,
  IPackDetails = data;

  const commentCount = comments
    ? comments.length
    : Math.floor(Math.random() * 10);

  function setShowReplies(value: SetStateAction<boolean>): void {
    return console.log(value);
  }

  function setShowAddReply(value: SetStateAction<boolean>): void {
    return console.log(value);
  }
  

  return (
    <>
      <section
        id="modpack__details"
        key={modpackId}
        className="grid h-full w-full flex-1 justify-normal text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
      >
        <div className="relative h-min overflow-hidden border-t-2 bg-sec/20 pb-4 dark:border-none dark:shadow md:mb-4 md:rounded-b-md md:border-none md:shadow-xl">
          <div className="grid h-full items-center lg:rounded-md">
            <div className="flex justify-between gap-2 px-8 pt-4 max-[350px]:flex-col sm:gap-0 md:px-4">
              {/* backarrow to the root page */}
              <Link
                className=" flex min-w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
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

              <div className="z-[5] flex text-sm text-text max-[350px]:mt-5 max-[350px]:flex-col xl:text-base ">
                {/* edit modpack button only is userProfile is superUser */}

                {user?.isLoggedIn && user?.isAdmin && (
                  <>
                    <button
                      className="flex w-12 items-center justify-center rounded-md hover:opacity-60"
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
                    <DropDown
                      open={packdetailMenuShow}
                      dropDownStateChange={(open) =>
                        setPackdetailMenuShow(open)
                      }
                      position="right-2 z-[10] top-[67px]"
                      contents={
                        <ul
                          className="p-1 text-sm last:mb-0 "
                          aria-labelledby="dropdown-button"
                        >
                          <li>
                            <Link
                              to={editPackButton}
                              className="last:active:bg-text/15 flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all hover:bg-text/10 "
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
                              className="last:active:bg-text/15 flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-orange-500 transition-all hover:bg-text/10 "
                              onClick={async () => {
                                if (archiveModpackMutation.isLoading) return;
                                archiveModpackMutation.mutate();
                              }}
                            >
                              {window.location.pathname.includes("archived")
                                ? "Unarchive"
                                : "Archive"}
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
                              className="last:active:bg-text/15 flex w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-red-500 transition-all hover:bg-text/10 "
                              onClick={async () => {
                                if (deleteModpackMutation.isLoading) return;
                                if (confirm("Are you sure you want to delete this modpack?\n'OK' to confirm")) {
                                  deleteModpackMutation.mutate();
                                }
                                else {
                                  return toast.error("Unable to delete modpack");
                                }
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
                      }
                    />
                  </>
                )}
              </div>
            </div>
            <div className={`grid items-center md:px-4`}>
              <div
                className={twMerge(
                  " grid p-4",
                  galleryImages?.length > 0
                    ? "sm:grid-cols-2 md:space-x-4"
                    : " sm:grid-cols-1"
                )}
              >
                {/* toggle images in production */}
                {galleryImages?.length > 0 && (
                  <ImageCarousel galleryImages={galleryImages} color={color} />
                )}
                <div className="grid  content-center items-center space-y-4 md:mr-4">
                  <p className="text-content mt-4 break-normal text-center text-4xl uppercase  md:my-0 "
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
                          timesVoted={timesVoted}
                        />
                      </div>
                    )}
                  </div>
                  {category === "main" && (
                    <p className="mx-auto  break-normal border-b border-text/75 px-3 py-1 text-center text-xs uppercase text-text/75  md:my-0 ">
                      {timesVoted === 0
                        ? "You've yet to vote!"
                        : "You've Voted"}
                    </p>
                  )}
                  <p data-tooltip={`Discord ID ${suggestedBy}`} className="text-content my-4 break-normal w-fit mx-auto text-center text-xs uppercase flex flex-col cursor-pointer justify-center items-center  md:my-0 group/suggestedBy relative "
                   aria-label={`Suggested by ${suggestedBy}`}
                   >
                    Suggested By
                    <br />{" "}
                    <span className="text-text/50">
                      {suggestedBy ?? "Suggestor"}
                    </span>
                  </p>
                  <p data-tooltip={`Discord ID ${publishedBy}`} className="text-content  my-4 break-normal w-fit mx-auto text-center text-xs uppercase flex flex-col cursor-pointer justify-center items-center  md:my-0 group/publishedBy relative"
                   aria-label={`Published by ${publishedBy}`}
                   >
                    Published By
                    <br />{" "}
                    <span className="text-text/50">
                      {publishedBy ?? "Publisher"}
                    </span>
                    
                  </p>
                </div>
              </div>

              {/* style the descripion to scroll on overflow and a max height of 364px */}
              <div className="mx-auto grid sm:mb-0 mb-4  max-w-[412px] items-start justify-between gap-4 p-4 sm:mx-0 sm:max-w-full sm:grid-cols-2 sm:flex-row md:gap-0 md:space-x-4">
                {/* map the tags */}
                <div className=" flex  flex-wrap items-center justify-center gap-[0.333rem] md:w-full ">
                  {tags?.map((tag: string, index: number) => (
                    <div
                      key={index}
                      className={`z-[5]  flex min-w-fit items-center justify-start self-start rounded-full border-2 bg-bg px-2 py-0.5 text-sm capitalize text-text/80 ${borderColorVariants[color]} `}
                    >
                      {tagMap.get(tag)}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center ">
                  Modpack official page:{" "}
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
              <div className=" bg-bg p-4 md:rounded-lg ">
                <h3 className=" pt-4 text-2xl capitalize  xl:text-3xl ">
                  description
                </h3>
                <div className="p-4">
                  <p className=" text-justify">{description}</p>
                </div>
              </div>

              {category !== "suggested" && (
                <div className="sm:p-4 my-4 overflow-hidden px-2 py-4  ">
                  <h3 className="mb-4 flex items-center justify-start  gap-4 text-2xl capitalize xl:text-3xl ">
                    comments ({commentCount}){" "}
                    {fetchStatus === "fetching" && (
                      <Loading
                        size="la-sm"
                        fullScreen={false}
                        other="inline-block"
                      />
                    )}
                  </h3>
                  {/* input for posting comments by current user */}
                  {!user?.isLoggedIn && <LoginButton />}
                  <div className=" px-4">
                    {/* if user is logged in, show comment input */}
                    {user?.isLoggedIn && user?.isLinked && (
                      <PostComment
                        modpackId={modpackId}
                        color={color}
                        replyingTo={false}
                        replyParentId=""
                        setShowAddReply={setShowAddReply}
                        setShowReplies={setShowReplies}
                      />
                    )}
                    {user?.isLoggedIn && !user?.isLinked && (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-center  text-sm text-text/70">
                          Link your account to post comments and vote for packs.
                        </p>
                        <a
                          className="text-xs text-blue-500 underline"
                          href="/#"
                        >
                          More info here.
                        </a>
                      </div>
                    )}

                    {/* Map comments from api the the img, username, userId, and the comment from the user */}
                    {comments?.map((comment, index) => (
                      <div
                        key={index}
                        className="grid items-center justify-between  last:pb-0 "
                      >
                        <CommentsComponent color={color} comment={comment} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PackDetails;
