import { IModpack } from "../Utils/Interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPackDetail } from "../API/usePackDetailData";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HeartSVG from "./SVG/HeartSVG";
import HeartFillSVG from "./SVG/HeartFillSVG";
import CommentBubbleSVG from "./SVG/CommentBubbleSVG";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiBase, bgColorVariants, borderColorVariants } from "../Constants";

const ModpackCard = (props: IModpack) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const [currentPlace, setCurrentPlace] = useState("/");

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setCurrentPlace("/pack-details");
        break;
      case "/list-suggested-packs":
        setCurrentPlace("/suggested-pack-details");
        break;
      case "/list-archived-packs":
        setCurrentPlace("/archived-pack-details");
        break;
      default:
        setCurrentPlace("/pack-details");
        break;
    }
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
      className={`relative z-[1]  mb-8 flex justify-center rounded-md border-[3.5px] text-text transition-transform hover:scale-[102%] hover:shadow-sm hover:shadow-white/50 lg:min-h-[109px] lg:min-w-[194px] ${borderColorVariants[color]} `}
      onMouseEnter={() => {
        queryClient.prefetchQuery(["pack-details", modpackId], () =>
          fetchPackDetail(modpackId as string)
        );
      }}
    >
      <Link
        to={`${currentPlace}/${modpackId}`}
        className={`w-full overflow-hidden rounded-sm bg-bg `}
      >
        <div className=" flex h-full justify-center rounded-md  hover:text-opacity-100  ">
          <div className="  flex h-full w-full    flex-1 flex-col overflow-hidden text-base/[1.25rem]">
            {/* toggle images in production */}
            <LazyLoadImage
              src={`${apiBase}${
                imageUrl === null ? "/static/placeholder.png" : imageUrl
              }`}
              alt={name ? name + " Image" : "Pack Image"}
              // lazy load the images after the index of 8 to improve performance and load time but keep the LCP low
              loading={+modpackId > 8 ? "lazy" : "eager"}
              width="275"
              height="155"
              placeholderSrc={`/src/assets/placeholderImg.png`}
              className={`block w-full shrink-0 grow-0 border-b-[3.5px] object-cover text-right ${bgColorVariants[color]}  ${borderColorVariants[color]}  `}
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
