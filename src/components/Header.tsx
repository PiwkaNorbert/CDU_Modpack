import  { useState } from "react";
import { DiscordProfileData } from "../UTILS/Interfaces";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const Header = () => {
  const [scroll, setScroll] = useState(false);

  const _userProfile = localStorage.getItem("user_profile");
  const userProfile: DiscordProfileData = _userProfile == null ? {
    isLoggedIn: false,
    id: '', avatar: '', globalName: '', username: '', isAdmin: false
  } : JSON.parse(_userProfile);

  const changeColor = () => {
    window.scrollY >= 150 ? setScroll(true) : setScroll(false);
  };
  window.addEventListener("scroll", changeColor);

  return (
    <>
      <header className="relative grid w-full text-sm text-content items-center justify-center">
        <div className="relative h-[150px] flex justify-center items-center  ">
          <div
            className="h-full w-screen bg-gradient-to-tr from-bkg-400 to-bkg-200 " >
          </div>
          <img
            alt="CDU logo"
            src="/logo.png"
            loading="lazy"
            className=" absolute top-0  hover:animate-bounce-slow p-2 w-[150px] cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />
        </div>
      </header>
      <nav
        className={` sticky top-0 z-20 text-bkg-100  dark:text-bkg-0  flex w-full items-center justify-center  bg-bkg-600 px-2 py-2  ${
          scroll === true ? "  bg-bkg-600  shadow-header " : ""
        }`}
      >
        {/* Amount of user votes remaining */}

     

        {
        userProfile.isLoggedIn
          ? 
          <>
          {
            userProfile.votesRemaining && (
              <div className="flex items-center justify-end w-full ">
                <p className="text-center uppercase max-w-[300px] mr-5">You have {userProfile.votesRemaining} votes remaining this month.</p>
              </div>
            )
          }

          <div className="flex items-center justify-end max-w-4xl  w-full ">
            <p className=" flex justify-center text-center uppercase max-w-[180px] mr-5">Logged in as<br/>{userProfile.globalName}</p>
            <img className="rounded-full w-10 aspect-square " alt={userProfile.username ? `${userProfile.username}'s avatar`: 'avatar'} src={`https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}`}/>
            <LogoutButton/>

          </div>
          </>
          // Decide whether to display user's discord avatar (logged in) or "log in with discord" button (not logged in)
          : <LoginButton/>
        }

      </nav>
    </>
  );
};
