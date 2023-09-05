import React, { useEffect } from "react";

import { DiscordProfileData } from "../Utils/Interfaces";
import { UserProviderProps } from "../Utils/Types";
import { toast } from "react-toastify";
import { fetchProfile } from "../API/useDiscordProfileData";

// Path: UserProvider.tsx
// create a user provider that can be used in other components to get the user data from the context provider
export interface AppState {
  user?: Partial<DiscordProfileData>;
  setUser: React.Dispatch<React.SetStateAction<DiscordProfileData | undefined>>;
  votesRemaining: (amount: number) => void;
}

const defaultState: AppState = {
  user: {},
  setUser: () => {},
  votesRemaining: () => {},
};
export const UserContext = React.createContext<AppState>(defaultState);

export const UserProvider: React.FunctionComponent<UserProviderProps> = (
  props: UserProviderProps
): JSX.Element => {
  const [user, setUser] = React.useState<DiscordProfileData>();

  // const data = fetchProfile()
  // make an async function for fetchProfile to resolve the promise and then set the user

  const getProfile = async () => {
    const data = await fetchProfile();
    const profileData: DiscordProfileData = {
      isLoggedIn: true,
      avatar: data?.avatar,
      globalName: data?.global_name,
      id: data?.id,
      username: data?.username,
      isAdmin: data?.is_admin,
      votesRemaining: data?.votes_remaining,
      tokenExpiry: data?.token_expiry,
      isLinked: data?.is_linked,
      inGuild: data?.in_guild,
    };

    setUser(profileData);
    localStorage.setItem("profileData", JSON.stringify(profileData));
  };

  const storedUser = localStorage.getItem("profileData");
  useEffect(() => {
    console.log("user provider mounted");
    console.log("MEM LEAK");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("user provider mounted 2");

      if (parsedUser?.tokenExpiry < Date.now() / 1000) {
        // check if the users token has expired

        toast.error("Your session has expired. Please log in again.", {
          autoClose: 5000,
          toastId: "session-expired",
          onClose: () => {
            localStorage.removeItem("profileData");
          },
        });
        setUser(undefined);
      } else if (!user) {
        // check if there is no user in the state and set the user to the stored user
        getProfile();
      }
    } else if (!storedUser && !user) {
      console.log("no user set");
      setUser(undefined);

      // setUser(profileData);
    }
  }, [storedUser]);

  const votesRemaining = (n: number) => {
    //  spread the old data and set the new value for votesRemaining
    const userNew = { ...user, votesRemaining: n };
    // save the user in the local storage
    localStorage.setItem("profileData", JSON.stringify(userNew));
    return setUser(userNew as DiscordProfileData);
  };

  const checkTokenExpiry = () => {
    console.log("MEM LEAK");

    if (!user) return;

    const tokenExpiry = user?.tokenExpiry;
    if (!tokenExpiry) return;

    const now = Math.floor(Date.now() / 1000);

    if (tokenExpiry < now) {
      // TODO: refresh token
      toast.error("Your session has expired. Please log in again.");
      setUser(undefined);
    }
  };

  useEffect(() => {
    checkTokenExpiry();
  }, []);

  const value: AppState = { user, setUser, votesRemaining };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
