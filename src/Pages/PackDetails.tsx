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
import { useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, Link } from "react-router-dom";

const PackDetails = () => {
  const { modpackId: id } = useParams();
  const modpackId = id as string;

  const { data, isError, isLoading, fetchStatus, error } =
    usePackDetailData(modpackId);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? "https://www.trainjumper.com" : "";

  if (isLoading) return <Loading size="la-lx" fullScreen={true} other="" />;
  if (isError) return <p>{error?.message}</p>;

  const {
    name,
    description,
    color: borderColor,
    imageUrl,
    comments,
    voteCount,
    officialUrl,
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
        className="flex w-full flex-col justify-normal self-start bg-bg text-text lg:justify-center "
      >
        <div className="relative z-10  bg-bg shadow-2xl shadow-bg/20 dark:shadow-none lg:max-w-4xl lg:justify-center lg:place-self-center lg:rounded-xl ">
          <div
            key={modpackId}
            className={` z-10 grid h-full items-center lg:rounded-md  lg:shadow-2xl `}
          >
            <div className="z-10 flex justify-between gap-2  px-8 pt-4  max-[350px]:flex-col sm:gap-0 md:px-4 ">
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
                  !user?.isLoggedIn && !user?.inGuild && (
                    <Link
                      to={`/checkout/${modpackId}`}
                      className={` flex items-center rounded-md  bg-sec px-3 py-1 hover:bg-opacity-80 dark:hover:bg-hover-2`}
                    >
                      Sponsor this modpack
                    </Link>
                  )
                }

                {/* edit modpack button and delete modpack*/}
                {user?.isLoggedIn && user?.isAdmin && (
                  <>
                    <Link
                      to={`/edit-modpack/${modpackId}`}
                      className={` flex items-center rounded-md  bg-sec px-3 py-1 hover:bg-opacity-80 dark:hover:bg-hover-2`}
                    >
                      Edit Modpack
                    </Link>

                    <button
                      className={` rounded-md border border-sec px-3 py-1 font-thin text-red-500 hover:border-opacity-20 hover:bg-sec hover:bg-opacity-20 dark:hover:bg-hover-2`}
                      onClick={async () => {
                        if (
                          prompt(
                            "Are you sure you want to delete this modpack?\nType 'yes' to confirm"
                          ) !== "yes"
                        ) {
                          return toast.error("Modpack not deleted");
                        }

                        try {
                          const res = await toast.promise(
                            axios.delete(`${apiBase}/api/delete-modpack`, {
                              withCredentials: true,
                              headers: {
                                "Content-Type": "application/json",
                              },
                              data: {
                                modpackId,
                              },
                            }),
                            {
                              pending: "Deleting Modpack...",
                              success: "Modpack deleted",
                              error: "Error: Couldn't delete Modpack",
                            }
                          );
                          res.status !== 200 && console.error(res);

                          queryClient.invalidateQueries([
                            "modpacks",
                            "details",
                            modpackId,
                          ]);
                          queryClient.setQueryData(
                            ["modpacks"],
                            (oldData: any) => {
                              return oldData.filter(
                                (modpack: IModpack) =>
                                  modpack.modpackId !== modpackId
                              );
                            }
                          );

                          return navigate("/");
                        } catch (error: Error | unknown | string) {
                          console.error(error);
                          toast.error("Error: Couldn't delete Modpack");
                          throw new Error(error as string);
                        }
                      }}
                    >
                      Delete Modpack
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className={`z-10 grid items-center md:mx-4 `}>
              <div className=" my-4 grid px-4 sm:grid-cols-2  md:space-x-4 ">
                {/* toggle images in production */}

                <LazyLoadImage
                  src={`https://www.trainjumper.com${imageUrl}`}
                  alt="random"
                  width="412"
                  height="233"
                  placeholderSrc={`/src/assets/placeholderImg.png`}
                  className={`  mx-auto aspect-video place-self-center overflow-hidden rounded-md border-2 object-cover object-center sm:max-h-52   sm:object-fill  lg:max-h-60
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
              {/* style the descripion to scroll on overflow and a max height of 364px */}
              <div className=" flex w-full flex-col items-center justify-center gap-2 px-4 sm:flex-row md:mt-4">
                Modpack official page:{" "}
                <Link
                  to={officialUrl}
                  className={` flex items-center gap-1 text-${borderColor}-500 hover:opacity-80`}
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
              <div className="my-4 px-4  ">
                <h3 className="text-2xl capitalize xl:text-3xl ">
                  description
                </h3>
                <div className=" max-h-64 overflow-y-auto p-4 shadow-inner  ">
                  <p className="text-content text-justify">{description}</p>
                </div>
              </div>

              <div className="xs:p-4 my-4 overflow-hidden px-2 py-4  ">
                <h3 className="flex items-center justify-start  gap-4 text-2xl capitalize xl:text-3xl ">
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
                <div className=" px-4 ">
                  {
                    // if user is not logged in, show login button
                    user?.isLoggedIn ? (
                      <PostComment
                        modpackId={modpackId}
                        borderColor={borderColor}
                        replyingTo={false}
                        replyParentId=""
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-content text-center">
                          Login to post a comment
                        </p>
                        <LoginButton />
                      </div>
                    )
                  }
                  {/* Map comments from api the the img, username, userId, and the comment from the user */}
                  {comments?.map((comment, index) => (
                    <div
                      key={index}
                      className="grid items-center justify-between"
                    >
                      <CommentsComponent
                        borderColor={borderColor}
                        comment={comment}
                        replyingTo={false}
                        replyParentId=""
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
