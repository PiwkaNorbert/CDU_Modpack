import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();
  let timeleft = 4;

  const countdown = () => {
    let downloadTimer = setInterval(function () {
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
      // countdown();
    }
  }, []);

  return (
    <div className="h-4xl grid w-full items-center justify-center text-xl text-text xl:text-2xl">
      <h1>404: Page Not Found</h1>
      <div className="mt-4 ">
        Redirecting to orders in <span id="countdown">5</span>...
      </div>

      {/* button to return to homepage */}
      <Link className=" rounded-m bg-bg px-3 py-1 " to={"/"}>
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
