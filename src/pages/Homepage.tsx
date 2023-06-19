import { useState } from "react";
import { IModpack } from "../data";
import useModpackData from "../API/useModpackData";

const Homepage = () => {
  const { data, isLoading, isError } = useModpackData();

  // set state for a button to scroll to the top of the page
  const [pageBottom, setPageBottom] = useState(false);

  window.addEventListener("scroll", () => {
    window.innerHeight + window.scrollY >= document.body.offsetHeight
      ? setPageBottom(true)
      : setPageBottom(false);
  });

  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="grid  justify-normal self-center md:justify-center  lg:justify-center">
        <div className="bg-bkg-100  my-4 overflow-hidden  shadow-mainContainer   md:rounded-xl">
          {/* map the data variable in a grad 4x2  */}
          <div className="text-bgk-100 border-bkg-200 bg-bkg-600 flex items-center justify-between border-b-4 p-3 text-xl  ">
            <p>Modpacks</p>
            {/* Show this button if you're logged in and a staff member */}
            <button className="text-content  h-10 rounded-md  bg-[#22B14C] px-3 py-1 text-sm">
              Add Modpack
            </button>
          </div>
          <div className=" grid  grid-cols-2 gap-5 p-5 max-[400px]:grid-cols-1 sm:grid-cols-3  md:grid-cols-3  lg:max-w-4xl lg:grid-cols-4   ">
            {isLoading ? (
              <div className="text-bkg-0">Loading...</div>
            ) : (
              data.map(({ modpackId, name, imageUrl, color }: IModpack) => {
                const borderColor = color ? `border-${color}-300` : "";

                return (
                  <div
                    key={modpackId}
                    className={`text-bkg-0 flex  items-start justify-center overflow-hidden rounded-md border-4 ${borderColor} `}
                  >
                    <a
                      href={`/modpack/${modpackId}`}
                      className={`grid h-full flex-1 justify-items-center `}
                    >
                      <img
                        src={`https://www.trainjumper.com${imageUrl}`}
                        alt="random"
                        className=" max-h-26 w-full  object-fill object-center"
                      />
                      <p className="text-content flex justify-center px-2 py-4 text-center uppercase">
                        {name}
                      </p>
                    </a>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div
          className=" p-body-inner  m-4 mt-0 flex items-center justify-end md:mr-0 lg:mr-0
          "
        >
          <div className="bg-bkg-100 text-bkg-0 mr-4 w-fit rounded-lg px-2 py-1 shadow-mainContainer ">
            <a href="/login/" className="text-sm" data-xf-click="overlay">
              <span className="button-text">
                You must log in or register to vote.
              </span>
            </a>
          </div>
          {/* button to scroll to the top of the page */}
          {pageBottom ? (
            <button
              className=" bg-bkg-300 flex h-10 w-10 items-center justify-center rounded-full text-sm"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ^
            </button>
          ) : (
            <div className="h-10 w-10"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Homepage;
