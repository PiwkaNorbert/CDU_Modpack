import  { useState } from "react";
import { DiscordProfileData } from "../UTILS/Interfaces";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { ToastContainer } from 'react-toastify';
export const Header = () => {
  const [scroll, setScroll] = useState(false);

  const _userProfile = localStorage.getItem("user_profile");
  const userProfile: DiscordProfileData = _userProfile == null ? {
    isLoggedIn: false,
    id: '', avatar: '', global_name: '', username: ''
  } : JSON.parse(_userProfile);

  const changeColor = () => {
    window.scrollY >= 150 ? setScroll(true) : setScroll(false);
  };
  window.addEventListener("scroll", changeColor);

  return (
    <>
      <header className="relative grid w-full text-sm text-content items-center justify-center">
        <div className="relative h-[150px] flex justify-center items-center">
          <img
            src="/headerBG.png"
            alt="random"
            className="h-full w-screen  object-none object-center"
          />
          <img
            src="/logo.png"
            alt="random"
            className=" absolute top-0 h-[139px] w-[150px] cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />
        </div>
      </header>
      <nav
        className={` sticky top-0 z-20  flex w-full items-center justify-center  bg-bkg-600 px-2 py-2  ${
          scroll === true ? "  bg-bkg-600  shadow-header " : ""
        }`}
      >
        {
        userProfile.isLoggedIn
          ? <div className="flex items-center justify-end max-w-4xl  w-full ">
            <p className=" flex justify-center text-center uppercase max-w-[180px] mr-5">Logged in as<br/>{userProfile.global_name}</p>
            <img className="rounded-full w-10 aspect-square " src={`https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}`}/>
            <LogoutButton/>

          </div>
          // Decide whether to display user's discord avatar (logged in) or "log in with discord" button (not logged in)
          : <LoginButton/>
        }
        < ToastContainer />

      </nav>
    </>
  );
};
