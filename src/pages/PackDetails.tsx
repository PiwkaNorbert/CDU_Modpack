import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { CommentsComponent } from "../components/CommentsComponent";
import { IPackDetails } from "../UTILS/Interfaces";
import Loading from "../components/Loading";
import VoteForPackButton from "../components/VoteForPackButton";
import PostComment from "../components/PostComment";
import { useUser } from "../Context/useUser";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginButton } from "../components/LoginButton";
import { useQueryClient } from "@tanstack/react-query";

const PackDetails = () => {
  const { modpackId: id } = useParams();
  const modpackId = id as string;

  const { data, isError, isLoading, fetchStatus, error } =
    usePackDetailData(modpackId);
  const { user } = useUser();
  const queryClient = useQueryClient();

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
    suggestedBy,
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
        <div className="  bg-bg shadow-2xl shadow-bg/20 dark:shadow-none  lg:my-2 lg:max-w-4xl lg:justify-center lg:place-self-center lg:rounded-xl ">
          <div
            key={modpackId}
            className={` grid items-center overflow-hidden lg:rounded-md lg:border-4 border-${borderColor}-500 h-full `}
          >
            {/* backarrow to the root page */}
            <div className="flex justify-between gap-2  px-8 pt-4  max-[350px]:flex-col sm:gap-0 md:px-4 ">
              <div
                className="flex min-w-fit cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-hover-1 hover:text-text dark:hover:bg-hover-2"
                onClick={() => (window.location.href = "/")}
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
              </div>

              <div className="flex  gap-2 text-sm text-bg dark:text-text max-[350px]:mt-5 max-[350px]:flex-col xl:text-base ">
                {/* edit modpack button only is userProfile is superUser */}
                {user?.isLoggedIn && user?.isAdmin && (
                  <>
                    <button
                      className={` rounded-md  bg-sec px-3 py-1 hover:bg-hover-1 hover:text-text dark:hover:bg-hover-2`}
                      onClick={() =>
                        (window.location.href = `/edit-modpack/${modpackId}`)
                      }
                    >
                      Edit Modpack
                    </button>

                    {/* delete modpack button only is userProfile is superUser */}
                    <button
                      className={` t rounded-md border border-sec px-3 py-1 font-thin text-red-500 hover:bg-hover-1 dark:hover:bg-hover-2`}
                      onClick={async () => {
                        if (
                          prompt(
                            "Are you sure you want to delete this modpack?\nType 'yes' to confirm"
                          ) !== "yes"
                        ) {
                          return toast.error("Modpack not deleted");
                        }

                        try {
                          const res = await axios.delete(
                            `${apiBase}/api/delete-modpack`,
                            {
                              withCredentials: true,
                              headers: {
                                "Content-Type": "application/json",
                              },
                              data: {
                                modpackId,
                              },
                            }
                          );
                          res.status !== 200 && console.error(res);

                          queryClient.invalidateQueries([
                            "modpacks",
                            "details",
                            modpackId,
                          ]);

                          toast.success("Modpack deleted");
                          return (window.location.href = "/");
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
            <div className={`grid items-center md:mx-4 `}>
              <div className=" my-4 grid px-4 sm:grid-cols-2  md:space-x-4 ">
                {/* toggle images in production */}

                <img
                  src={`https://www.trainjumper.com${imageUrl}`}
                  alt="random"
                  className={`"lg:w-full mx-4 place-self-center overflow-hidden rounded-md border-2 object-scale-down object-center sm:max-h-52 sm:w-full  sm:object-fill  lg:max-h-60
               border-${borderColor}-500 bg-${borderColor}-500`}
                />
                <div className="grid w-full content-center items-center md:mr-4 md:space-y-4">
                  <p className="text-content my-4 break-normal text-center text-4xl uppercase  md:my-0 ">
                    {name}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <VoteForPackButton
                      modpackId={modpackId}
                      borderColor={borderColor}
                      isLoading={isLoading}
                      voteCount={voteCount}
                    />
                  </div>
                  <p className="text-content my-4 break-normal text-center text-xs uppercase  md:my-0 ">
                    Suggested By:
                    <br /> <span className="text-text/50">{suggestedBy}</span>
                  </p>
                </div>
              </div>
              {/* style the descripion to scroll on overflow and a max height of 364px */}
              <div className="my-4 px-4  ">
                <h3 className="text-2xl capitalize xl:text-3xl ">
                  description
                </h3>
                <div className=" max-h-64 overflow-y-auto p-4 shadow-inner  ">
                  <p className="text-content text-justify">{description}</p>
                </div>
              </div>

              <div className="xs:p-4 my-4 px-2 py-4  ">
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
                    !user ? (
                      <div className="flex flex-col items-center justify-center gap-4">
                        <p className="text-content text-center">
                          Login to post a comment
                        </p>
                        <LoginButton />
                      </div>
                    ) : (
                      <PostComment
                        modpackId={modpackId}
                        borderColor={borderColor}
                      />
                    )
                  }
                  {/* Map comments from api the the img, username, userId, and the comment from the user */}
                  {comments.map((comment, index) => (
                    <CommentsComponent
                      index={index}
                      borderColor={borderColor}
                      comment={comment}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PackDetails;
