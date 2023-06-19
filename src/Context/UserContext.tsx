import React, { createContext, useEffect, useState } from "react";

import { DiscordProfileData } from "../Utils/Interfaces";

export const UserContext = createContext<{
  user: DiscordProfileData | undefined;
  setUser: React.Dispatch<React.SetStateAction<DiscordProfileData | undefined>>;
  setRemainingVotes: (n: number) => void;
  login: (user: DiscordProfileData) => void;
  logout: () => void;
}>({
  user: {} as DiscordProfileData,
  setUser: () => null,
  setRemainingVotes: () => null,
  login: () => null,
  logout: () => null,
});

// Path: UserProvider.tsx
// create a user provider that can be used in other components to get the user data from the context provider

export const UserProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [user, setUser] = useState<DiscordProfileData | undefined>();

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
    const userNew = { ...user, votesRemaining: n };
    // save the user in the local storage
    return saveUserProfile(userNew as DiscordProfileData);
  };

  // remove the user from the local storage
  const removeUserProfile = () => {
    localStorage.removeItem("user_profile");
  };

  // remove the user from the local storage and from the state
  const logout = () => {
    removeUserProfile();
    setUser(undefined);
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
