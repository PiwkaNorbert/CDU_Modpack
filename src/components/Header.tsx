import { useState } from "react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { useUser } from "../Context/useUser";

const Header = () => {
  const [scroll, setScroll] = useState(false);

  // set the state of voteRemaining to the value of the user's votesRemaining
  const { user: userProfile } = useUser();

  const changeColor = () => {
    (window.scrollY >= 150 && window.innerWidth < 1280) ||
    (window.innerWidth >= 1280 && window.scrollY >= 180)
      ? setScroll(true)
      : setScroll(false);
  };
  window.addEventListener("scroll", changeColor);

  // if the size of the window is below 600px make a menu with to toggle
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      {menu ? null : (
        <header className="l relative hidden   h-[150px] items-center justify-center  text-sm md:grid xl:h-[180px] xl:text-base">
          <div className=" absolute inset-0 m-auto bg-gradient-to-tr from-acc to-pri dark:brightness-50 "></div>
          <img
            alt="CDU"
            src="/logo.png"
            //loading="lazy"
            className=" absolute top-0 z-10 w-[150px]  cursor-pointer justify-self-center p-2 hover:animate-bounce-slow xl:w-[180px]"
            onClick={() => (window.location.href = "/")}
          />
        </header>
      )}
      <nav
        className={` sticky top-0 z-20 flex w-full items-center justify-stretch gap-2 bg-bg px-8 py-2 text-text md:justify-center md:px-4 lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] lg:px-1  ${
          scroll === true && "bg-sec shadow-header dark:bg-bg "
        }`}
      >
        {/* If the window size is below 600px display a button with "menu as the value and on click make a modal to display the nav */}

        {/* If the window size is below 600px display a modal with the nav */}
        {menu ? (
          <div className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center bg-bg dark:bg-sec md:hidden">
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

            <a
              className="rounded-sm p-5 hover:bg-hover-2"
              href="https://forum.playcdu.co"
              target="_blank"
            >
              Forum
            </a>
            <a
              className="rounded-md p-5  hover:bg-hover-2"
              href="https://forum.playcdu.co/misc/contact"
              data-xf-click="overlay"
              target="_blank"
            >
              Contact us
            </a>

            <a
              className="rounded-sm p-5 hover:bg-hover-2"
              href="https://forum.playcdu.co/help/terms/"
              target="_blank"
            >
              Terms and rules
            </a>

            <a
              className="rounded-sm p-5 hover:bg-hover-2"
              href="https://forum.playcdu.co/help/privacy-policy/"
              target="_blank"
            >
              Privacy policy
            </a>

            <a
              className="rounded-sm p-5 hover:bg-hover-2"
              href="https://forum.playcdu.co/help/"
              target="_blank"
            >
              Help
            </a>
          </div>
        ) : null}

        <button className="order-2 sm:hidden  " onClick={toggleMenu}>
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
        {userProfile?.isLoggedIn ? (
          <>
            {/* Amount of user votes remaining */}
            <img
              alt="CDU"
              src="/logo.png"
              loading="lazy"
              className={`top-0 z-10 order-1 block aspect-square h-10 cursor-pointer justify-self-center hover:animate-bounce-slow md:hidden
                  ${scroll || menu ? "block md:block" : ""}
                `}
              onClick={() => (window.location.href = "/")}
            />

            <div className=" order-3 hidden w-full justify-self-start sm:flex min-[900px]:justify-self-center  ">
              <p className="text-center uppercase ">{`You have ${userProfile.votesRemaining} votes remaining this month.`}</p>
            </div>

            <div className="order-4 flex w-full items-center  justify-end ">
              <p className=" mr-5 flex max-w-[180px] justify-center text-center uppercase max-[450px]:hidden">
                Logged in as
                <br />
                {userProfile.globalName}
              </p>
              <img
                className="aspect-square w-10 rounded-full xl:w-14 "
                alt={
                  userProfile.username
                    ? `${userProfile.username}'s avatar`
                    : "avatar"
                }
                src={`https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}`}
              />
              <LogoutButton />
            </div>
          </>
        ) : (
          // Decide whether to display user's discord avatar (logged in) or "log in with discord" button (not logged in)
          <div className="order-2 ml-auto max-[350px]:text-xs">
            <LoginButton />
          </div>
        )}
      </nav>
    </>
  );
};
export default Header;
