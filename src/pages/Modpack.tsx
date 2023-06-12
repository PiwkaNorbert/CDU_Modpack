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

const Modpack = () => {
  var { modpackId } = useParams();
  if (modpackId == undefined) {
    return <div>Loading</div>;
  }

  modpackId = modpackId as string;

  const { data, isError, isLoading } = usePackDetailData(modpackId);


  if (isLoading) return <Loading size="la-2x" fullScreen={true} other="" />;
  if (isError) return <div>Error</div>;


  const _userProfile = localStorage.getItem("user_profile");
  const userProfile: DiscordProfileData = _userProfile == null ? {
    isLoggedIn: false,
    id: '', avatar: '', global_name: '', username: ''
  } : JSON.parse(_userProfile);

  const { name, description, color, imageUrl, comments, votes, hasVoted }: IPackDetails =
    data;

  //  map the data in a  modern way with tailwind
  const borderColor = color ? color : "";

  return (
    <>
      <Header />
      <div className="grid justify-normal self-start md:justify-center ">


      <div className="  bg-bkg-100 shadow-mainContainer lg:my-2 lg:rounded-xl lg:max-w-4xl lg:justify-center lg:place-self-center ">
        <div
          key={modpackId}
          className={` grid items-center overflow-hidden lg:border-4 text-bkg-0 lg:rounded-md border-${borderColor}-500 h-full `}
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
          <div className={`grid  items-center `}>
            <div className=" m-4 grid px-4 sm:grid-cols-2 ">

              {/* toggle images in production */}
              <img
                src={`https://www.trainjumper.com${imageUrl}`}
                alt="random"
                className="  w-1/2 place-self-center rounded-md object-scale-down object-center sm:max-h-52 sm:w-full  sm:object-fill  lg:max-h-60 "
              />
              <div className="grid content-center items-center space-y-4">
                <p className="text-content my-4 text-center text-4xl uppercase   hyphens-auto  md:my-0 ">
                  {name}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <p
                    className={`flex h-10 items-center rounded-md border px-3 py-1 border-${borderColor}-500`}
                  >
                    {votes == 0 ? "No votes" : `${votes} ${votes == 1 ? "Vote" : "Votes"}`}
                  </p>
                  <VoteForPackButton
                    modpackId={modpackId}
                    hasVoted={hasVoted}
                    borderColor={borderColor}
                    userProfile={userProfile}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
            {/* style the descripion to scroll on overflow and a max height of 364px */}
            <div className="m-4 px-4  ">
              <h3 className="text-2xl capitalize ">description</h3>
              <div className=" max-h-64 overflow-y-auto p-4 shadow-inner  ">
                <p className="text-content text-justify">{description}</p>
              </div>
            </div>

            <div className="m-4 p-4  ">
              <h3 className="text-2xl capitalize ">
                comments ({comments.length})
              </h3>
              {/* input for posting comments by current user */}
              <div className="   px-4 ">
                <PostComment modpackId={modpackId} borderColor={borderColor} />
                {/* Map comments from api the the img, username, userId, and the comment from the user */}
                {comments.map(
                  (comment: IComment, index: number) => {
                    return (
                      <CommentsComponent
                        index={index}
                        borderColor={borderColor}
                        comment={comment}
                      />
                    );
                  }
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
export default Modpack;

