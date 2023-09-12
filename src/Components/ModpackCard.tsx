import { IModpack } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPackDetail } from "../API/usePackDetailData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeartSVG from "./SVG/HeartSVG";
import HeartFillSVG from "./SVG/HeartFillSVG";
import CommentBubbleSVG from "./SVG/CommentBubbleSVG";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { bgColorVariants, borderColorVariants } from "../Constants";

const ModpackCard = (props: IModpack) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const [currentPlace, setCurrentPlace] = useState("/");

  useEffect(() => {
    setCurrentPlace(location.pathname);
  }, []);

  const {
    modpackId,
    name,
    imageUrl,
    color,
    voteCount,
    commentCount,
    timesVoted,
    isPublished,
    isArchived,
    // isSponsored,
  } = props;





  return (
    <div
      key={modpackId}
      className={`relative z-[1]  mb-8 flex justify-center rounded-md border-[3.5px] text-text transition-transform hover:scale-105 hover:shadow-sm hover:shadow-white/50 lg:min-h-[109px] lg:min-w-[194px] ${borderColorVariants[color]} `}
      onMouseEnter={() => {
        queryClient.prefetchQuery(["details", modpackId], () =>
          fetchPackDetail(modpackId as string)
        );
      }}
    >
      <Link
        to={`${currentPlace}pack-details/${modpackId}`}
        className={`w-full overflow-hidden rounded-sm bg-bg `}
      >
        <div className=" flex h-full justify-center rounded-md  hover:text-opacity-100  ">
          <div className="  flex h-full  flex-1 flex-col overflow-hidden text-base/[1.25rem]">
            {/* toggle images in production */}
            <LazyLoadImage
              src={`https://www.trainjumper.com${
                imageUrl === null ? "/static/placeholder.png" : imageUrl
              }`}
              alt={name ? name + " Image" : "Pack Image"}
              loading="lazy"
              width="275"
              height="155"
              placeholderSrc={`/src/assets/placeholderImg.png`}
              className={`lazy-load-image-2 aspect-video text-right ${bgColorVariants[color]} w-full border-b-[3.5px] ${borderColorVariants[color]}  object-fill object-center`}
            />

            <p
              className={`text-content ${
                !(isPublished || isArchived) ? "pb-[.3rem]" : " mb-4 pb-[.1rem]"
              } flex h-[72px] min-h-max items-center justify-center hyphens-auto px-2 pt-[.3rem] text-center uppercase`}
            >
              {name}
            </p>
          </div>
          {!(isPublished || isArchived) ? null : (
            <div
              className={`absolute flex h-9 divide-x   overflow-hidden rounded-full border-[3.5px] bg-bg px-2 py-1 text-text  ${borderColorVariants[color]} -bottom-[22px]  items-center text-base `}
            >
              <div className=" flex items-center gap-1 pr-2">
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
          )}
        </div>
      </Link>
    </div>
  );
};

export default ModpackCard;
