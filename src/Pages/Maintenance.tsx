import { Link } from "react-router-dom";


const Maintenance = () => {



  return (
    <div className="grid justify-items-center py-20 h-full relative w-full justify-normal">
      <h1 className="my-5 text-center text-5xl/[1.1] font-semibold leading-tight md:text-6xl/[1.1] lg:text-7xl/[1.1]">
        We&apos;ll be back soon! 🛠 
      </h1>
        <h3 className="mb-6 font-bold capitalize leading-tight text-text-1/50 text-2xl/[1.1]  md:text-3xl/[1.1] lg:text-4xl/[1.1]">
            Sorry for the inconvenience
        </h3>
      <p className=" pb-10 text-xla capitalizea text-text-1/50 text-center max-w-xl">
        we&apos;re performing some maintenance at the moment. We&apos;ll be back online shortly!
      </p>

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
