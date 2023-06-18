import React from "react";
import { IModpack } from "../UTILS/Interfaces";
import { Footer } from "../components/Footer";
import useModpackData from "../API/useModpackData";
import  ModpackCard  from "../components/ModpackCard";
import { useUser } from "../HELPER/UserContext";
const PackListPage = () => {
  const { data, isLoading, isError, error } = useModpackData();

  // set state for a button to scroll to the top of the page
  const [pageBottom, setPageBottom] = React.useState(false);

  const { user } = useUser();

  window.addEventListener("scroll", () => {
    window.innerHeight + window.scrollY >= document.body.offsetHeight
      ? setPageBottom(true)
      : setPageBottom(false);
  });

  

  // const login = useQuery(["login"], fetchLogin, { keepPreviousData: true });

  return (
    <>
      <div className="grid  text-text w-full lg:min-w-[900px] lg:max-w-[900px] lg:mx-auto justify-normal self-center ">
        {/* set the width to ffit the content and assign them to sm md lg for the container  like lg:max-w-[1000px]
        below and assthese same things to the nav width*/}
        <div className="md:mb-4 border-t-2 md:border-none h-min relative overflow-hidden bg-bg md:shadow-xl dark:shadow-none  dark:border-none md:rounded-xl  ">
          {/* map the data variable in a grad 4x2  */}
          <div className="text-text  flex   justify-between   p-5 text-xl xl:text-2xl space-x-4 md:space-x-none ">
            <p className="z-10">Modpacks</p>
            {/* Show this button if you're logged in and a staff member */}
            {user?.isAdmin && (

              <button  className="rounded-md h-10 z-10 text-bg dark:text-text px-3 py-1 text-sm xl:text-base 
              transition-bg duration-200 bg-gradient-to-r to-pri from-acc bg-size-200 bg-pos-0 hover:bg-pos-100"
              onClick={() => (window.location.href = `/add-modpack`)}
              >
             Add Modpack
            </button>
              )}
          </div>
          <div className=" grid  grid-cols-2 gap-5 p-5 max-[400px]:grid-cols-1 sm:grid-cols-3  md:grid-cols-3   lg:grid-cols-4   ">
            {isLoading ? (
              <div className="col-span-full text-center">Loading...</div>
            )  : isError ? <div className="col-span-full "> {error.message}</div> : 
            data.length === 0 ? ( 
              <div className="col-span-full text-center">No Modpacks</div>
            ) :
            (
              data.map(({ modpackId, name, imageUrl, color, voteCount, commentCount }: IModpack, index: number) => {
                return <ModpackCard key={index} modpackId={modpackId} name={name} imageUrl={imageUrl} color={color} voteCount={voteCount} commentCount={commentCount} />
              })
            )}
          </div>
          <div className="absolute w-full h-full inset-0 flex-1 opacity-5 bg-text"></div>
        </div>
        <div className="p-body-inner flex-1  m-4 mt-0 flex items-center justify-end md:mr-0 lg:mr-0">
          
          {/* button to scroll to the top of the page */}
          {pageBottom ? (
            <button
              className=" flex h-10 w-10 items-center justify-center rounded-full bg-pri text-sm xl:text-base"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ^
            </button>
          ) : (
            <div className="h-10 w-10"></div>
          )}
        </div>
      </div>
      {/* <Footer borderColor="red" /> */}
    </>
  );
};

export default PackListPage;
