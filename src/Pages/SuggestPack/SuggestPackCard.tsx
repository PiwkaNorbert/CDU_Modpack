import { Link } from "react-router-dom";

const SuggestPackCard = () => {
  return (
    <div className="relative z-[1] grid">
      <Link
        to="/suggest-modpack/create"
        className="h-full flex flex-col flex-1 px-2 py-10 sm:py-0 items-center justify-center rounded-md hover:shadow-lg border shadow-custom border-border transition-transform hover:scale-[102%] bg-card text-base/[1.25rem]"
      >
        {/* toggle images in production */}

        <p className="text-content mb-4 flex justify-center text-center uppercase">
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
