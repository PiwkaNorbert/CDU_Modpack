import { toast } from "react-toastify";
import useUser from "../Context/useUser";
import { errorHandling } from "../Helper/errorHandling";
import SignOutSVG from "./SVG/SignOutSVG";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  async function logout() {
    try {
      const response = await fetch("/api/logout");

      if (response.status !== 200) throw new Error("Couldn't log out");

      setUser(undefined);
      localStorage.removeItem("profileData");

      toast.success("See you later!");
      return navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        return errorHandling(error);
      }
      throw error;
    }
  }

  return (
    <a
      type="button"
      className={`flex items-center justify-center gap-2 capitalize `}
      onClick={logout}
    >
      Logout
      <SignOutSVG />
    </a>
  );
};
