import  { useState } from "react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { useUser } from "../HELPER/UserContext"
export const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [votesRemaining, setVotesRemaining] = useState();

  const {user: userProfile} = useUser();

  setVotesRemaining(userProfile?.votesRemaining)


  const changeColor = () => {
    window.scrollY >= 150 && window.innerWidth < 1280||
    window.innerWidth >= 1280 && window.scrollY >= 180 ?

    setScroll(true) : setScroll(false);
    
  };
  window.addEventListener("scroll", changeColor);
//  votes remaining tracked in the state of the user profile 




 // if the size of the window is below 600px make a menu with to toggle 

  return (
    <>
      <header className="relative grid  h-[150px] l xl:h-[180px]  text-sm xl:text-base items-center justify-center">
          <div
            className=" absolute inset-0 m-auto bg-gradient-to-tr from-acc to-pri dark:brightness-50 " >
          </div>
          <img
            alt="CDU logo"
            src="/logo.png"
            loading="lazy"
            className=" absolute justify-self-center top-0 z-10  hover:animate-bounce-slow p-2 w-[150px] xl:w-[180px] cursor-pointer"
            onClick={() => (window.location.href = "/")}
          />
      </header>
      <nav
        className={` sticky top-0 z-20 text-text flex w-full items-center justify-center bg-bg px-2 py-2  ${
          scroll === true && "bg-sec dark:bg-bg shadow-header "
        }`}
      > 

     
        
        {
        userProfile != null && userProfile.isLoggedIn ? 
          <>
        {/* Amount of user votes remaining */}

            <div className=" justify-self-start min-[900px]:justify-self-center  min-[900px]:absolute ">
              <p className="text-center uppercase ">{`You have ${userProfile.votesRemaining} votes remaining this month.`}</p>
            </div>

            <div className="flex items-center justify-end   w-full ">
              <p className=" flex justify-center text-center uppercase max-w-[180px] mr-5">Logged in as<br/>{userProfile.globalName}</p>
              <img className="rounded-full w-10 xl:w-14 aspect-square " alt={userProfile.username ? `${userProfile.username}'s avatar`: 'avatar'} src={`https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}`}/>
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
