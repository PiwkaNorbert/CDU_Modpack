import { toast } from "react-toastify";
import { logoutFunction } from "../Components/LogoutButton";
import { useNavigate } from "react-router-dom";
export const errorHandling = (error: any) => {
  // if (error.status === 500) return toast.error("Internal Server Error");
  // if (error.status === 400) return toast.error(error.response.data.error);
  // if (error.status === 401) {
  // }
  // if (error.status === 404) return toast.error(error.message);
  console.error(error);

  switch (error.status) {
    case 401: {
      logoutFunction();
      toast.error(error?.response?.data?.error);
      return (window.location.pathname = "/");
    }
    case 404:
      return toast.error(error.message);
    case 400:
      return toast.error(error.response.data.error);
    case 500:
      return toast.error(error.response.data.error);
    case 503:
      toast.error(error.response.data.error);
      window.location.pathname ="/maintenance"
      throw new Error(
        "The site is currently down for maintenance. Please try again later."
      );
    default: {
      return toast.error(error.response.data.error);
    }
  }
};
