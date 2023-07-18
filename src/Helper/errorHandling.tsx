import { toast } from "react-toastify";

export const errorHandling = (error: any) => {
  switch (error.response.status) {
    case 401:
      return toast.error(error.response.data.error);
    case 404:
      return toast.error(error.message);
    default: {
      console.error(error);
      return toast.error(error.message);
    }
  }
};
