import { toast } from "react-toastify";
import { useUser } from "../Context/useUser";
import { Link } from "react-router-dom";
import { errorHandling } from "../Helper/errorHandling";

export const LogoutButton = () => {
  const { setUser } = useUser();

  async function logout() {
    try {
      const response = await fetch("/api/logout");

      if (response.status !== 200) throw new Error("Couldn't log out");

      setUser(undefined);
      localStorage.removeItem("profileData");

      return toast.success("See you later!");
    } catch (error) {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    }
  }

  return (
    <Link
      to="/"
      className=" text-content ml-4 flex h-8 items-center gap-2 rounded-lg bg-sec px-3 py-1 hover:bg-opacity-80 dark:hover:bg-hover-2 "
      onClick={logout}
    >
      Log out
    </Link>
  );
};
