import { toast } from "react-toastify";
import { logout } from "../Components/LogoutButton";
export const errorHandling = (error: any) => {
  if (error.status === 500) return toast.error("Internal Server Error");
  if (error.status === 400) return toast.error(error.response.data.error);
  if (error.status === 401) {
    logout();
    toast.error(error.response.data.error);
    return (window.location.pathname = "/");
  }
  if (error.status === 404) return toast.error(error.message);

  // switch (error.status) {
  //   case 401:
  //     return toast.error(error.response.data.error);
  //   case 404:
  //     return toast.error(error.message);
  //   default: {
  //     console.error(error);
  //     return toast.error(error.message);
  //   }
  // }
};
