import { Link } from "react-router-dom";

const CreateModpackSuccess = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-4 py-20">
      <h1 className="text-center text-2xl font-bold sm:text-left">
        Thanks for submitting your Modpack!
      </h1>
      <p className="text-center sm:text-left">
        Your suggestion will be reviewed by our team and published soon!
      </p>
      <Link
        to={"/"}
        className="flex min-w-min cursor-pointer items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-sm text-blue-500 hover:bg-sec hover:bg-opacity-20 hover:text-blue-700 dark:border-blue-300 dark:text-blue-300 dark:hover:bg-hover-2 dark:hover:text-blue-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
        </svg>
        <p>Back to Home</p>
      </Link>
    </div>
  );
};

export default CreateModpackSuccess;
