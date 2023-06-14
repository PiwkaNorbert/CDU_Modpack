
import React, { createContext, useContext, useEffect, useState } from "react";

import {DiscordProfileData} from "../UTILS/Interfaces"

const UserContext = createContext<{
  user: DiscordProfileData | null;
  increaseRemainingVotes: () => void;
  decreaseRemainingVotes: () => void;
  setRemainingVotes: (n: number) => void;
  login: (user: DiscordProfileData) => void;
  logout: () => void;

}>({
  user: null,
  increaseRemainingVotes: () => {},
  decreaseRemainingVotes: () => {},
  setRemainingVotes: () => {},
  login: () => {} ,
  logout: () => {},
});

// Path: UserProvider.tsx
// create a user provider that can be used in other components to get the user data from the context provider

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<DiscordProfileData | null>(null);

  useEffect(() => {
    const user_profile = localStorage.getItem("user_profile");
    if (user_profile) {
      setUser(JSON.parse(user_profile));
    }
  }, []);

  // set the user in the local storage and make sure it is parsed to a json string
  const saveUserProfile = (user: DiscordProfileData) => {
    localStorage.setItem("user_profile", JSON.stringify(user));
  };
  const increaseRemainingVotes = () => {
      setUser({
        ...user,
        votesRemaining: user.votesRemaining + 1,
      });
      saveUserProfile(user)

  };

  const decreaseRemainingVotes = () => {
      setUser({
        ...user,
        votesRemaining: user.votesRemaining - 1,
      });
      saveUserProfile(user)
  };

  // method to set the value of remaining votes directly:
    const setRemainingVotes = (n: number) => {
        setUser({
            ...user,
            votesRemaining: n,
        });
        saveUserProfile(user);
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
    setUser(user);
  };


  return (
    <UserContext.Provider
      value={{
        user,
        increaseRemainingVotes,
        decreaseRemainingVotes,
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
