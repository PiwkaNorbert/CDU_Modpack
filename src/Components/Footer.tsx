const Footer = () => {
  return (
    <footer
      className={`mt-10 hidden text-sm text-text sm:block lg:mx-auto lg:min-w-[900px] lg:max-w-[900px] xl:text-base  `}
      id="footer"
    >
      <div className="p-footer-inner">
        <div className="p-footer-row">
          <div className="p-footer-row-opposite ">
            <ul className="flex flex-wrap items-center justify-end gap-4 px-8 py-2 pb-4 md:px-4 lg:px-1 ">
              <li>
                <a
                  className="rounded-sm px-3 py-1 hover:bg-hover-2"
                  href="https://forum.playcdu.co"
                  target="_blank"
                >
                  Forum
                </a>
              </li>
              <li>
                <a
                  className="rounded-md px-3 py-1  hover:bg-hover-2"
                  href="https://forum.playcdu.co/misc/contact"
                  data-xf-click="overlay"
                  target="_blank"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  className="rounded-sm px-3 py-1 hover:bg-hover-2"
                  href="https://forum.playcdu.co/help/terms/"
                  target="_blank"
                >
                  Terms and rules
                </a>
              </li>
              <li>
                <a
                  className="rounded-sm px-3 py-1 hover:bg-hover-2"
                  href="https://forum.playcdu.co/help/privacy-policy/"
                  target="_blank"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                {" "}
                <a
                  className="rounded-sm px-3 py-1 hover:bg-hover-2"
                  href="https://forum.playcdu.co/help/"
                  target="_blank"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;