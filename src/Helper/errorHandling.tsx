import { toast } from "react-toastify";
import { logoutFunction } from "../Components/LogoutButton";
export const errorHandling = (error: any) => {
  // if (error.status === 500) return toast.error("Internal Server Error");
  // if (error.status === 400) return toast.error(error.response.data.error);
  // if (error.status === 401) {
  // }
  // if (error.status === 404) return toast.error(error.message);

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
    default: {
      console.error(error);
      return toast.error(error.message);
    }
  }
};
