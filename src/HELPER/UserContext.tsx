
import React, { createContext, useContext, useEffect, useState } from "react";

import {DiscordProfileData} from "../UTILS/Interfaces"

const UserContext = createContext<{
  user: DiscordProfileData;
  increaseRemainingVotes: () => void;
  decreaseRemainingVotes: () => void;
  setRemainingVotes: (n: number) => void;
  login: (user: DiscordProfileData) => void;
  logout: () => void;

}>({
  user: undefined,
  increaseRemainingVotes: () => {},
  decreaseRemainingVotes: () =>{},
  setRemainingVotes: () => {},
  login: () => {} ,
  logout: () => {},
});

// Path: UserProvider.tsx
// create a user provider that can be used in other components to get the user data from the context provider

export const UserProvider: React.FC = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<DiscordProfileData>();
  
  useEffect(() => {
    const user_profile = localStorage.getItem("user_profile");
    
    
    if (user_profile) {
      setUser(JSON.parse(user_profile));
    }
  }, []);

  // set the user in the local storage and make sure it is parsed to a json string
  const saveUserProfile = (user: DiscordProfileData) => {
    localStorage.setItem("user_profile", JSON.stringify(user));
    setUser(user);
  };


  // method to set the value of remaining votes directly:
    const setRemainingVotes = (n: number) => {
      //  spread the old data and set the new value for votesRemaining 
      const userNew = {...user, votesRemaining: n};
      // save the user in the local storage
      return  saveUserProfile(userNew);
    };

  // remove the user from the local storage
  const removeUserProfile = () => {
    localStorage.removeItem("user_profile");
  };

  // remove the user from the local storage and from the state
  const logout = () => {
    removeUserProfile();
    setUser(null);
  };
  // save the user in the local storage and in the state
  const login = (user: DiscordProfileData) => {
    saveUserProfile(user);
  };


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setRemainingVotes,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Path: useUser.ts
// create a hook that can be used to get the user data from the context provider
export const useUser = () => useContext(UserContext);




// const _userProfile = localStorage.getItem("user_profile");
// const userProfile: DiscordProfileData = _userProfile == null ? {
//   isLoggedIn: false,
//   id: '', avatar: '', globalName: '', username: '', isAdmin: false
// } : JSON.parse(_userProfile);