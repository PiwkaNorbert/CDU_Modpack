import React from "react";
import { IModpack } from "../Utils/Interfaces";
import useModpackData from "../API/useModpackData";
import ModpackCard from "../Components/ModpackCard";
import { useUser } from "../Context/useUser";
import { useQueryClient } from "@tanstack/react-query";

const PackListPage = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useModpackData(queryClient);

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
      <section
        id="modpack__gallery"
        className="grid h-screen  w-full justify-normal self-center text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
      >
        {/* set the width to ffit the content and assign them to sm md lg for the container  like lg:max-w-[1000px]
        below and assthese same things to the nav width*/}
        <div className="relative h-min overflow-hidden border-t-2 bg-bg dark:border-none dark:shadow-none md:mb-4 md:rounded-xl  md:border-none md:shadow-xl  ">
          {/* map the data variable in a grad 4x2  */}
          <div className="md:space-x-none  flex   justify-between   space-x-4 p-5 text-xl text-text xl:text-2xl ">
            <p className="z-10">Modpacks</p>
            {/* Show this button if you're logged in and a staff member */}
            {user?.isAdmin && (
              <button
                className="transition-bg z-10 h-10 rounded-md bg-gradient-to-r from-acc to-pri bg-size-200 bg-pos-0 
              px-3 py-1 text-sm text-bg duration-200 hover:bg-pos-100 dark:text-text xl:text-base"
                onClick={() => (window.location.href = `/add-modpack`)}
              >
                Add Modpack
              </button>
            )}
          </div>
          <div className=" grid  grid-cols-2 gap-5 p-5 max-[400px]:grid-cols-1 sm:grid-cols-3  md:grid-cols-3   lg:grid-cols-4   ">
            {isLoading ? (
              <div className="col-span-full text-center">Loading...</div>
            ) : isError ? (
              <div className="col-span-full "> {error.message}</div>
            ) : data.length === 0 ? (
              <div className="col-span-full text-center">No Modpacks</div>
            ) : (
              data.map(
                (
                  {
                    modpackId,
                    name,
                    imageUrl,
                    color,
                    voteCount,
                    commentCount,
                    hasVoted,
                  }: IModpack,
                  index: number
                ) => {
                  return (
                    <ModpackCard
                      key={index}
                      modpackId={modpackId}
                      name={name}
                      imageUrl={imageUrl}
                      color={color}
                      voteCount={voteCount}
                      commentCount={commentCount}
                      hasVoted={hasVoted}
                    />
                  );
                }
              )
            )}
          </div>
          <div className="absolute inset-0 h-full w-full flex-1 bg-text opacity-5"></div>
        </div>
        <div className="p-body-inner m-4  mt-0 flex  h-10   items-center justify-end md:mr-0 lg:mr-0">
          {/* button to scroll to the top of the page */}
          {pageBottom ? (
            <button
              className=" flex w-10 items-center  justify-center rounded-full bg-pri text-sm hover:bg-hover-1 dark:hover:bg-hover-2 xl:text-base"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ^
            </button>
          ) : (
            <div className="h-10 w-10"></div>
          )}
        </div>
      </section>
      {/* <Footer borderColor="red" /> */}
    </>
  );
};

export default PackListPage;
