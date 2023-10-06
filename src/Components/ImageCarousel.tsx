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
import { IPackDetails } from "../Utils/Interfaces";

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

  const { modpackId } = useParams();
  const queryClient = useQueryClient();
  
  const imagePath = galleryImages[currentImageIndex].imageUrl;
  const imageIdPattern = /\b[0-9A-Fa-f]+(?=\.\w+$)/;
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
      onSuccess: ({data}) => {

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
        queryClient.invalidateQueries(["modpacks", "details", modpackId]);
      },  
    }  
  );  
  const deleteImageMutation = useMutation(
    async () =>
      await axios.post(
        `${apiBase}/api/delete_pack_image`,
        { imageId: match && match[0], modpackId },
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
        <div className="w-full h-full flex overflow-hidden z-[5]  rounded-md ">
          {galleryImages.map(({imageUrl}: {imageUrl:string}, index: number )=>
            
              <img
                    key={index}
                    src={`https://www.trainjumper.com${imageUrl}`}
                    alt={`Modpack Image ${index + 1}`}
                    style={{translate: `${-100 * currentImageIndex}%`}}
                    // width="412"
                    // height="233"
                    className={` w-full shrink-0 grow-0 block object-cover border-2 rounded-md transition-all duration-300 min-h-[236.88px]  ${borderColorVariants[color]} ${bgColorVariants[color]}`}
                />
              
         )}
        </div>
        {galleryImages?.length > 0 && (
          <div className="absolute inset-0 mx-auto flex w-full h-full">
            <div className="group flex flex-1 items-center justify-between  transition-all  ">
              <button
                aria-label="Previous Image"
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
                  aria-hidden
                >
                  <path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path>
                </svg>
              </button>
              {/* <div className="absolute z-10 hidden h-full w-full items-center justify-center gap-1 rounded-lg bg-sec/80 group-hover:flex"></div> */}
              <div
                aria-label="Show Image Enlarged"
                className="group/buttons flex h-full w-full  cursor-pointer flex-col items-center justify-center gap-1 "
                onClick={(e) =>
                  e.currentTarget === e.target &&
                  handleImageClick(galleryImages[currentImageIndex].imageUrl)
                }
              >
                {location.pathname.includes("edit-") && (
                  <>
                    <button
                      disabled={primaryImageMutation.isLoading}
                      className="last:active:bg-text/15 flex cursor-pointer disabled:cursor-auto items-center gap-2 rounded-lg bg-text bg-opacity-70 px-4 py-2  text-blue-500 opacity-0 transition-all  hover:bg-opacity-80 disabled:bg-slate-300   disabled:text-slate-500  group-hover/buttons:opacity-100  dark:bg-bg dark:bg-opacity-90  dark:hover:bg-opacity-100 dark:disabled:bg-slate-700  dark:disabled:text-slate-500 "
                      onClick={() => {
                        if (primaryImageMutation.isLoading) return;
                        primaryImageMutation.mutate();
                      }}
                    >
                      {primaryImageMutation.isLoading ? "Making Primary..." : "Make Primary"}

                    </button>
                    <button
                      disabled={deleteImageMutation.isLoading}
                      className="last:active:bg-text/15  flex cursor-pointer disabled:cursor-auto items-center gap-2 rounded-lg bg-text  bg-opacity-70 px-4 py-2 text-red-500 opacity-0 transition-all  hover:bg-opacity-80  disabled:bg-slate-300 disabled:text-slate-500 group-hover/buttons:opacity-100  dark:bg-bg  dark:bg-opacity-90   dark:hover:bg-opacity-100 dark:disabled:bg-slate-700  dark:disabled:text-slate-500  "
                      onClick={() => {
                        if (deleteImageMutation.isLoading) return;
                        deleteImageMutation.mutate();
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
                  alt={`Image ${index + 1}`}
                  width="81.3"
                  height="43.3"
                  className={twMerge(
                    "aspect-video max-h-20 cursor-pointer place-self-center overflow-hidden rounded-md border-2 bg-text/50 object-fill object-center dark:bg-bg lg:max-h-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800 focus-visible:ring-white   ",
                    currentImageIndex === index
                      ? `border-text/90 shadow-inner `
                      : `border-text/50 hover:border-text/90 hover:shadow-inner`
                  )}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Image Thumbnail ${index + 1}`}
                />
              );
            }
          )}
        </div>
      )}
      <Dialog
        open={showModal}
        dialogStateChange={(open) => setShowModal(open)}
        contents={
          <div className="fixed inset-0 h-full w-full z-50 grid items-center justify-center "
          onClick={() => setShowModal(false)}
          >
            <div className="flex flex-col  bg-black">

            <img
              src={`https://www.trainjumper.com${imageSrc}`}
              alt="Modpack Image"
              className="w-full md:w-[600px] lg:w-[896px] "
              />
            <button
              className="py-2 hover:bg-sec/20  w-full  text-text hover:text-text dark:hover:bg-hover-2 dark:text-text dark:hover:text-text"
              onClick={() => setShowModal(false)}
              aria-label="Close Modal"
              >
              Close
            </button>
              </div>
          </div>
        }
      />
    </div>
  );
};
