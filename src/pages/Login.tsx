export interface LoginProps {
    access_token: string;
    expires_in: string;
    refresh_token: string;
    scope: string;
    identify: string;
    token_type: string;
    Bearer: string;
    expires_at: string;

}
import useDiscordProfileData from "../API/useDiscordProfileData";
import { useSearchParams, Navigate } from "react-router-dom";
import { DiscordProfileData } from "../UTILS/Interfaces";
import { ToastContainer } from 'react-toastify';

const Login = () => {

    let [searchParams] = useSearchParams();
    const returnUrl = searchParams.get("returnUrl");

    const { data, isLoading, isError } = useDiscordProfileData();
    
    if (isLoading) {
        return <div className="h-screen w-full">Loading.</div>
    }
    if (isError) {
        return <ToastContainer/>;
    }

    const profileData: DiscordProfileData = {
        isLoggedIn: true,
        avatar: data?.avatar,
        global_name: data?.global_name,
        id: data?.id,
        username: data?.username,
    }

    // Save the user profile in local storage
    localStorage.setItem("user_profile", JSON.stringify(profileData));
    // display a toast message to the user that they have logged in
    
    if(!returnUrl) return <Navigate to="/" />
    
    return <Navigate to={returnUrl} />

  }
  export default Login;