import { useNavigate } from "react-router-dom";

const FoundIssue = () => {
  const navigate = useNavigate();
  return (
    <section
      id="modpack__addpack"
      className="z-[5] grid h-full w-full flex-1 justify-normal text-text-1 dark:text-text-1 lg:mx-auto  lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px]   "
    >
      <div className="relative h-min  border bg-card  dark:border-none dark:shadow md:mb-4 md:rounded-md md:border-none md:shadow-xl">
        <div className={`z-10 grid h-full items-center lg:rounded-md   `}>
          <div className="z-10 mb-6 flex flex-col justify-between gap-2 px-8 pt-4 max-[350px]:mb-0 sm:gap-0 md:grid md:grid-cols-3 md:px-4">
            <div
              className={`ml-4 mr-auto flex min-w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-sm text-text-1 hover:bg-text-1/10 active:bg-text-1/20`}
              onClick={() => {
                navigate(-1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <p>Cancel</p>
            </div>
          </div>
          <div className="flex py-20  flex-col justify-center gap-1 px-4  sm:flex-row">
            If you find an issue with the website please report it on the
            <a
              href="https://discord.com/channels/940907977014120488/966592678768807946"
              className="text-blue-500 dark:text-pri hover:underline"
              target="_blank"
            >
              Community Discord.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundIssue;
