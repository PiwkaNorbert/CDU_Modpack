import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { IPackDetails } from "../Utils/Interfaces";
import Loading from "../Components/Loading";
import useUser from "../Context/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { tagMap } from "../Helper/modifyModpack";

// enable with the comment component
import LoginButton from "../Components/LoginButton";
import { CommentsComponent } from "../Components/CommentsComponent";

import { borderColorVariants, textColorVariants } from "../Constants";
import { ImageCarousel } from "../Components/ImageCarousel";
import { twMerge } from "tailwind-merge";
import PostComment from "../Components/PostComment";

const VoteForPackButton = lazy(() => import("../Components/VoteForPackButton"));
const RejectModpackBtn = lazy(
  () => import("../Components/ActionButtons/RejectModpackBtn")
);
const DeleteModpackBtn = lazy(
  () => import("../Components/ActionButtons/DeleteModpackBtn")
);
const ArchiveModpackBtn = lazy(
  () => import("../Components/ActionButtons/ArchiveModpackBtn")
);
const PublishModpackBtn = lazy(
  () => import("../Components/ActionButtons/PublishModpackBtn")
);

const PackDetails = ({ category }: { category: string }) => {
  const { modpackId: id } = useParams();
  const modpackId = id as string;

  const {
    data,
    isError,
    isLoading,
    error,
    fetchStatus, //enable with the comment component
  } = usePackDetailData(modpackId);

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

  if (isLoading) return <Loading size="la-lx" fullScreen={true} other="" />;
  if (isError)
    return (
      <div className="grid h-full w-full flex-1  justify-normal py-20 text-center text-text-1 lg:mx-auto  lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px]  ">
        <p className="py-10">
          {error?.message} 😢 - Please try again later or reload the page.
          <br /> If the problem persists, please contact us on our discord
          server.
          {/* refetch data button */}
        </p>
        <button
          className="mx-auto w-fit rounded-md border border-black bg-text px-4 py-2 text-sm text-bg hover:bg-opacity-80 disabled:bg-slate-600 dark:text-bg xl:text-base"
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
    voteCount,
    officialUrl,
    tags,
    suggestedBy,
    publishedBy,
    timesVoted,
    timesVotedThisMonth,
    mcVersion,
    comments,
  }: // isArchived,
  // isPublished,
  IPackDetails = data;

  // enable with the comment component
  const commentCount = comments
    ? comments.length
    : Math.floor(Math.random() * 10);

  return (
    <>
      <div className=" flex justify-between gap-2 pt-4 max-[640px]:flex-col sm:gap-0 ">
        {user?.isLoggedIn && (
          <div className=" z-[5] mx-auto -mt-4 flex w-fit flex-col justify-center  gap-4 rounded-b-lg border border-t-0 border-gray-100 shadow-custom bg-gray-50 p-4 text-center text-sm uppercase empty:hidden  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300  max-[500px]:w-full sm:hidden  md:mt-0 md:flex-row lg:text-base lg:font-medium ">
            {`${user?.votesRemaining} ${
              user?.votesRemaining == 1 ? "vote" : "votes"
            } remaining this month`}
          </div>
        )}

        {/* backarrow to the root page */}
        <Link
          className="flex min-w-fit w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-sm text-text-1 hover:bg-text-1/10 active:bg-text-1/20 lg:text-base transition-all  lg:font-medium"
          to={returnToButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none h-8 w-8"
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
          <p className="pointer-events-none">Back</p>
        </Link>

        <div className="z-[5] flex justify-center gap-4 border-gray-100 text-sm  empty:hidden dark:border-gray-700 dark:text-gray-300 max-[500px]:flex-col  max-[500px]:rounded-lg max-[500px]:border max-[500px]:bg-gray-50  max-[500px]:p-4 max-[500px]:dark:bg-gray-900  md:mt-0 md:flex-row lg:text-base lg:font-medium">
          {/* edit modpack button only is userProfile is superUser */}

          {user?.isLoggedIn && user?.isAdmin && (
            <>
              <Link
                to={editPackButton}
                className="flex w-full cursor-pointer items-center text-text-1 hover:bg-text-1/10 active:bg-text-1/20 justify-center gap-2 rounded-lg px-4 py-2 transition-all sm:w-fit sm:justify-normal "
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
              <Suspense
                fallback={
                  <Loading
                    size="la-sm"
                    fullScreen={false}
                    other="inline-block"
                  />
                }
              >
                {category === "main" ? (
                  <ArchiveModpackBtn modpackId={modpackId} />
                ) : (
                  <PublishModpackBtn modpackId={modpackId} />
                )}
                {category === "suggested" && (
                  <>
                    <RejectModpackBtn modpackId={modpackId} />
                    <DeleteModpackBtn modpackId={modpackId} />
                  </>
                )}
              </Suspense>
            </>
          )}
        </div>
      </div>
      <div
        className={twMerge(
          "grid",
          galleryImages?.length > 0 ? "sm:grid-cols-2 gap-2" : "sm:grid-cols-1"
        )}
      >
        {/* toggle images in production */}
        {galleryImages?.length > 0 && (
          <ImageCarousel galleryImages={galleryImages} color={color} />
        )}
        <div className="grid items-start gap-2">
          <h3
            className="text-pri mt-4 break-normal font-minecraft px-2 text-center text-4xl uppercase"
            aria-label={`Modpack name: ${name}`}
          >
            {name ?? "Modpack Name"}
          </h3>
          {category === "main" && (
            <div className="flex items-center justify-center gap-2">
              <Suspense
                fallback={
                  <Loading
                    size="la-sm"
                    fullScreen={false}
                    other="inline-block"
                  />
                }
              >
                <VoteForPackButton
                  modpackId={modpackId}
                  color={color}
                  isLoading={isLoading}
                  voteCount={voteCount}
                  timesVotedThisMonth={timesVotedThisMonth}
                />
              </Suspense>
            </div>
          )}
          {category === "main" && (
            <p className="mx-auto break-normal border-b border-text/75 px-3 py-1 text-center text-xs uppercase text-text-1/75">
              {!user?.isLoggedIn
                ? "You need to be logged in to vote"
                : user?.isLoggedIn && timesVoted === 0
                ? "You haven't voted yet"
                : user?.isLoggedIn && timesVoted === 1
                ? "You've voted " + timesVoted + " time"
                : "You've voted " + timesVoted + " times"}
            </p>
          )}
          <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-4">
            <p
              data-tooltip={`Discord ID ${suggestedBy}`}
              className="text-content group/suggestedBy relative  flex w-fit cursor-pointer flex-col items-center justify-center break-normal text-center text-xs uppercase "
              aria-label={`Suggested by ${suggestedBy}`}
            >
              Suggested By
              <br />
              <span className="text-text-1/50">{suggestedBy ?? "Unknown"}</span>
            </p>
            {category !== "suggested" && (
              <p
                data-tooltip={`Discord ID ${publishedBy}`}
                className="text-content group/publishedBy relative  flex w-fit cursor-pointer flex-col items-center justify-center break-normal text-center text-xs uppercase"
                aria-label={`Published by ${publishedBy}`}
              >
                Published By
                <br />
                <span className="text-text-1/50">
                  {publishedBy ?? "Unknown"}
                </span>
              </p>
            )}
            <p
              className="text-content group/mcVersion relative  flex w-fit flex-col items-center justify-center break-normal text-center text-xs uppercase "
              aria-label={`MC Version ${suggestedBy}`}
            >
              MC Version
              <br />
              <span className="text-text-1/50">{mcVersion ?? "Unknown"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* style the descripion to scroll on overflow and a max height of 364px */}
      <div className="grid items-center pt-4 justify-center gap-4 sm:mx-0 sm:mb-0 sm:max-w-full sm:grid-cols-2 sm:flex-row md:gap-0 md:space-x-4">
        {/* map the tags */}
        <div className="flex flex-wrap items-center justify-center gap-[0.333rem] md:w-full ">
          {tags?.map((tag: string, index: number) => (
            <div
              key={index}
              className={`z-[5] flex min-w-fit items-center justify-start self-start rounded-full border bg-card px-2 py-0.5 text-sm capitalize text-text-1 font-displayfont font-semibold ${borderColorVariants[color]} `}
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
      <div className="flex justify-between gap-2  max-[500px]:flex-col sm:gap-0  ">
        <div className=" border-gray-100 text-sm text-text-1 dark:border-gray-700 dark:text-gray-300 max-[500px]:mt-5 max-[500px]:rounded-lg max-[500px]:border  max-[500px]:bg-gray-50 max-[500px]:p-4 max-[500px]:dark:bg-gray-900 md:mt-0 md:flex-row md:rounded-lg md:text-sm md:font-medium xl:text-base">
          <h3 className="pt-4 text-pri text-2xl capitalize  text-center sm:text-left xl:text-3xl">
            description
          </h3>
          <div className="sm:px-4 py-4">
            <p className="text-justify ">{description}</p>
          </div>
        </div>
      </div>
      {/* comment component here */}
      {category !== "suggested" && (
        <div className="my-4 overflow-hidden py-4">
          <h3 className="mb-4 inline-block items-center text-pri w-full gap-4 text-2xl capitalize xl:text-3xl text-center sm:text-left">
            comment{commentCount === 1 ? "" : "s"} ({commentCount})
            {fetchStatus === "fetching" && (
              <Loading size="la-sm" fullScreen={false} other="inline-block" />
            )}
          </h3>
          {/* input for posting comments by current user */}
          {!user?.isLoggedIn && <LoginButton toComment={true} />}
          <div className="sm:px-4">
            {/* if user is logged in, show comment input */}
            {user?.isLoggedIn && user?.isLinked && (
              <PostComment
                modpackId={modpackId}
                color={color}
                replyingTo={false}
                replyParentId=""
              />
            )}
            {user?.isLoggedIn && !user?.isLinked && (
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-center text-sm text-text-1/70">
                  Link your account to post comments and vote for packs.
                </p>
                <a className="text-xs text-blue-500 underline" href="/#">
                  More info here.
                </a>
              </div>
            )}

            {/* Map comments from api the the img, username, userId, and the comment from the user */}
            {comments?.map((comment, idx) => (
              <CommentsComponent color={color} comment={comment} idx={idx} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default PackDetails;
