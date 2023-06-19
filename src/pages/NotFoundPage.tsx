const NotFoundPage = () => {
  return (
    <div className="mb-auto grid h-full w-full flex-1  items-center  text-xl text-text xl:text-2xl">
      <div>
        <h1 className="">404: Page Not Found</h1>
        {/* button to return to homepage */}
        <button
          className=" rounded-m bg-bg px-3 py-1 "
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
