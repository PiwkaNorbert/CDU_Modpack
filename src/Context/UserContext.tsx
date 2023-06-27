import React, { useEffect } from "react";

import { DiscordProfileData } from "../Utils/Interfaces";
import { UserProviderProps } from "../Utils/Types";
import { toast } from "react-toastify";

// Path: UserProvider.tsx
// create a user provider that can be used in other components to get the user data from the context provider
export interface AppState {
  user?: Partial<DiscordProfileData>;
  setUser: (user?: Partial<DiscordProfileData>) => void;
}

const defaultState: AppState = {
  user: {},
  setUser: () => {},
};
export const UserContext = React.createContext<AppState>(defaultState);

export const UserProvider: React.FunctionComponent<UserProviderProps> = (
  props: UserProviderProps
): JSX.Element => {
  const [user, setUser] = React.useState<DiscordProfileData>();


  useEffect(() => {
    const storedUser = localStorage.getItem('profileData');
    
    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
      console.log('user set from local storage');
      
    }
  }, [user, setUser]);



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

  const value: AppState = { user, setUser };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
