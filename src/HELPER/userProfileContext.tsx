import {DiscordProfileData} from "../UTILS/Interfaces";
import React from "react";

const _userProfile = localStorage.getItem("user_profile");
const userProfile: DiscordProfileData = _userProfile == null ? {
  isLoggedIn: false,
  id: '', avatar: '', globalName: '', username: '',isAdmin: false
} : JSON.parse(_userProfile); 

export const userProfileContext = React.createContext<DiscordProfileData>(userProfile);