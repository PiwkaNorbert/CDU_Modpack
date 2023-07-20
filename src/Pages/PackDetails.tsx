import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { CommentsComponent } from "../Components/CommentsComponent";
import { IModpack, IPackDetails } from "../Utils/Interfaces";
import Loading from "../Components/Loading";
import VoteForPackButton from "../Components/VoteForPackButton";
import PostComment from "../Components/PostComment";
import { useUser } from "../Context/useUser";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginButton } from "../Components/LoginButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { setupClickOutsideHandler } from "../Helper/setupClickOutsideHandler";
import { errorHandling } from "../Helper/errorHandling";
import { tagMap } from "../Helper/modifyModpack";

const PackDetails = () => {
  const { modpackId: id } = useParams();
  const modpackId = id as string;

  const [packdetailMenuShow, setPackdetailMenuShow] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const { data, isError, isLoading, fetchStatus, error } =
    usePackDetailData(modpackId);

  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  useEffect(() => {
    setupClickOutsideHandler(menuRef, menuButtonRef, setPackdetailMenuShow);
  }, [menuRef, menuButtonRef, packdetailMenuShow]);

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
    imageUrl,
    galleryImageUrls,
    galleryThumbnailUrls,
    comments,
    voteCount,
    officialUrl,
    tags,
    suggestedBy,
    timesVoted,
  }: IPackDetails = data;

  const commentCount = comments
    ? comments.length
    : Math.floor(Math.random() * 10);

  return (
    <>
      <section
        id="modpack__details"
        className="flex w-full flex-col justify-normal self-start  text-text lg:justify-center "
      >
        <div className="relative z-10  shadow-2xl  shadow-bg/20 dark:shadow-none lg:max-w-4xl lg:justify-center lg:place-self-center lg:rounded-xl ">
          <div
            key={modpackId}
            className={` z-10 grid h-full items-center  lg:rounded-md  lg:shadow-2xl `}
          >
            <div className=" z-10 flex justify-between gap-2  px-8 pt-4  max-[350px]:flex-col sm:gap-0 md:px-4 ">
              {/* backarrow to the root page */}
              <Link
                className="flex min-w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
                to={"/"}
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
                {
                  //   sponsor this modpack button
                  user?.isLoggedIn && user?.inGuild && (
                    <Link
                      to={`/checkout/${modpackId}`}
                      className={` flex items-center rounded-md  bg-sec px-3 py-1 hover:bg-opacity-80 dark:hover:bg-hover-2`}
                    >
                      Sponsor Pack!
                    </Link>
                  )
                }
                {/* edit modpack button only is userProfile is superUser */}

                {user?.isLoggedIn && user?.isAdmin && (
                  <>
                    <button
                      className="flex  w-12 items-center justify-center "
                      id="dropdown-button-packdetails"
                      data-dropdown-toggle="dropdown"
                      type="button"
                      ref={menuButtonRef}
                      onClick={() => {
                        setPackdetailMenuShow(
                          packdetailMenuShow ? false : true
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM128,72a12,12,0,1,0-12-12A12,12,0,0,0,128,72Zm0,112a12,12,0,1,0,12,12A12,12,0,0,0,128,184Z"></path>
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
                              className="last:active:bg-text/15  mb-1 flex w-full  cursor-pointer gap-1 rounded-lg  px-4 py-2 transition-all delay-0 duration-200  ease-in-out hover:bg-text/10 "
                            >
                              Edit Modpack
                            </Link>
                          </li>
                          <li>
                            {/* delete modpack button only is userProfile is superUser */}
                            <button
                              disabled={deleteModpackMutation.isLoading}
                              className="last:active:bg-text/15  flex w-full   cursor-pointer rounded-lg  px-4 py-2 text-red-500 transition-all delay-0 duration-200 ease-in-out hover:bg-text/10 "
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
                              Delete Modpack
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
              <div className=" my-4 grid px-4 sm:grid-cols-2  md:space-x-4 ">
                {/* toggle images in production */}

                <LazyLoadImage
                  src={`https://www.trainjumper.com${imageUrl}`}
                  alt="Modpack Image"
                  width="412"
                  height="233"
                  className={`  mx-auto aspect-video max-h-52 place-self-center overflow-hidden rounded-md border-2 object-fill object-center     lg:max-h-60
               border-${borderColor}-500 bg-${borderColor}-500`}
                />
                <div className="grid w-full content-center items-center md:mr-4 md:space-y-4">
                  <p className="text-content my-4 break-normal text-center text-4xl uppercase  md:my-0 ">
                    {name}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <VoteForPackButton
                      modpackId={modpackId}
                      borderColor={borderColor}
                      isLoading={isLoading}
                      voteCount={voteCount}
                      timesVoted={timesVoted}
                    />
                  </div>
                  <p className="text-content my-4 break-normal text-center text-xs uppercase  md:my-0 ">
                    Suggested By:
                    <br /> <span className="text-text/50">{suggestedBy}</span>
                  </p>
                </div>
              </div>
              {/* map the image gallery to a collague */}
              {galleryImageUrls?.length > 1 && (
                <div className="my-4 px-4  ">
                  <h3 className="text-2xl capitalize xl:text-3xl ">Gallery</h3>
                  <div className="mt-2 flex flex-wrap justify-items-start gap-2 ">
                    {galleryImageUrls?.map((imageUrl, index) => (
                      <LazyLoadImage
                        key={index}
                        src={`https://www.trainjumper.com${imageUrl}`}
                        alt="Modpack Image"
                        width="81.3"
                        height="43.3"
                        className={`  aspect-video max-h-20 place-self-center overflow-hidden rounded-md border-2 object-fill object-center     lg:max-h-60
               border-${borderColor}-500 bg-${borderColor}-500`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* style the descripion to scroll on overflow and a max height of 364px */}
              <div className="  my-2 grid w-full  items-start justify-between gap-4 px-4 sm:grid-cols-2 sm:flex-row  md:gap-0 md:space-x-4">
                {/* map the tags */}
                <div className="flex flex-row">
                  {tags?.map((tag, index) => {
                    const label = tagMap.get(tag);

                    return (
                      <div
                        key={index}
                        className={`z-10 ml-2 flex items-center justify-start self-start rounded-full border-2 capitalize first:ml-4 border-${borderColor}-500 bg-bg px-2 py-0.5 text-sm text-text/80   `}
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

              <div className="xs:p-4 my-4 overflow-hidden px-2 py-4  ">
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
                      borderColor={borderColor}
                      replyingTo={false}
                      replyParentId=""
                    />
                  )}
                  {user?.isLoggedIn && !user?.isLinked && (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <p className="text-center  text-sm text-text/70">
                        Link your account to post comments and vote for packs.
                      </p>
                      <a className="text-xs text-blue-500 underline" href="/#">
                        More info here.
                      </a>
                    </div>
                  )}

                  {/* Map comments from api the the img, username, userId, and the comment from the user */}
                  {comments?.map((comment, index) => (
                    <div
                      key={index}
                      className="grid items-center justify-between pb-6 last:pb-0 "
                    >
                      <CommentsComponent
                        borderColor={borderColor}
                        comment={comment}
                      />
                    </div>
                  ))}
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
export default PackDetails;
