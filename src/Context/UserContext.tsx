import React, { useEffect } from "react";

import { DiscordProfileData } from "../Utils/Interfaces";
import { UserProviderProps } from "../Utils/Types";
import { toast } from "react-toastify";
import  {fetchProfile}  from "../API/useDiscordProfileData";

// Path: UserProvider.tsx
// create a user provider that can be used in other components to get the user data from the context provider
export interface AppState {
  user?: Partial<DiscordProfileData>;
  setUser: (user?: Partial<DiscordProfileData>) => void;
  votesRemaining: (amount:number) => void;
}

const defaultState: AppState = {
  user: {},
  setUser: () => {},
  votesRemaining: () => {}
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
  };
  

  setUser(profileData);
  localStorage.setItem("profileData", JSON.stringify(profileData));
}



  useEffect(() => {
    const storedUser = localStorage.getItem('profileData');
    
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
      console.log('user set from local storage');
      getProfile()
    } else if (!storedUser && !user) {
      console.log('no user set');
      setUser(undefined);

      // setUser(profileData);
    }
  }, [user, setUser]);


  const votesRemaining = (n: number) => {
    //  spread the old data and set the new value for votesRemaining
    const userNew = { ...user, votesRemaining: n };
    // save the user in the local storage
    localStorage.setItem("profileData", JSON.stringify(userNew));
    return setUser(userNew as DiscordProfileData);
  };

  useEffect(() => {
    const checkTokenExpiry = () => {
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

    checkTokenExpiry();
  }, [user]);

  const value: AppState = { user, setUser, votesRemaining};

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
