import { toast } from "react-toastify";


export const errorHandling = (error: any) => {
  console.log(error.response);

  switch (error.response.status) {
    case 400:
      return toast.error(error.response.data.error);
    case 401: {
      
      toast.error(error?.response?.data?.error);
      return (window.location.pathname = "/");
    }
    case 404:
      toast.error(
        "The backend API is down or the requested resource does not exist."
      );

      return (window.location.pathname = "/404");

    case 500:
      return toast.error(error.response.data.error);
    case 502:
      toast.error(error);
      window.location.pathname = "/maintenance";
      throw new Error(
        "The site is currently down for maintenance. Please try again later."
      );
    case 503:
      toast.error(error.response.data.error);
      window.location.pathname = "/maintenance";
      throw new Error(error.response.data.error);
    default: {
      return toast.error(error.response.data.error);
    }
  }
};
