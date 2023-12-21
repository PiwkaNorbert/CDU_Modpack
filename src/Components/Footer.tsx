import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const [isPageBottom, setPageBottom] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the footer is in viewport, then we're at the bottom of the page
        if (entry.isIntersecting) setPageBottom(true);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  return (
    <footer
      ref={footerRef}
      className={`mt-auto pt-24 pb-12 px-4 hidden text-text-1 text-sm sm:block lg:mx-auto lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px]  xl:text-base  `}
      id="footer"
    >
      <p className="pb-10">&copy; 2023 CDU. All rights reserved.</p>
      <div className="p-footer-inner">
        <div className="p-footer-row">
          <section className="p-footer-row-opposite ">
            <ul className="flex flex-wrap items-center justify-end pb-4 md:px-4 lg:px-1 ">
              <li>
                <a
                  href={"/found-issue"}
                  className="rounded-md px-4 py-2 hover:bg-pri/10"
                >
                  Found Issue?
                </a>
              </li>
              <li>
                <a
                  className="rounded-md px-4 py-2 hover:bg-pri/10"
                  href="https://forum.playcdu.co"
                  target="_blank"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  className="rounded-md px-4 py-2  hover:bg-pri/10"
                  href="https://forum.playcdu.co/misc/contact"
                  data-xf-click="overlay"
                  target="_blank"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  className="rounded-md px-4 py-2 hover:bg-pri/10"
                  href="https://forum.playcdu.co/help/terms/"
                  target="_blank"
                >
                  Terms and rules
                </a>
              </li>
              <li>
                <a
                  className="rounded-md px-4 py-2 hover:bg-pri/10"
                  href="https://forum.playcdu.co/help/privacy-policy/"
                  target="_blank"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="rounded-md px-4 py-2 hover:bg-pri/10"
                  href="https://forum.playcdu.co/help/"
                  target="_blank"
                >
                  Help
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div className="p-body-inner m-4  my-0 flex h-10 items-center justify-end md:mr-0 lg:mr-0">
          {/* button to scroll to the top of the page */}
          {isPageBottom ? (
            <button
              className="flex items-center justify-center rounded-full bg-pri p-4 text-bg text-sm hover:bg-opacity-80 dark:hover:bg-hover-2 xl:text-base"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M207.39,115.06A8,8,0,0,1,200,120H136v96a8,8,0,0,1-16,0V120H56a8,8,0,0,1-5.66-13.66l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,207.39,115.06Z"></path>
              </svg>
            </button>
          ) : (
            <div className="h-10 w-10"></div>
          )}
        </div>
      </div>
    </footer>
  );
};
export default Footer;
