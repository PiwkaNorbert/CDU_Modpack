import React from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import usePackDetailData, { IPackDetails } from "../API/usePackDetailData";
import { Header } from "../components/Header";
import { CommentsComponent } from "../components/CommentsComponent";
import { IComments } from "../UTILS/Interfaces";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const Modpack = () => {
  const { modpackId } = useParams();

  const { data, isError, isLoading } = usePackDetailData(modpackId);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const { name, description, imageUrl, color, comments, votes }: IPackDetails =
    data;

  //  map the data in a  modern way with tailwind
  const borderColor = color ? color : "";

  return (
    <>
      <Header />
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
                  onClick={() => (window.location = "/")}
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </div>
            <div className={`grid  items-center `}>
              <div className=" m-4 grid px-4 sm:grid-cols-2 ">
                <img
                  src={`http://www.trainjumper.com:7270${imageUrl}`}
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
                      {votes} Votes
                    </p>
                    <VoteForPackButton
                      modpackId={modpackId}
                      votes={votes}
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
                    ({ username, comment }: IComments, index: number) => {
                      return (
                        <CommentsComponent
                          index={index}
                          borderColor={borderColor}
                          username={username}
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

// function VoteForPackButton({ borderColor, hasVoted }) {
//   const changeVote = (add) => {
//     const vote = add === "add-vote" ? "add-vote" : "remove-vote";
//     console.log(vote);
//     const { modpackId } = useParams();

//     const url = import.meta.env.VITE_URL
//       ? import.meta.env.VITE_URL
//       : "http://www.trainjumper.com:7270/";

//     return useMutation({
//       mutationFn: async () => {
//         const res = await axios.post(`${url}${vote}/${modpackId}`);
//         console.log(res);

//         if (res.status !== 200) throw new Error("No data found");

//         return console.log(res);
//       },
//     });
//   };
//   const changeVoteMutation = useMutation(changeVote);

//   return (
//     <button
//       className={`text-content  h-10 rounded-md  bg-${borderColor}-500 px-3 py-1 text-sm`}
//       onClick={() => {
//         return hasVoted
//           ? changeVoteMutation.mutate("add-vote")
//           : changeVoteMutation.mutate("remove-vote");
//       }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className={`h-6 w-6`}
//         fill="currrntColor"
//         viewBox="0 0 256 256"
//       >
//         <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
//       </svg>
//     </button>
//   );
// }

function VoteForPackButton({ borderColor, hasVoted }) {
  return (
    <button
      className={`text-content  h-10 rounded-md  bg-${borderColor}-500 px-3 py-1 text-sm`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6`}
        fill="currrntColor"
        viewBox="0 0 256 256"
      >
        <path d="M240,94c0,70-103.79,126.66-108.21,129a8,8,0,0,1-7.58,0C119.79,220.66,16,164,16,94A62.07,62.07,0,0,1,78,32c20.65,0,38.73,8.88,50,23.89C139.27,40.88,157.35,32,178,32A62.07,62.07,0,0,1,240,94Z"></path>
      </svg>
    </button>
  );
}
