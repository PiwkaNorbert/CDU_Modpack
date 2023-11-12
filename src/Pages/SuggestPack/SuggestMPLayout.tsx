import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AddModpack = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <section
      id="modpack__addpack"
      className="z-[5] grid h-full w-full  flex-1 justify-normal  text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
    >
      <div className="relative h-min overflow-hidden border-t-2 bg-sec/20 pb-4 dark:border-none dark:shadow  md:mb-4 md:rounded-b-md  md:border-none md:shadow-xl  ">
        <div className={` z-10 grid h-full items-center  lg:rounded-md   `}>
          <div className=" z-10 mb-6 flex flex-col justify-between gap-2 px-8 pt-4  max-[350px]:mb-0 sm:gap-0  md:grid md:grid-cols-3 md:px-4 ">
            <Link
              to={"/"}
              className="ml-4 mr-auto flex min-w-min cursor-pointer items-center gap-2 self-center justify-self-start rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2 sm:mr-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 `}
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
              <p className={` `}>Cancel</p>
            </Link>

            <ul className="progress__steps text-text dark:text-text ">
              {/* prettier-ignore */}
              <li>
            <a  className="progress__step--active before:bg-acc bg-acc cursor-pointer border-bg after:bg-acc"  onClick={()=>{
              // check if the confirmation is true and then navigate
              if( window.location.pathname.includes("photos") && confirm("Are you sure? You will lose all progress.")){
                navigate("create")
              }
            }} >Create</a>
          </li>
              <li>
                <a
                  className={` ${
                    location.pathname.includes("/add-modpack/photos")
                      ? "progress__step--active  border-bg  before:bg-acc after:bg-acc"
                      : ""
                  }`}
                >
                  Add Photos
                </a>
              </li>
            </ul>
          </div>
          {/* in the outlet the nested routes are displayed */}

          <Outlet />
        </div>
        <div className="absolute inset-0 -z-10 h-full w-full flex-1 bg-sec opacity-20"></div>
      </div>
    </section>
  );
};

export default AddModpack;
