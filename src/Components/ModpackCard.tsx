import { IModpack } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPackDetail } from "../API/usePackDetailData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeartSVG from "./SVG/HeartSVG";
import HeartFillSVG from "./SVG/HeartFillSVG";
import CommentBubbleSVG from "./SVG/CommentBubbleSVG";
import { Link } from "react-router-dom";
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

  return (
    <div
      key={modpackId}
      className={`relative z-10  mb-8 flex justify-center rounded-md border-[3.5px] text-text transition-transform hover:scale-105 hover:shadow-sm hover:shadow-white/50 lg:min-h-[109px] lg:min-w-[194px] border-${color}-300 `}
      onMouseEnter={() => {
        queryClient.prefetchQuery(["details", modpackId], () =>
          fetchPackDetail(modpackId as string)
        );
      }}
    >
      <Link
        to={`/pack-details/${modpackId}`}
        className={`overflow-hidden rounded-sm  bg-bg `}
      >
        <div className=" flex items-start  justify-center justify-items-center rounded-md  hover:text-opacity-100  ">
          <div className=" grid  h-full flex-1 overflow-hidden text-base/[1.25rem]">
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
          </div>

          <div
            className={`absolute flex h-9 divide-x   overflow-hidden rounded-full border-[3.5px] bg-bg px-2 py-1 text-text  border-${color}-300 -bottom-[22px]  items-center text-base `}
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
      </Link>
    </div>
  );
};

export default ModpackCard;
