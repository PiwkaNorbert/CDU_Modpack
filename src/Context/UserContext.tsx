import React, { useEffect, useState, createContext } from "react";

import { DiscordProfileData } from "../Utils/Interfaces";
import { UserProviderProps } from "../Utils/Types";
import { toast } from "react-toastify";
// import { fetchProfile } from "../API/useDiscordProfileData";

// Path: UserProvider.tsx
// create a user provider that can be used in other components to get the user data from the context provider
export interface AppState {
  user?: Partial<DiscordProfileData>;
  setUser: React.Dispatch<React.SetStateAction<DiscordProfileData | undefined>>;
  votesRemaining: (amount: number) => void;
  userLoading: boolean;
  setUserLoading: React.Dispatch<React.SetStateAction<boolean>>;

}

const defaultState: AppState = {
  user: {},
  setUser: () => {},
  votesRemaining: () => {},
  userLoading: true,
  setUserLoading: () => {},
};
export const UserContext = createContext<AppState>(defaultState);

export const UserProvider: React.FunctionComponent<UserProviderProps> = (
  props: UserProviderProps
): JSX.Element => {
  const [user, setUser] = useState<DiscordProfileData>();
  const [userLoading, setUserLoading] = useState(true);

  // const data = fetchProfile()
  // make an async function for fetchProfile to resolve the promise and then set the user
  const storedUser = localStorage.getItem("profileData");

  const CheckUserExpiriedLogin = () => {
    if (!storedUser) return
    const parsedUser = JSON.parse(storedUser);
    const tokenExpirationDate = parsedUser?.tokenExpiry;
    const currentDate = Date.now() / 1000;

    if (tokenExpirationDate < currentDate) {
      localStorage.removeItem("profileData");
      setUser(undefined);

      toast.error("Your session has expired. Please log in again.", {
        autoClose: 5000,
        toastId: "session-expired",
      });
    } else {
      setUser(parsedUser);
      toast.success(`Welcome back, ${parsedUser.username}!`, {
        autoClose: 1000,
        toastId: "welcome-back",
      });
    }
    setUserLoading(false);
  

  };


  useEffect(() => {
    CheckUserExpiriedLogin();
  }, []);

  const votesRemaining = (n: number) => {
    //  spread the old data and set the new value for votesRemaining
    const userNew = { ...user, votesRemaining: n };
    // save the user in the local storage
    localStorage.setItem("profileData", JSON.stringify(userNew));
    return setUser(userNew as DiscordProfileData);
  };

  const value: AppState = { user, setUser, votesRemaining, userLoading, setUserLoading };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
