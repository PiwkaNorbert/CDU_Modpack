import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

// Path: useUser.ts
// create a hook that can be used to get the user data from the context provider

export const useTheme = () => useContext(ThemeContext);