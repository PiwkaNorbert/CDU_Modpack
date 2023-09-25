import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import { errorHandling } from "../Helper/errorHandling";
import { Dialog } from "../Components/Dialog";
import { twMerge } from "tailwind-merge";
import { apiBase, bgColorVariants, borderColorVariants } from "../Constants";

export const ImageCarousel = ({
  galleryImages,
  color,
}: {
  galleryImages: any;
  color: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  const { modpackId } = useParams();
  const queryClient = useQueryClient();

  const primaryImageMutation = useMutation(
    async () =>
      await axios.post(
        `${apiBase}/api/update_pack_primary_image`,
        { imageId: match[0], modpackId },
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
        toast.success("Primary Image Updated");
      },
      onError: (error) => {
        if (error instanceof Error) {
          return errorHandling(error);
        }
        throw error;
      },
      onSettled: () => {
        queryClient.invalidateQueries(["modpacks", "details", modpackId]);
      },
    }
  );
  const deleteImageMutation = useMutation(
    async () =>
      await axios.post(
        `${apiBase}/api/delete_pack_image`,
        { imageId: match[0], modpackId },
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
        queryClient.invalidateQueries(["modpacks", "details", modpackId]);
      },
    }
  );

  const imagePath = galleryImages[currentImageIndex].imageUrl;
  const imageIdPattern = /\b[0-9A-Fa-f]+(?=\.\w+$)/;
  const match = imagePath.match(imageIdPattern);

  const initialIndex = galleryImages.indexOf(imageSrc);

  if (initialIndex !== -1) {
    setCurrentImageIndex(initialIndex);
  }

  const handleImageClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    setShowModal(true);
  };

  const handleNextImage = () => {
    if (currentImageIndex === galleryImages.length - 1) {
      setCurrentImageIndex(0);
    }
    if (currentImageIndex < galleryImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(galleryImages.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div>
      {/* make primary image button */}

      <div className="group relative mx-auto ">
        <img
          src={`https://www.trainjumper.com${galleryImages[currentImageIndex].imageUrl}`}
          alt="Modpack Image"
          width="412"
          height="233"
          className={`z-[5] mx-auto aspect-video   place-self-center overflow-hidden rounded-md border-2 object-fill object-center lg:max-h-60  ${borderColorVariants[color]} ${bgColorVariants[color]}`}
        />
        {galleryImages?.length > 0 && (
          <div className="absolute inset-0 mx-auto flex max-h-[233px]  max-w-[412px] lg:w-full">
            <div className="group flex flex-1 items-center justify-between  transition-all  ">
              <button
                onClick={handlePrevImage}
                className={twMerge(
                  `flex h-full w-20 items-center justify-center overflow-hidden rounded-l-lg border-2 text-bg opacity-0 transition-all group-hover:opacity-100 dark:bg-bg dark:text-text ${borderColorVariants[color]} border-r-0 bg-text bg-opacity-50 hover:bg-opacity-60 dark:bg-bg dark:bg-opacity-50 dark:text-text dark:hover:bg-opacity-60`,
                  galleryImages?.length === 1 && "hidden"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 transform"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
                </svg>
              </button>
              {/* <div className="absolute z-10 hidden h-full w-full items-center justify-center gap-1 rounded-lg bg-sec/80 group-hover:flex"></div> */}
              <div
                className="group/buttons flex h-full w-full  cursor-pointer flex-col items-center justify-center gap-1 "
                onClick={(e) =>
                  e.currentTarget === e.target &&
                  handleImageClick(galleryImages[currentImageIndex].imageUrl)
                }
              >
                {location.pathname.includes("edit-") && (
                  <>
                    <button
                      // disabled={}
                      className="last:active:bg-text/15 flex cursor-pointer items-center gap-2 rounded-lg bg-text bg-opacity-70 px-4 py-2  text-blue-500 opacity-0 transition-all  hover:bg-opacity-80 disabled:bg-slate-300   disabled:text-slate-500  group-hover/buttons:opacity-100  dark:bg-bg dark:bg-opacity-90  dark:hover:bg-opacity-100 dark:disabled:bg-slate-700  dark:disabled:text-slate-500 "
                      onClick={() => {
                        if (primaryImageMutation.isLoading) return;
                        primaryImageMutation.mutate();
                      }}
                    >
                      Make Primary
                    </button>
                    <button
                      // disabled={}
                      className="last:active:bg-text/15  flex cursor-pointer items-center gap-2 rounded-lg bg-text  bg-opacity-70 px-4 py-2 text-red-500 opacity-0 transition-all  hover:bg-opacity-80  disabled:bg-slate-300 disabled:text-slate-500 group-hover/buttons:opacity-100  dark:bg-bg  dark:bg-opacity-90   dark:hover:bg-opacity-100 dark:disabled:bg-slate-700  dark:disabled:text-slate-500  "
                      onClick={() => {
                        if (deleteImageMutation.isLoading) return;
                        deleteImageMutation.mutate();
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
              <button
                onClick={handleNextImage}
                className={twMerge(
                  `flex h-full w-20 items-center  justify-center overflow-hidden rounded-r-lg border-2 text-bg opacity-0  transition-all group-hover:opacity-100 dark:bg-bg  dark:text-text ${borderColorVariants[color]} border-l-0 bg-text bg-opacity-50 hover:bg-opacity-60 dark:bg-opacity-50 dark:text-text dark:hover:bg-opacity-60 `,
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
                >
                  <path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
      {galleryImages?.length > 1 && (
        <div className="mt-4 flex flex-row items-center justify-center gap-2">
          {galleryImages?.map(
            (
              gallery: { imageUrl: string; thumbnailUrl: string },
              index: number
            ) => {
              return (
                <LazyLoadImage
                  key={index}
                  src={`https://www.trainjumper.com${gallery.thumbnailUrl}`}
                  alt="Modpack Image"
                  width="81.3"
                  height="43.3"
                  className={twMerge(
                    "aspect-video max-h-20 cursor-pointer place-self-center overflow-hidden rounded-md border-2 bg-text/50 object-fill object-center dark:bg-bg lg:max-h-60",
                    currentImageIndex === index
                      ? `border-text/90 shadow-inner `
                      : `border-text/50 hover:border-text/90 hover:shadow-inner`
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                />
              );
            }
          )}
        </div>
      )}
      <Dialog
        open={showModal}
        dialogStateChange={(open: any) => setShowModal(open)}
        contents={
          <div className="fixed top-48 z-50 grid items-center  bg-black/80">
            <img
              src={`https://www.trainjumper.com${imageSrc}`}
              alt="Modpack Image"
              className="w-full md:w-[600px] lg:w-[896px]"
            />
            <button
              className="py-2 hover:bg-sec/20"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        }
      />
    </div>
  );
};
