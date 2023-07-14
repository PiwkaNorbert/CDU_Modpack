import { toast } from "react-toastify";
import { useUser } from "../Context/useUser";
import { Link } from "react-router-dom";

export const LogoutButton = () => {
  const { setUser } = useUser();

  return (
    <Link
      to="/"
      className=" text-content ml-4 flex h-8 items-center gap-2 rounded-lg bg-sec px-3 py-1 hover:bg-opacity-80 dark:hover:bg-hover-2 "
      onClick={() => {
        setUser(undefined);
        localStorage.removeItem("profileData");

        return toast.success("See you later!");
      }}
    >
      Log out
    </Link>
  );
};
