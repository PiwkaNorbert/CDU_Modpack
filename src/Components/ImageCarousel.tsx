import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Suspense, lazy, useRef, useState } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { twMerge } from "tailwind-merge";
import { apiBase, bgColorVariants, borderColorVariants } from "../Constants";
import Loading from "./Loading";

const Dialog = lazy(() => import("../Components/Dialog"));

export const ImageCarousel = ({
  galleryImages,
  color,
}: {
  galleryImages: { imageUrl: string; thumbnailUrl: string }[];
  color: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  const carouselRef = useRef<HTMLDivElement>(null);

  const { modpackId } = useParams();
  const queryClient = useQueryClient();

  const imagePath = galleryImages[currentImageIndex].imageUrl;
  const imageIdPattern = /\b[0-9A-Fa-f-]+(?=\.\w+$)/;
  const match = imagePath.match(imageIdPattern);

  const primaryImageMutation = useMutation(
    async () =>
      await axios.post(
        `${apiBase}/api/update_pack_primary_image`,
        { imageId: match && match[0], modpackId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    {
      onSuccess: ({ data }) => {
        if (data.message.status === false)
          return toast.error(data.message.message);

        return toast.success("Image Updated!");
      },
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks", "pack-details", modpackId]);
      },
    }
  );
  const deleteImageMutation = useMutation(
    async () =>
      await axios.post(
        `${apiBase}/api/delete_pack_image`,
        { imageId: match && match[0] },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    {
      onSuccess: (res) => {
        if (res.data.message.status === false)
          return toast.error(res.data.message.message);

        toast.success("Image Deleted");
      },
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks", "pack-details", modpackId]);
      },
    }
  );

  const handleImageClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    setShowModal(true);
  };

  const scrollCarousel = (scrollAmount: number) => {
    carouselRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleNextImage = () => {
    // Check if we're at the end of the carousel
    if (currentImageIndex === galleryImages.length - 1) {
      setCurrentImageIndex(0);
      const totalScrollWidth = carouselRef.current?.scrollWidth || 0;

      scrollCarousel(-totalScrollWidth);
    } else {
      setCurrentImageIndex((prevIndex) => prevIndex + 1);
      scrollCarousel(96); // or the width of your image
    }
  };

  const handlePrevImage = () => {
    // Check if we're at the start of the carousel
    if (currentImageIndex === 0) {
      setCurrentImageIndex(galleryImages.length - 1);
      const totalScrollWidth = carouselRef.current?.scrollWidth || 0;

      scrollCarousel(totalScrollWidth);
    } else {
      setCurrentImageIndex((prevIndex) => prevIndex - 1);
      scrollCarousel(-96); // or the width of your image
    }
  };

  return (
    <div className="w-full overflow-hidden ">
      {/* make primary image button */}

      <div className="group relative mx-auto ">
        <div className="z-[5] flex h-full w-full overflow-hidden  rounded-md ">
          {galleryImages.map(
            ({ imageUrl }: { imageUrl: string }, index: number) => (
              <LazyLoadImage
                key={index}
                src={`${apiBase}${imageUrl}`}
                alt={`Modpack Image ${index + 1}`}
                style={{
                  transform: `translateX(${-100 * currentImageIndex}%)`,
                }}
                className={` block min-h-[190px] md:min-h-[170px] lg:min-h-[236px] xl:min-h-[290px] 2xl:min-h-[349px]  w-full shrink-0 grow-0 rounded-md border object-cover transition-all duration-300  ${borderColorVariants[color]} ${bgColorVariants[color]}`}
              />
            )
          )}
        </div>
        {galleryImages?.length > 0 && (
          <div className="absolute inset-0 mx-auto flex h-full w-full">
            <div className="group flex flex-1 items-center justify-between  transition-all  ">
              <button
                aria-label="Previous Image"
                onClick={handlePrevImage}
                className={twMerge(
                  `flex h-full w-20 items-center justify-center overflow-hidden rounded-l-lg border text-bg dark:text-text-1 opacity-0 transition-all group-hover:opacity-100 ${borderColorVariants[color]} border-r-0 bg-pri/10 hover:bg-pri/30 dark:bg-card/90 dark:hover:bg-card  `,
                  galleryImages?.length === 1 && "hidden"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 transform"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  aria-hidden
                >
                  <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
                </svg>
              </button>
              {/* <div className="absolute z-10 hidden h-full w-full items-center justify-center gap-1 rounded-lg bg-sec/80 group-hover:flex"></div> */}
              <div
                aria-label="Show enlarged image "
                className="group/buttons flex h-full w-full  cursor-pointer flex-col items-center justify-center gap-1 "
                onClick={(e) =>
                  e.currentTarget === e.target &&
                  handleImageClick(galleryImages[currentImageIndex].imageUrl)
                }
              >
                {location.pathname.includes("edit-") && (
                  <>
                    {/*  */}
                    <button
                      disabled={primaryImageMutation.isLoading}
                      className="active:bg-pri/15 flex cursor-pointer items-center gap-2 rounded-lg bg-pri/70 px-2 py-1 text-blue-500  opacity-0 transition-all disabled:cursor-auto disabled:bg-slate-300 disabled:text-slate-500 group-hover/buttons:opacity-100 hover:bg-pri/60 dark:bg-card/90 dark:hover:bg-card dark:disabled:bg-slate-700 dark:disabled:text-slate-500 "
                      onClick={() => {
                        if (primaryImageMutation.isLoading) return;
                        primaryImageMutation.mutate();
                      }}
                    >
                      {primaryImageMutation.isLoading
                        ? "Making Primary..."
                        : "Make Primary"}
                    </button>
                    <button
                      disabled={deleteImageMutation.isLoading}
                      className="active:bg-pri/15  flex cursor-pointer items-center gap-2 rounded-lg bg-pri/70 px-2 py-1 text-red-500 opacity-0 transition-all disabled:cursor-auto  disabled:bg-slate-300 disabled:text-slate-500 group-hover/buttons:opacity-100 hover:bg-pri/60 dark:bg-card/90 dark:hover:bg-card dark:disabled:bg-slate-700 dark:disabled:text-slate-500  "
                      onClick={() => {
                        if (deleteImageMutation.isLoading) return;
                        if (
                          confirm(
                            "Are you sure you want to delete this image?\n'OK' to confirm"
                          )
                        ) {
                          deleteImageMutation.mutate();
                        } else {
                          return toast.error("Unable to delete image");
                        }
                      }}
                    >
                      {deleteImageMutation.isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </>
                )}
              </div>
              <button
                aria-label="Next Image"
                onClick={handleNextImage}
                className={twMerge(
                  `flex h-full w-20 items-center  justify-center overflow-hidden rounded-r-lg border text-bg dark:text-text-1 opacity-0  transition-all group-hover:opacity-100 ${borderColorVariants[color]} border-l-0 bg-pri/10 hover:bg-pri/30  dark:bg-card/90 dark:hover:bg-card `,
                  galleryImages?.length === 1 && "hidden"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 transform"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  aria-hidden
                >
                  <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      {galleryImages?.length > 1 && (
        // declare carouselRef using useRef hook

        <div className="relative  overflow-hidden rounded-xl dark:bg-slate-800/25">
          <div className="relative w-full overflow-hidden rounded-xl">
            <div
              className="flex max-w-full snap-x gap-4 overflow-x-scroll p-2"
              ref={carouselRef}
            >
              {galleryImages?.map(
                (
                  gallery: { imageUrl: string; thumbnailUrl: string },
                  index: number
                ) => {
                  return (
                    <LazyLoadImage
                      key={index}
                      src={`${apiBase}${gallery.thumbnailUrl}`}
                      alt={`Image ${index + 1}`}
                      width="96"
                      height="54"
                      className={twMerge(
                        "   aspect-video w-24 shrink-0 grow-0 cursor-pointer snap-center rounded-md border bg-text/50 object-cover transition-all  focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 dark:bg-bg   ",
                        currentImageIndex === index
                          ? `border-bg/90 shadow-inner outline outline-2 `
                          : `border-text-1/50 hover:border-text-1/90 hover:shadow-inner`
                      )}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        // check if im scrolling to the right or left

                        if (index > currentImageIndex) {
                          if (index - currentImageIndex === 1) {
                            scrollCarousel(96);
                          } else {
                            scrollCarousel(192);
                          }
                        }
                        if (index < currentImageIndex) {
                          if (currentImageIndex - index === 1) {
                            scrollCarousel(-96);
                          } else {
                            scrollCarousel(-192);
                          }
                        }
                      }}
                      aria-label={`Image Thumbnail ${index + 1}`}
                    />
                  );
                }
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-xl border border-black/5 dark:border-white/5"></div>
        </div>
      )}
    <Suspense fallback={<Loading size="la-sm" fullScreen={false} other="inline-block" />}>
      <Dialog
        open={showModal}
        dialogStateChange={(open) => setShowModal(open)}
        contents={
          <div
            className="fixed inset-0 z-50 grid h-full w-full items-center justify-center "
            onClick={() => setShowModal(false)}
          >
            <div className="flex flex-col  ">
              <img
                src={`${apiBase}${imageSrc}`}
                alt="Modpack Image"
                className="w-full md:w-[600px] lg:w-[896px] "
              />
              <button
                className="w-full bg-pri text-bg py-2 hover:bg-pri/80 transition-all "
                onClick={() => setShowModal(false)}
                aria-label="Close Modal"
              >
                Close
              </button>
            </div>
          </div>
        }
      />
      </Suspense>
    </div>
  );
};
