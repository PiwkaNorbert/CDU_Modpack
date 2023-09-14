import { useState } from "react";
import { LoginButton } from "./LoginButton";
import  useUser  from "../Context/useUser";
import { useTheme } from "../Context/useTheme";
import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignOutSVG from "./SVG/SignOutSVG";

const Header = () => {
  // set the state of voteRemaining to the value of the user's votesRemaining
  const { user, setUser } = useUser();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const [isIntersecting, setIntersecting] = useState(false);
  const [menu, setMenu] = useState(false);
  const isDev = import.meta.env.VITE_NODE_ENV === "development";

  const ref = useRef<HTMLDivElement>(null);

  let observer: IntersectionObserver;

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry) {
        setIntersecting(entry.isIntersecting);
      }
    };

    if (ref.current) {
      observer = new IntersectionObserver(handleObserver);
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [ref]);

  // if the size of the window is below 600px make a menu with to toggle

  const toggleMenu = () => {
    setMenu((open) => !open);
  };

  return (
    <>
      {menu ? null : (
        <header
          ref={ref}
          className="relative  hidden h-[140px] items-center justify-center  text-sm md:grid xl:h-[170px] xl:text-base"
        >
          <div className=" absolute inset-0  m-auto bg-gradient-to-tr from-acc to-pri dark:brightness-50 "></div>
          <img
            alt="CDU"
            src="/logo.png"
            width="140"
            height="128"
            //loading="lazy"
            className=" lazy-load-image absolute top-0   cursor-pointer  justify-self-center p-2 hover:animate-bounce-slow "
            onClick={() => navigate("/")}
          />
        </header>
      )}
      <nav
        className={`top-0 z-[10]  flex w-full items-center justify-stretch  gap-2 border-bg bg-bg px-8 py-1 text-text md:justify-center md:px-4 lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] lg:border-x-4  ${
          !isIntersecting ? " sticky  shadow-md" : "relative"
        }`}
      >
        {/* If the window size is below 600px display a button with "menu as the value and on click make a modal to display the nav */}

        {/* If the window size is below 600px display a modal with the nav */}
        {menu ? (
          <div className="fixed left-0 top-0 z-[999] flex h-screen w-full flex-col  justify-center bg-bg dark:bg-sec md:hidden">
            {/* If the window size is below 600px display a button with "menu as the value and on click make a modal to display the nav */}

            {/* If the window size is below 600px display a modal with the nav */}
            <img
              alt="CDU"
              src="/logo.png"
              width="100"
              //loading="lazy"
              className="  absolute top-0 z-30  cursor-pointer  justify-self-center p-2 hover:animate-bounce-slow "
              onClick={() => navigate("/")}
            />

            <div className="absolute left-0 top-0 z-[14] flex h-screen w-full flex-col items-center justify-center bg-bg dark:bg-sec md:hidden">
              <button className="absolute right-2 top-2" onClick={toggleMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  stroke="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                </svg>
              </button>
              {links.map((link: any) => (
                <a
                  key={link.href}
                  className="rounded-sm p-5 hover:bg-hover-2"
                  href={link.href}
                  target={link.target}
                  data-xf-click={link["data-xf-click"]}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="group relative order-3 flex items-center justify-center">
              <input
                type="checkbox"
                id="theme"
                className="hidden"
                onClick={() => {
                  setTheme(!theme);
                }}
                checked={theme}
              />
            </div>
          </div>
        ) : null}

        <button className="z-[14] order-2 sm:hidden " onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            stroke="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,120v16a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a8,8,0,0,1,8-8H216A8,8,0,0,1,224,120Zm-8,56H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Zm0-128H40a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Z"></path>
          </svg>
        </button>
        <div className="group relative order-3 flex items-center justify-center">
          <input
            type="checkbox"
            id="theme"
            className="hidden"
            onClick={() => {
              setTheme(!theme);
            }}
            checked={theme}
          />
          {/* the track for the toggle */}
          <label
            htmlFor="theme"
            className="flex h-8 w-16 cursor-pointer items-center justify-center rounded-full bg-text/20 p-1 transition-all duration-300 ease-in-out"
          >
            <span className="sr-only">Toggle Theme</span>
            {/* this is the white ball inside track */}
            <span
              className={`${
                theme ? "translate-x-4" : "-translate-x-4"
              } z-[5] inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out group-hover:bg-pri`}
            ></span>
            {/* the icons 1 is sun the 2 is the moon */}
            {theme ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="absolute left-1 "
              >
                <path d="M235.54,150.21a104.84,104.84,0,0,1-37,52.91A104,104,0,0,1,32,120,103.09,103.09,0,0,1,52.88,57.48a104.84,104.84,0,0,1,52.91-37,8,8,0,0,1,10,10,88.08,88.08,0,0,0,109.8,109.8,8,8,0,0,1,10,10Z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
                className="absolute right-1 "
              >
                <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm8,24a64,64,0,1,0,64,64A64.07,64.07,0,0,0,128,64ZM58.34,69.66A8,8,0,0,0,69.66,58.34l-16-16A8,8,0,0,0,42.34,53.66Zm0,116.68-16,16a8,8,0,0,0,11.32,11.32l16-16a8,8,0,0,0-11.32-11.32ZM192,72a8,8,0,0,0,5.66-2.34l16-16a8,8,0,0,0-11.32-11.32l-16,16A8,8,0,0,0,192,72Zm5.66,114.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32-11.32ZM48,128a8,8,0,0,0-8-8H16a8,8,0,0,0,0,16H40A8,8,0,0,0,48,128Zm80,80a8,8,0,0,0-8,8v24a8,8,0,0,0,16,0V216A8,8,0,0,0,128,208Zm112-88H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16Z"></path>
              </svg>
            )}
          </label>
        </div>

        <img
          alt="CDU"
          src="/logo.png"
          loading="lazy"
          className={`${
            !isIntersecting || menu ? "block md:block" : ""
          } top-0 z-10 order-1 block aspect-square h-10 cursor-pointer justify-self-center hover:animate-bounce-slow md:hidden 
           
            `}
          onClick={() => navigate("/")}
        />
        {user?.isLoggedIn ? (
          <>
            <div className=" z-10 order-4 hidden w-full justify-self-start sm:flex min-[900px]:justify-self-center  ">
              <p className="text-center uppercase ">{`${user?.votesRemaining} ${
                user?.votesRemaining == 1 ? "vote" : "votes"
              } remaining this month.`}</p>
            </div>

            <div className=" z-10 order-4 flex w-full items-center justify-end ">
              <p className=" mr-5 flex max-w-[180px] justify-center text-center text-sm uppercase max-[500px]:hidden">
                Logged in as
                <br />
                {user?.globalName}
              </p>
              <div className=" focus:ring-bkg/90 group relative z-10 flex aspect-square w-12 items-center rounded-full p-1 font-medium focus:outline-none focus:ring-4">
                <img
                  className="h-full w-full cursor-pointer   opacity-90 hover:opacity-100"
                  src={
                    user?.isLinked
                      ? user?.playerData?.mc_head_url
                      : `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}`
                  }
                  alt={user?.username ? `${user?.username}'s avatar` : "avatar"}
                />
                <div className="absolute -left-9 top-12 rounded-lg  bg-bg   shadow-md ">
                  <div className={`dropdown-body  group-hover:block`}>
                    <ul
                      className="space-y-1 p-1 text-sm"
                      aria-labelledby="dropdown-button"
                    >
                      <li
                        data-tip="How to get Linked"
                        className={` active:bg-text/15  mb-1 flex w-full  cursor-pointer gap-1 rounded-lg  px-3 py-1 transition-all delay-0 duration-200 ease-in-out last:mb-0 hover:bg-text/10 `}
                      >
                        <a
                          type="button"
                          href="https://forum.playcdu.co/threads/how-to-link-your-discord-and-minecraft-accounts.922/"
                          target="_blank"
                          className={`flex items-center justify-center  gap-2 capitalize `}
                        >
                          {user?.isLinked ? "linked" : "unlinked"}

                          <img
                            src={user?.isLinked ? "/check.png" : "/cross.png"}
                            className="aspect-square w-6"
                          />
                        </a>
                      </li>

                      <li
                        className={` active:bg-text/15  mb-1 flex w-full  cursor-pointer gap-1 rounded-lg  px-3 py-1 transition-all delay-0 duration-200 ease-in-out last:mb-0 hover:bg-text/10 `}
                      >
                        <a
                          type="button"
                          className={`flex items-center justify-center  gap-2 capitalize `}
                          onClick={() => {
                            setUser(undefined);
                            localStorage.removeItem("profileData");
                          }}
                        >
                          Logout
                          <SignOutSVG />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Decide whether to display user's discord avatar (logged in) or "log in with discord" button (not logged in)
          <div className="z-10 order-2 ml-auto max-[350px]:text-xs">
            {isDev && <Link to="loginDev">Login Dev</Link>}
            

            <LoginButton />
          </div>
        )}
        {/* <div className={`absolute inset-0 h-full max-[450px]:hidden z-0 w-full flex-1 bg-text opacity-0 ${
          scroll === true && " opacity-10 "
        } `}></div> */}
      </nav>
    </>
  );
};
export default Header;

const links = [
  {
    name: "Forum",
    href: "https://forum.playcdu.co",
    target: "_blank",
  },
  {
    name: "Contact us",
    href: "https://forum.playcdu.co/misc/contact",
    target: "_blank",
    "data-xf-click": "overlay",
  },
  {
    name: "Terms and rules",
    href: "https://forum.playcdu.co/help/terms/",
    target: "_blank",
  },
  {
    name: "Privacy policy",
    href: "https://forum.playcdu.co/help/privacy-policy/",
    target: "_blank",
  },
  {
    name: "Help",
    href: "https://forum.playcdu.co/help/",
    target: "_blank",
  },
];
