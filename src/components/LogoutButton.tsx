import { toast } from "react-toastify";

export const LogoutButton = () => {
    const returnLink = window.location.href
    return(
        <button
            className=" text-content flex h-8 items-center gap-2 rounded-lg px-3 py-1 ml-4 bg-slate-500 hover:bg-hover-1 "
            onClick={() => {
                localStorage.removeItem("user_profile");
                window.location.href = returnLink;
               return toast.success("See you later!");
            }}
            >
            Logout
        </button>
    )
};