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
        navigate("/");
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
    <div className="h-4xl my-10 flex w-full flex-col bg-sec/20 items-center  justify-center text-center text-xl text-text xl:text-2xl">
      <h1 className="mb-5 text-center text-5xl/[1.1] font-semibold leading-tight md:text-6xl/[1.1] lg:text-7xl/[1.1]">
        Page Not Found
      </h1>
      <h3 className="mb-6 text-2xl/[1.1] font-bold capitalize leading-tight text-text/50 md:text-3xl/[1.1] lg:text-4xl/[1.1]">
        Error 404
      </h3>

      <div className="my-10 ">
        Redirecting to the Homepage in <span id="countdown">5</span>...
      </div>

      {/* button to return to homepage */}
      <Link
        className=" rounded-md border-2 border-black bg-text px-4 py-2 text-sm text-bg hover:bg-opacity-80 disabled:bg-slate-600 dark:text-bg xl:text-base"
        to={"/"}
      >
        Return to Homepage
      </Link>
    </div>
  );
};
export default NotFoundPage;
