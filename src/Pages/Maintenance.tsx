import { Link } from "react-router-dom";


const Maintenance = () => {



  return (
    <div className="my-10 grid justify-items-center py-20 h-full relative w-full justify-normal bg-card border border-border pb-10 dark:border-none dark:shadow md:mb-4 md:rounded-md md:border-none md:shadow-xl text-text-1 lg:mx-auto  lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px] ">
      <h1 className="my-5 text-center text-5xl/[1.1] font-semibold leading-tight md:text-6xl/[1.1] lg:text-7xl/[1.1]">
        We&apos;ll be back soon! 🛠
      </h1>
      <h3 className="mb-6 text-2xl/[1.1] font-bold capitalize leading-tight text-text-1/50 md:text-3xl/[1.1] lg:text-4xl/[1.1]">
        Error 503
      </h3>

      {/* button to return to homepage */}
      <Link
        className="rounded-md border border-border bg-text px-4 py-2 text-sm text-text-1 dark:text-text-1 hover:bg-opacity-80 disabled:bg-slate-600  xl:text-base"
        to={"/"}
      >
        Return to Homepage
      </Link>
    </div>
  );
};
export default Maintenance;
