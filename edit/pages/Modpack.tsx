import { useParams } from "react-router-dom";
import usePackDetailData from "../API/usePackDetailData";
import { CommentsComponent } from "../components/CommentsComponent";
import { IComment, IPackDetails } from "../UTILS/Interfaces";
import VoteForPackButton from "../components/VoteForPackButton";

const Modpack = () => {
  const { modpackId: id  } = useParams();
  const modpackId = id as string;

  const { data, isError, isLoading } = usePackDetailData(modpackId );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const { name, description, imageUrl, color, comments,  voteCount }: IPackDetails =
    data;

  //  map the data in a  modern way with tailwind
  const borderColor = color ? color : "";
console.log(`https://www.trainjumper.com${imageUrl}`);

  return (
    <>
      <div className="grid  justify-normal self-center md:justify-center ">
        <div className="  bg-bkg-100 shadow-mainContainer md:rounded-xl  lg:max-w-4xl lg:justify-center lg:place-self-center">
          <div
            key={modpackId}
            className={` grid items-center overflow-hidden border-4 text-bkg-0 md:rounded-md border-${borderColor}-500`}
          >
            {/* backarrow to the root page */}
            <div className="flex  items-center justify-start px-4 pt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 text-${borderColor}-500 cursor-pointer `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  onClick={() => (window.location.href = "/")}
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <div className={`grid  items-center `}>
              <div className=" m-4 grid px-4 sm:grid-cols-2 ">
                <img
                  src={`https://www.trainjumper.com${imageUrl}`}
                  alt="random"
                  className="  w-1/2 place-self-center rounded-md object-scale-down object-center sm:max-h-52 sm:w-full  sm:object-fill  lg:max-h-60 "
                />
                <div className="grid content-center items-center space-y-4">
                  <p className="text-content my-4 text-center text-4xl uppercase md:my-0 ">
                    {name}
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <p
                      className={`flex h-10 items-center rounded-md border px-3 py-1 border-${borderColor}-500`}
                    >
                      {voteCount} Votes
                    </p>
                    <VoteForPackButton
                      modpackId={modpackId}
                      timesVoted={voteCount}
                      borderColor={borderColor}
                      // this is the number of votes
                    />
                  </div>
                </div>
              </div>
              {/* style the descripion to scroll on overflow and a max height of 364px */}
              <div className="mx-4 px-4  ">
                <h3 className="text-2xl capitalize ">description</h3>
                <div className=" max-h-64 overflow-y-auto p-4 shadow-inner  ">
                  <p className="text-content text-justify">{description}</p>
                </div>
              </div>

              <div className="mx-4 px-4  ">
                <h3 className="text-2xl capitalize ">
                  comments ({comments.length})
                </h3>
                <div className="   p-4 ">
                  {/* Map comments from api the the img, username, userId, and the comment from the user */}
                  {comments.map(
                    ({ comment }: IComment, index: number) => {
                      
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
      </div>
    </>
  );
};
export default Modpack;


