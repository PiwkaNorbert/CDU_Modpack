import { toast } from "react-toastify";
import { useUser } from "../Context/useUser";
import { Link } from "react-router-dom";

export const LogoutButton = () => {
    const { setUser } = useUser();


    return(
        <Link
            to="/"
            className=" text-content flex h-8 items-center gap-2 rounded-lg px-3 py-1 ml-4 bg-sec dark:hover:bg-hover-2 hover:bg-opacity-80 "
            onClick={() => {
                localStorage.removeItem("profileData");
                setUser(undefined);

               return toast.success("See you later!");
            }}
            >
            Log out
        </Link>
    )
};
