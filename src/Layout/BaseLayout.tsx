import { useLocation } from "react-router-dom";
import { UserProviderProps } from "../Utils/Types";

export default function BaseLayout({ children }: UserProviderProps) {
  const location = useLocation();

  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/list-archived-packs" ||
    location.pathname === "/list-suggested-packs";

  return (
    <section
      id="modpack__layout"
      className={`empty:hidden relative grid h-full w-full z-[1] justify-normal text-text-1 lg:mx-auto lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px] px-4 md:px-8 md:py-4 ${
        isHomePage
          ? "self-center lg:px-0 "
          : "gap-4 bg-card border border-border pb-4 dark:border-none dark:shadow md:mb-4 lg:rounded-2xl md:border-none md:shadow-xl "
      } `}
    >
      {children}
    </section>
  );
}
