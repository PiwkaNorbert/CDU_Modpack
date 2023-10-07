import { Link } from "react-router-dom";

const SuggestPackCard = () => {
  return (
    <div className="relative z-[1]  mb-8 flex justify-center overflow-hidden  rounded-md border-[3.5px] border-dashed border-gray-300  transition-transform hover:scale-[102%] lg:min-h-[109px] lg:min-w-[194px]">
      <Link
        to="/add-modpack/create"
        className={`  h-full flex flex-col flex-1 px-2 py-10 items-center justify-center   bg-bg  text-base/[1.25rem]`}
      >
        {/* toggle images in production */}

        <p className="text-content mb-4 flex justify-center  py-10  text-center uppercase">
          Suggest a modpack
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
        </svg>
      </Link>
    </div>
  );
};

export default SuggestPackCard;
