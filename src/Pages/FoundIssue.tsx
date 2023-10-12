import { useNavigate } from "react-router-dom";

const FoundIssue = () => {
  const navigate = useNavigate();
  return (
    <section
      id="modpack__addpack"
      className="z-[5] grid h-full w-full  flex-1 justify-normal  text-text lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] "
    >
      <div className="relative h-min  border-t-2 bg-bg  pb-4 dark:border-none dark:shadow  md:mb-4 md:rounded-b-md  md:border-none md:shadow-xl  ">
        <div className={` z-10 grid h-full items-center  lg:rounded-md   `}>
          <div className=" z-10 mb-6 flex flex-col justify-between gap-2 px-8 pt-4  max-[350px]:mb-0 sm:gap-0  md:grid md:grid-cols-3 md:px-4 ">
            <div
              className={`ml-4 mr-auto flex min-w-min cursor-pointer items-center gap-2 rounded-md px-3 py-1  hover:bg-sec hover:bg-opacity-20  dark:hover:bg-hover-2  `}
              onClick={() => {
                navigate(-1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 `}
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
          <div className="flex justify-center gap-1 px-4 pb-8">
            If you find an issue with the website please report it on the
            <a
              href="https://discord.com/channels/940907977014120488/966592678768807946"
              className="text-pri hover:underline"
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
