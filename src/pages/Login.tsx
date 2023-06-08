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
import { useSearchParams } from "react-router-dom";
import { DiscordProfileData } from "../UTILS/Interfaces";

const Login = () => {

    let [searchParams] = useSearchParams();

    const returnUrl = searchParams.get("returnUrl");

    const { data, isLoading, isError } = useDiscordProfileData();
    
    if (isLoading) return <div>Loading.</div> 
    if (isError) return <div>error</div> 
    
    const profileData: DiscordProfileData = {
        isLoggedIn: true,
        avatar: data?.avatar,
        global_name: data?.global_name,
        id: data?.id,
        username: data?.username,
    }

    // little pp man XD
    // set the user profile to localstorage
    if (data != null && data != undefined) {
        sessionStorage.setItem("user_profile", JSON.stringify(profileData));
    }

    if (returnUrl !== null) {
        return  (window.location.href = returnUrl);
    } else {
        return (window.location.href = "/");
    }

  }
  export default Login;