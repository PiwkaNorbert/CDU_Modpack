export const LogoutButton = () => {
    return <button
        className=" text-content flex h-10 items-center gap-2 rounded-lg px-3 py-1 ml-4 bg-slate-500 hover:bg-hover-1 "
        onClick={() => {
            sessionStorage.removeItem("user_profile");
            window.location.href = '/';
        }}
        >
        Log out
    </button>
};