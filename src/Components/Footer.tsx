const Footer = () => {
  return (
    <footer
    className={`mt-auto hidden text-text-1 text-sm sm:block lg:mx-auto lg:w-[900px] xl:w-[1100px] 2xl:w-[1300px]  xl:text-base  `}
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
    </div>
  </footer>

  );
};
export default Footer;
