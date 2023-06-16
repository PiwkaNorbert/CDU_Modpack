import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { Header } from "../components/Header";
import { CommentsComponent } from "../components/CommentsComponent";
import { IPackDetails } from "../UTILS/Interfaces";
import { DiscordProfileData, IComment } from "../UTILS/Interfaces";
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from "../components/Footer";
import Loading  from "../components/Loading";
import VoteForPackButton from "../components/VoteForPackButton";
import PostComment from "../components/PostComment";

const PackDetails = () => {
  var { modpackId } = useParams();
  if (modpackId == undefined) {
    return <div>Loading</div>;
  }
  const { data, isError, isLoading, fetchStatus } = usePackDetailData(modpackId);

  modpackId = modpackId as string;



  if (isLoading) return <Loading size="la-2x" fullScreen={true} other="" />;
  if (isError) return <div>Error</div>;


  const _userProfile = localStorage.getItem("user_profile");
  const userProfile: DiscordProfileData = _userProfile == null ? {
    isLoggedIn: false,
    id: '', avatar: '', globalName: '', username: '', isAdmin: false
  } : JSON.parse(_userProfile);

  const { name, description, color, imageUrl, comments, timesVoted, voteCount }: IPackDetails =
    data;

  //  map the data in a  modern way with tailwind
  const borderColor = color ? color : "";
// console.log(timesVoted);

  return (
    <>
      <Header />
      <div className="grid w-full justify-normal text-text self-start md:justify-center bg-bg ">


      <div className="  bg-bg shadow-2xl shadow-bg/20 dark:shadow-none  lg:my-2 lg:rounded-xl lg:max-w-4xl lg:justify-center lg:place-self-center ">
        <div
          key={modpackId}
          className={` grid items-center overflow-hidden lg:border-4 lg:rounded-md border-${borderColor}-500 h-full `}
        >
          {/* backarrow to the root page */}
          <div onClick={() => (window.location.href = "/")} className="flex w-fit items-center justify-start px-4 pt-4 cursor-pointer">
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
          </div>
          <div className={`grid md:mx-4 items-center `}>
            <div className=" my-4 grid px-4 sm:grid-cols-2 md:space-x-4 ">

              {/* toggle images in production */}
              <img
                src={`https://www.trainjumper.com${imageUrl}`}
                alt="random"
                className="  lg:w-1/2 place-self-center rounded-md object-scale-down object-center sm:max-h-52 sm:w-full  sm:object-fill  lg:max-h-60 "
              />
              <div className="grid content-center w-full items-center md:space-y-4 md:mr-4">
                <p className="text-content my-4 text-center text-4xl uppercase break-normal  md:my-0 ">
                  {name}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <p
                    className={`flex h-10 items-center rounded-md border px-3 py-1 border-${borderColor}-500`}
                  >
                    {voteCount == 0 ? "No votes" : `${voteCount} ${voteCount === 1 ? "Vote" : "Votes"}`}
                  </p>
                  <VoteForPackButton
                    modpackId={modpackId}
                    timesVoted={timesVoted}
                    borderColor={borderColor}
                    userProfile={userProfile}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
            {/* style the descripion to scroll on overflow and a max height of 364px */}
            <div className="my-4 px-4  ">
              <h3 className="text-2xl xl:text-3xl capitalize ">description</h3>
              <div className=" max-h-64 overflow-y-auto p-4 shadow-inner  ">
                <p className="text-content text-justify">{description}</p>
              </div>
            </div>

            <div className="my-4 p-4  ">
              <h3 className="text-2xl xl:text-3xl capitalize flex gap-4 justify-start items-center ">
                comments ({comments.length}) {fetchStatus=== "fetching" && <Loading size="la-sm" fullScreen={false} other="inline-block"/>}
              </h3>
              {/* input for posting comments by current user */}
              <div className=" px-4 ">
                <PostComment modpackId={modpackId} borderColor={borderColor} />
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
      <Footer borderColor={borderColor} />
    </div>
  </>
  );
};
export default PackDetails;

