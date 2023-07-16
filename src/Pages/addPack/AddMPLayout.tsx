import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

const AddModpack = () => {
  const location = useLocation();

  return (
    <>
      {/* backarrow to the root page */}
      <div className="flex pt-4 lg:mx-auto  lg:min-w-[900px] lg:max-w-[900px]">
        <Link
          to={"/"}
          className="ml-4  flex min-w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-text hover:bg-sec hover:bg-opacity-20 hover:text-text dark:hover:bg-hover-2"
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
        <ul className="steps mx-auto">
          <NavLink to={"create"}>
            <li className="step step-primary  ">Create</li>
          </NavLink>
          <li
            className={`step  ${
              location.pathname === "/add-modpack/photos"
                ? "step-primary"
                : undefined
            }`}
          >
            Add Photos
          </li>
        </ul>
        <div className="w-[113.8px]"></div>
      </div>
      {/* in the outlet the nested routes are displayed */}

      <Outlet />
    </>
  );
};

export default AddModpack;
