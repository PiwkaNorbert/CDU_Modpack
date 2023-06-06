export const Footer = () => {
  return (
    <footer
      className="text-bgk-100 border-t-4 border-bkg-200 bg-bkg-600 text-sm  "
      id="footer"
    >
      <div className="p-footer-inner">
        <div className="p-footer-row">
          <div className="p-footer-row-opposite ">
            <ul className="flex flex-wrap items-center justify-end gap-4 px-4  pb-3 pt-2 text-bkg-100">
              <li>
                <a
                  className="rounded-sm px-1 py-0.5 hover:bg-hover-2"
                  href="/misc/contact"
                  data-xf-click="overlay"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  className="rounded-sm px-1 py-0.5 hover:bg-hover-2"
                  href="/help/terms/"
                >
                  Terms and rules
                </a>
              </li>
              <li>
                <a
                  className="rounded-sm px-1 py-0.5 hover:bg-hover-2"
                  href="/help/privacy-policy/"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <a
                  className="rounded-sm px-1 py-0.5 hover:bg-hover-2"
                  href="/help/"
                >
                  Help
                </a>
              </li>
              <li>
                <a
                  className="rounded-sm px-1 py-0.5 hover:bg-hover-2"
                  href="https://forum.playcdu.co"
                >
                  Home
                </a>
              </li>
              <li>
                <button
                  className="rounded-sm bg-white px-1 py-0.5 hover:bg-hover-2 "
                  href="/forums/-/index.rss"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="h-4  w-4 fill-[#ffa500]  "
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM96 136c0-13.3 10.7-24 24-24c137 0 248 111 248 248c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-110.5-89.5-200-200-200c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24c83.9 0 152 68.1 152 152c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-57.4-46.6-104-104-104c-13.3 0-24-10.7-24-24zm0 120a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
