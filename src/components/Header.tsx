import  { useState } from "react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { useUser } from "../HELPER/UserContext";
<<<<<<< HEAD

 const Header = () => {
=======
import { useEffect } from "react";

export const Header = () => {
>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0
  const [scroll, setScroll] = useState(false);

  // set the state of voteRemaining to the value of the user's votesRemaining
const {user: userProfile} = useUser();


<<<<<<< HEAD
=======
// useEffect(() => {
//   if (userProfile?.isLoggedIn) {
//     setVotesRemaining(userProfile.votesRemaining);
//   }
// }, [userProfile]);

>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0

  const changeColor = () => {
    window.scrollY >= 150 && window.innerWidth < 1280||
    window.innerWidth >= 1280 && window.scrollY >= 180 ?

    setScroll(true) : setScroll(false);
    
  };
  window.addEventListener("scroll", changeColor);
 
 // if the size of the window is below 600px make a menu with to toggle 
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  }; 


  return (
    <>
    {menu ? null :
      <header className="relative md:grid hidden   h-[150px] l xl:h-[180px]  text-sm xl:text-base items-center justify-center">
          <div
            className=" absolute inset-0 m-auto bg-gradient-to-tr from-acc to-pri dark:brightness-50 " >
          </div>
          <img
            alt="CDU"
            src="/logo.png"
            //loading="lazy"
            className=" absolute justify-self-center top-0 z-10  hover:animate-bounce-slow p-2 w-[150px] xl:w-[180px] cursor-pointer"
            onClick={() => (window.location.href = "/")}
            />
      </header>
          }
      <nav
        className={` sticky top-0 z-20 text-text flex w-full lg:min-w-[900px] lg:max-w-[900px] lg:mx-auto items-center justify-stretch md:justify-center bg-bg gap-2 lg:px-1 md:px-4 px-8 py-2  ${
          scroll === true && "bg-sec dark:bg-bg shadow-header "
        }`}
      > 
      {/* If the window size is below 600px display a button with "menu as the value and on click make a modal to display the nav */}
  
      {/* If the window size is below 600px display a modal with the nav */}
      {menu ?
      <div className="absolute top-0 left-0 w-full h-screen bg-bg dark:bg-sec md:hidden flex flex-col items-center justify-center">
        <button className="absolute top-2 right-2" onClick={toggleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" stroke="currentColor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
            </path>
          </svg>
        </button>
        <a href="/#about" className="my-5">About</a>
        <a href="/#vote" className="my-5">Vote</a>
        <a href="/#results" className="my-5">Results</a>
        <a href="/#contact" className="my-5">Contact</a>
        <a href="/#faq" className="my-5">FAQ</a>
        <a href="/#rules" className="my-5">Rules</a>
      </div>
      : null}
       
      <button className="sm:hidden order-2  " onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" stroke="currentColor" viewBox="0 0 256 256"><path d="M224,120v16a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V120a8,8,0,0,1,8-8H216A8,8,0,0,1,224,120Zm-8,56H40a8,8,0,0,0-8,8v16a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V184A8,8,0,0,0,216,176Zm0-128H40a8,8,0,0,0-8,8V72a8,8,0,0,0,8,8H216a8,8,0,0,0,8-8V56A8,8,0,0,0,216,48Z">
          </path>
        </svg>
      </button>
      {
      userProfile?.isLoggedIn ? 
        <>
      {/* Amount of user votes remaining */}
      <img
      alt="CDU"
      src="/logo.png"
      loading="lazy"
      className={`justify-self-center block md:hidden order-1 h-10 aspect-square top-0 z-10 hover:animate-bounce-slow cursor-pointer
                  ${scroll || menu ? "block md:block": ""}
                `}
      onClick={() => (window.location.href = "/")}
      />

          <div className=" justify-self-start order-3 w-full hidden sm:flex min-[900px]:justify-self-center  ">
            <p className="text-center uppercase ">{`You have ${userProfile.votesRemaining} votes remaining this month.`}</p>
          </div>

          <div className="flex items-center justify-end order-4  w-full ">
            <p className=" flex justify-center max-[450px]:hidden text-center uppercase max-w-[180px] mr-5">Logged in as<br/>{userProfile.globalName}</p>
            <img className="rounded-full w-10 xl:w-14 aspect-square " alt={userProfile.username ? `${userProfile.username}'s avatar`: 'avatar'} src={`https://cdn.discordapp.com/avatars/${userProfile.id}/${userProfile.avatar}`}/>
            <LogoutButton/>

          </div>
        </>
        // Decide whether to display user's discord avatar (logged in) or "log in with discord" button (not logged in)
        : <LoginButton/>
      
      }
        
<<<<<<< HEAD
=======
        {userProfile?.isLoggedIn ? 
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
>>>>>>> e622e20625c751e9696a07c6ef087b029ed5f2a0

      </nav>
    </>
  );
};
export default Header;