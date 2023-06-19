import { useContext } from "react";
import { UserContext } from "./UserContext";

// Path: useUser.ts
// create a hook that can be used to get the user data from the context provider

export const useUser = () => useContext(UserContext);
