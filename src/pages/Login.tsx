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
import { useUser } from "../HELPER/UserContext";

const Login = () => {

    const [searchParams] = useSearchParams();
    const returnUrl = searchParams.get("returnUrl");
    const { login } = useUser()

    const { data, isLoading, isError } = useDiscordProfileData();
    
    if (isLoading) {
        return <div className="h-screen w-full">Loading.</div>
    }
    if (isError) {
        return <div className="h-screen w-full">error</div>
    }

    const profileData: DiscordProfileData = {
        isLoggedIn: true,
        avatar: data?.avatar,
        globalName: data?.global_name,
        id: data?.id,
        username: data?.username,
        isAdmin: data?.is_admin,
        votesRemaining: data?.votes_remaining,
        tokenExpiry: data?.token_expiry,
    }

    login(profileData)
    // Save the user profile in local storage
    // display a toast message to the user that they have logged in
    
    if(!returnUrl) return <Navigate to="/" />
    
    return <Navigate to={returnUrl} />

  }
  export default Login;