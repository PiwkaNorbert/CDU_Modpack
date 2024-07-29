import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { twJoin } from "tailwind-merge";

const SuggestMPLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const photoLocation = location.pathname.includes("photos");
  const successLocation = location.pathname.includes("success");
  const createLocation = location.pathname.includes("create");

  return (
    <>
      <div
        className="grid h-full items-center lg:rounded-md "
        style={{ paddingBottom: "5rem" }}
      >
        <div className="mb-6 gap-4 px-8 pt-4 max-[350px]:mb-0  grid md:grid-cols-[auto,1fr,auto] md:px-4 ">
          <Link
            to={"/"}
            className="ml-4 mr-auto flex min-w-min cursor-pointer items-center gap-2 self-center justify-self-start rounded-md px-3 py-1 text-text-1 hover:bg-sec/20 hover:text-text-1 dark:hover:bg-hover-2 sm:mr-0"
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
            <p>Cancel</p>
          </Link>

          <ul className="progress__steps text-text-1 ">
            {/* prettier-ignore */}
            <li>
                <a type="button" className={twJoin(`progress__step--active cursor-pointer`, 
               (photoLocation || successLocation) && "progress__step--link",
                createLocation && "progress__step--curLink"
                )} onClick={()=>{
                  // check if the confirmation is true and then navigate
                  if( photoLocation && confirm("Are you sure? You will lose all progress.")){
                    navigate("create")
                  }
                }} >Create</a>
              </li>
            <li>
              <a
                type="button"
                className={` ${
                  photoLocation || successLocation
                    ? "progress__step--active cursor-pointer"
                    : ""
                } ${successLocation ? "progress__step--link" : ""}${
                  photoLocation ? "progress__step--curLink" : ""
                }`}
                onClick={() => {
                  // check if the confirmation is true and then navigate
                  if (
                    successLocation &&
                    confirm(
                      "Are you sure? You won't be able to add an image to this pack."
                    )
                  ) {
                    navigate(`photos`);
                  }
                }}
              >
                Add Photos
              </a>
            </li>
            <li>
              <a
                className={
                  successLocation
                    ? "progress__step--active progress__step--curLink "
                    : ""
                }
              >
                Approval
              </a>
            </li>
          </ul>
        </div>
        {/* in the outlet the nested routes are displayed */}

        <Outlet />
      </div>
    </>
  );
};

export default SuggestMPLayout;
