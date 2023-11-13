import React, { useEffect, useState, createContext } from "react";

import { DiscordProfileData } from "../Utils/Interfaces";
import { UserProviderProps } from "../Utils/Types";
import { toast } from "react-toastify";
import { fetchProfile } from "../API/useDiscordProfileData";
import { errorHandling } from "../Helper/errorHandling";
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

  const storedUser = localStorage.getItem("profileData");

  useEffect(() => {
    console.log("checking user expired login");

    if (!storedUser) return;
    const parsedUser = JSON.parse(storedUser);
    const tokenExpirationDate = parsedUser?.tokenExpiry;
    const currentDate = Date.now() / 1000;

    // if the token is expired, remove the user from the local storage and set the user to undefined
    if (tokenExpirationDate < currentDate) {
      localStorage.removeItem("profileData");
      setUser(undefined);

      toast.error("Your session has expired. Please log in again.", {
        autoClose: 5000,
        toastId: "session-expired",
      });
    } else if (parsedUser) {
      fetchProfile()
        .then((data) => {
          console.log("fetching profile data");

          if (data.in_guild === false) return;
          const profileData = {
            isLoggedIn: true,
            avatar: data.avatar,
            globalName: data.global_name,
            id: data.id,
            username: data.username,
            isAdmin: data.is_admin,
            votesRemaining: data.votes_remaining,
            tokenExpiry: data.token_expiry,
            isLinked: data.is_linked,
            inGuild: data.in_guild,
            playerData: data.player_data,
          };
          localStorage.setItem("profileData", JSON.stringify(profileData));
          setUser(profileData);
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
          if (error instanceof Error) {
            return errorHandling(error);
          }
        });

      toast.success(`Welcome back, ${parsedUser.username}!`, {
        autoClose: 1000,
        toastId: "welcome-back",
      });
    }
    setUserLoading(false);
  }, []);

  const votesRemaining = (n: number) => {
    //  spread the old data and set the new value for votesRemaining
    const userNew = { ...user, votesRemaining: n };
    // save the user in the local storage
    localStorage.setItem("profileData", JSON.stringify(userNew));
    return setUser(userNew as DiscordProfileData);
  };

  const value: AppState = {
    user,
    setUser,
    votesRemaining,
    userLoading,
    setUserLoading,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
