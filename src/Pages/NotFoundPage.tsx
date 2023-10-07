import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useRef } from "react";

import { NavigateFunction } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const timeleftRef = useRef(4);



  const countdown = (timeleft: number, navigate: NavigateFunction) => {
    const downloadTimer = setInterval(function () {
      if (timeleft === 0) {
        clearInterval(downloadTimer);
        // navigate("/");
      }
      const countdownElement = document.querySelector("#countdown");
      if (countdownElement !== null) {
        countdownElement.innerHTML = timeleft.toString();
      }
      timeleft -= 1;
    }, 1000);
  };


    useEffect(() => {
      if (window.location.href.endsWith("/404")) {
        countdown(timeleftRef.current, navigate);
      }
    }, [navigate, timeleftRef]);

    return (
      <div className="h-4xl flex flex-col w-full text-center my-10  items-center justify-center text-xl text-text xl:text-2xl">
        <h1 className="text-5xl/[1.1] font-semibold md:text-6xl/[1.1] lg:text-7xl/[1.1] mb-5 text-center leading-tight">Page Not Found</h1>
						<h3 className="text-2xl/[1.1] font-bold md:text-3xl/[1.1] lg:text-4xl/[1.1] mb-6 text-text/50 leading-tight capitalize">Error 404</h3>

        <div className="my-10 ">
          Redirecting to the Homepage in <span id="countdown">5</span>...
        </div>

        {/* button to return to homepage */}
        <Link className=" bg-text px-4 py-2 rounded-md border-2 border-black text-sm hover:bg-opacity-80 disabled:bg-slate-600 dark:text-bg xl:text-base" to={"/"}>
          Return to Homepage
        </Link>
      </div>

    );
  };
export default NotFoundPage;