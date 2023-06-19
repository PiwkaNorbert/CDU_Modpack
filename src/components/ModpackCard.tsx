import { IModpack } from "../Utils/Interfaces";

const ModpackCard = ({
  modpackId,
  name,
  imageUrl,
  color,
  voteCount,
  commentCount,
}: IModpack) => {
  return (
    <div
      key={modpackId}
      className={`z-10 flex items-start justify-center overflow-hidden rounded-md border-[3.5px] text-text border-${color}-300 `}
      // onMouseEnter={() => {
      //   queryClient.prefetchQuery(['details', modpackId],()=>fetchPackDetail(modpackId as string, null))
      // }}
    >
      <a
        href={`/pack-details/${modpackId}`}
        className={`relative grid h-full flex-1 justify-items-center text-base/[1.25rem] `}
      >
        {/* toggle images in production */}
        <img
          src={`https://www.trainjumper.com${imageUrl}`}
          alt={name ? name + " Image" : "Pack Image"}
          loading="lazy"
          width="275"
          height="155"
          // onLoad={(e) => {
          //   e.currentTarget.classList.remove('blur-md')
          // }}
          className={`aspect-auto text-right bg-${color}-300 border-b-[3.5px] border-${color}-300 w-full overflow-hidden object-cover object-center`}
        />

        <div
          className={`absolute flex overflow-hidden rounded-r-full text-bg dark:text-text bg-${color}-300 left-0 top-0 text-base leading-5 `}
        >
          <span
            className={`flex h-8   w-8 items-center justify-center bg-transparent bg-heart bg-contain bg-center bg-no-repeat`}
          >
            {voteCount}
          </span>
          <span className="flex h-8 w-8 items-center justify-center bg-transparent bg-comment bg-contain bg-center bg-no-repeat text-center ">
            {commentCount}
          </span>
        </div>

        <p className="text-content flex justify-center hyphens-auto px-2 py-4 text-center uppercase">
          {name}
        </p>
      </a>
    </div>
  );
};

export default ModpackCard;
