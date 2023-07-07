import { IModpack } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPackDetail } from "../API/usePackDetailData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeartSVG from "./SVG/HeartSVG";
import HeartFillSVG from "./SVG/HeartFillSVG";
import CommentBubbleSVG from "./SVG/CommentBubbleSVG";
import { useNavigate, Link } from "react-router-dom";
const ModpackCard = ({
  modpackId,
  name,
  imageUrl,
  color,
  voteCount,
  commentCount,
  timesVoted,
}: IModpack) => {
  const queryClient = useQueryClient();
        const text = color ? color : "blue";

  return (
    <div
      key={modpackId}
      className={`relative z-10  mb-8 hover:scale-105 transition-transform flex justify-center rounded-md border-[3.5px] hover:shadow-white/50 hover:shadow-sm text-text lg:min-h-[109px] lg:min-w-[194px] border-${color}-300 `}
      onMouseEnter={() => {
        queryClient.prefetchQuery(["details", modpackId], () =>
          fetchPackDetail(modpackId as string)
        );
      }}

    >
      <div className=" flex items-start  hover:text-opacity-100 justify-center justify-items-center overflow-hidden  ">
        <Link
          to={`/pack-details/${modpackId}`}
          className={` grid h-full flex-1 text-base/[1.25rem] `}
        >
          {/* toggle images in production */}
          <LazyLoadImage
            src={`https://www.trainjumper.com${imageUrl}`}
            alt={name ? name + " Image" : "Pack Image"}
            loading="lazy"
            width="275"
            height="155"
            placeholderSrc={`/src/assets/placeholderImg.png`}
            // onLoad={(e) => {
            //   e.currentTarget.classList.remove('blur-md')
            // }}
            className={`lazy-load-image-2 aspect-video text-right bg-${color}-300 w-full border-b-[3.5px] border-${color}-300  object-cover object-center`}
          />

          <p className="text-content mb-2 flex justify-center hyphens-auto px-2 py-4 text-center uppercase">
            {name}
          </p>
        </Link>
      </div>

      <div
        className={`absolute flex text-text   divide-x overflow-hidden rounded-full border-[3.5px] bg-bg px-2 py-1  border-${color}-300 -bottom-[22px]  items-center text-base `}
      >
        <div className="flex items-center gap-1 pr-2">
          <picture className={`flex`}>
            {timesVoted > 0 ? <HeartFillSVG /> : <HeartSVG />}
          </picture>
          <p>{voteCount}</p>
        </div>
        <div className="flex items-center gap-1 pl-2">
          <picture className={`flex `}>
            <CommentBubbleSVG />
          </picture>
          <p>{commentCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ModpackCard;
