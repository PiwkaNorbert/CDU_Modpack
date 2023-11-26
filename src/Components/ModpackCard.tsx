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
      className={`relative z-[1]  justify-center text-text-1 lg:min-h-[109px] lg:min-w-[194px] transition-transform hover:scale-[102%] `}
      onMouseEnter={() => {
        queryClient.prefetchQuery(["pack-details", modpackId], () =>
          fetchPackDetail(modpackId as string)
        );
      }}
    >
      <Link
        to={`${currentPlace}/${modpackId}`}
        className={`w-full rounded-md overflow-hidden grid  shadow-custom hover:shadow-lg  ${bgColorVariants[color]} border-2 ${borderColorVariants[color]}`}
      >
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
              placeholderSrc={`/src/assets/16.png`}
              className={` w-full shrink-0 grow-0 border-b-2 rounded-t object-cover text-right ${borderColorVariants[color]}`}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/steve.png";
                e.currentTarget.src = "/cross.png";
                return;
              }}
           
            />

            <p
              className={`text-content bg-card ${
                !(isPublished || isArchived) ? "pb-[.3rem]" : "pb-[1.1rem]"
              } flex h-[72px] min-h-max items-center justify-center hyphens-auto px-2  text-center uppercase`}
            >
              {name}
            </p>
          {!(isPublished || isArchived) ? null : (
                <div
                  className={`absolute left-0 right-0 mx-auto flex h-9 divide-x overflow-hidden hover:shadow-lg shadow-custom -bottom-[22px] rounded-full border-2 bg-card px-2 py-1 ${borderColorVariants[color]} `}
                  style={{ maxWidth: 'fit-content' }}
                >
                  <div className="flex items-center gap-1 pr-2">
                    {timesVoted > 0 ? <HeartFillSVG /> : <HeartSVG />}
                    <p>{voteCount}</p>
                  </div>
                  <div className="flex items-center gap-1 pl-2">
                    <CommentBubbleSVG />
                    <p>{commentCount}</p>
                  </div>
                </div>
              )}
      </Link>
    </div>
  );
};

export default ModpackCard;
