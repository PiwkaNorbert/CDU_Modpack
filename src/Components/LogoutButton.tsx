import { toast } from "react-toastify";

export const LogoutButton = () => {
  const returnLink = window.location.href;
  return (
    <button
      className=" text-content ml-4 flex h-8 items-center gap-2 rounded-lg bg-slate-500 px-3 py-1 hover:bg-hover-1 dark:hover:bg-hover-2 "
      onClick={() => {
        localStorage.removeItem("user_profile");
        window.location.href = returnLink;
        return toast.success("See you later!");
      }}
    >
      Logout
    </button>
  );
};
