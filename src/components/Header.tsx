import  { useState } from "react";
import { DiscordProfileData } from "../UTILS/Interfaces";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";

export const Header = () => {
  const [scroll, setScroll] = useState(false);

  const _userProfile = sessionStorage.getItem("user_profile");
  const userProfile: DiscordProfileData = _userProfile == null ? {
    isLoggedIn: false,
    id: '', avatar: '', global_name: '', username: ''
  } : JSON.parse(_userProfile);

  console.log(userProfile.isLoggedIn);
  console.log(userProfile.avatar);
  console.log(userProfile.id);

  const changeColor = () => {
    window.scrollY >= 150 ? setScroll(true) : setScroll(false);
  };
  window.addEventListener("scroll", changeColor);

  return (
    <>
      <header className="relative grid  w-full  items-center justify-center">
        <div className="relative h-[150px] ">
          <img
            src="/public/headerBG.png"
            alt="random"
            className="h-full w-screen  object-none object-center"
          />
          <img
            src="/public/logo.png"
            alt="random"
            className=" absolute  top-0 ml-96 h-[139px] w-[150px] "
          />
        </div>
      </header>
      <nav
        className={` sticky top-0 z-20  flex w-full items-center justify-center space-x-4 bg-bkg-600 px-7 py-4 ${
          scroll === true ? "  bg-bkg-600  shadow-header " : ""
        }`}
      >
        {
        userProfile.isLoggedIn
          ? <div className="flex items-center justify-end max-w-4xl w-full ">
            <p className="text-content flex justify-center text-center uppercase max-w-[180px] mr-5">Logged in as<br/>{userProfile.global_name}</p>
            <img className="rounded-full h-[70px]" src={`https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}`}/>
            <LogoutButton/>
          </div>
          // Decide whether to display user's discord avatar (logged in) or "log in with discord" button (not logged in)
          : <LoginButton/>
        }
      </nav>
    </>
  );
};
