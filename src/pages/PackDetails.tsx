import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { CommentsComponent } from "../components/CommentsComponent";
import { IPackDetails } from "../UTILS/Interfaces";
import { IComment } from "../UTILS/Interfaces";
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from "../components/Footer";
import Loading  from "../components/Loading";
import VoteForPackButton from "../components/VoteForPackButton";
import PostComment from "../components/PostComment";
import { useUser } from "../HELPER/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { LoginButton } from "../components/LoginButton";
import { useQueryClient } from "@tanstack/react-query";
const PackDetails = () => {
  const { modpackId: id } = useParams();
  const modpackId = id as string;
  
  const { data, isError, isLoading, fetchStatus, error } = usePackDetailData(modpackId);
  const {user} = useUser()
  const queryClient = useQueryClient();

  const isDev = import.meta.env.VITE_NODE_ENV === "development";
  const apiBase = isDev ? 'https://www.trainjumper.com' : '';
  
  if(isLoading) return <Loading size='la-lx' fullScreen={true} other="" />
  if(isError) return <p>{error?.message}</p>

  const { name, description, color, imageUrl, comments, timesVoted, voteCount,suggestedBy }: IPackDetails =
  data;
  const commentCount = comments ? comments.length : Math.floor(Math.random() * 10)

  //  map the data in a  modern way with tailwind
  const borderColor = color ? color : "";
// console.log(timesVoted);
console.log(comments);


return (
  <>
    <div className="flex flex-col w-full justify-normal text-text self-start lg:justify-center bg-bg ">

    <div className="  bg-bg shadow-2xl shadow-bg/20 dark:shadow-none  lg:my-2 lg:rounded-xl lg:max-w-4xl lg:justify-center lg:place-self-center ">

      <div
        key={modpackId}
        className={` grid items-center overflow-hidden lg:border-4 lg:rounded-md border-${borderColor}-500 h-full `}
      >
        {/* backarrow to the root page */}
        <div  className="flex max-[350px]:flex-col justify-between  gap-2 sm:gap-0  px-8 md:px-4 pt-4 ">
          <div className="flex items-center gap-2 text-text dark:hover:bg-hover-2 min-w-fit hover:bg-hover-1 hover:text-text px-3 py-1 cursor-pointer rounded-md"
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

          <div className="flex  max-[350px]:flex-col max-[350px]:mt-5 gap-2 text-sm xl:text-base text-bg dark:text-text ">

          {/* edit modpack button only is userProfile is superUser */}
          {user?.isLoggedIn && user?.isAdmin && (

            <>
              <button
                className={` bg-sec  dark:hover:bg-hover-2 hover:bg-hover-1 hover:text-text px-3 py-1 rounded-md`}
                onClick={() => (window.location.href = `/edit-modpack/${modpackId}`)}
              > 
                Edit Modpack
              </button>


            {/* delete modpack button only is userProfile is superUser */}
              <button
                className={` border border-sec text-red-500 font-thin dark:hover:bg-hover-2 hover:bg-hover-1 t px-3 py-1 rounded-md`}
                onClick={async () => {

                  if(prompt("Are you sure you want to delete this modpack?\nType 'yes' to confirm") !== "yes")  {
                    return   toast.error("Modpack not deleted")
                  }
                    
                  try {
                  const res = await axios.delete(`${apiBase}/api/delete-modpack`,
                    {
                      withCredentials: true,
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: {
                        modpackId
                      }
                    }
                    )
                    res.status !== 200 && console.error(res)

                    queryClient.invalidateQueries(["modpacks","details",modpackId])

                    toast.success("Modpack deleted")
                    return window.location.href = "/"
                    
                  } catch (error:  Error | unknown | string) {
                    console.error(error)
                    toast.error("Error: Couldn't delete Modpack")
                    throw new Error(error as string)
                  }

                }}
              >
                
                Delete Modpack
              </button>
            </>
            )
            }

           
          </div>

        </div>
        <div className={`grid md:mx-4 items-center `}>
          <div className=" my-4 grid px-4 sm:grid-cols-2  md:space-x-4 ">

            {/* toggle images in production */}
<<<<<<< HEAD
=======
            <div className={` rounded-md ml-4 overflow-hidden border-2 border-${borderColor}-500 bg-${borderColor}-500 `}>
>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0

            <img
              src={`https://www.trainjumper.com${imageUrl}`}
              alt="random"
<<<<<<< HEAD
              className={`"lg:w-full place-self-center rounded-md mx-4 overflow-hidden border-2 object-scale-down object-center sm:max-h-52 sm:w-full  sm:object-fill  lg:max-h-60
               border-${borderColor}-500 bg-${borderColor}-500`}
              />
=======
              className="   lg:w-full  place-self-center   object-scale-down object-center sm:max-h-52 sm:w-full  sm:object-fill  lg:max-h-60 "
              />
              </div>
>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0
            <div className="grid content-center w-full items-center md:space-y-4 md:mr-4">
              <p className="text-content my-4 text-center text-4xl uppercase break-normal  md:my-0 ">
                {name}
              </p>
              <div className="flex items-center justify-center gap-4">
               
                <VoteForPackButton
                  modpackId={modpackId}
                  timesVoted={timesVoted}
                  borderColor={borderColor}
                  isLoading={isLoading}
                  voteCount={voteCount}
                />
              </div>
              <p className="text-content my-4 text-center text-xs uppercase break-normal  md:my-0 ">
               Suggested By:<br /> <span className="text-text/50">
                 {suggestedBy}
                </span>
              </p>
            </div>
          </div>
          {/* style the descripion to scroll on overflow and a max height of 364px */}
          <div className="my-4 px-4  ">
            <h3 className="text-2xl xl:text-3xl capitalize ">description</h3>
            <div className=" max-h-64 overflow-y-auto p-4 shadow-inner  ">
              <p className="text-content text-justify">{description}</p>
            </div>
          </div>

<<<<<<< HEAD
          <div className="my-4 py-4 px-2 xs:p-4  ">
=======
          <div className="my-4 p-4  ">
>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0
            <h3 className="text-2xl xl:text-3xl capitalize  flex gap-4 justify-start items-center ">
              comments ({commentCount}) {fetchStatus=== "fetching" && <Loading size="la-sm" fullScreen={false} other="inline-block"/>}
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
                    <LoginButton  /> 
                  </div>
                ) : (
                  <PostComment modpackId={modpackId} borderColor={borderColor}/>
                )
              }
              {/* Map comments from api the the img, username, userId, and the comment from the user */}
              {comments.map(
                (comment: IComment, index: number) => 
        
                    <CommentsComponent
                      key={index}
                      borderColor={borderColor}
                      comment={comment}
                    />
                  
                
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</>
);
};
export default PackDetails;

