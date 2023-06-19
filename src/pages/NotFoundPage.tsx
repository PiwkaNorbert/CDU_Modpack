const NotFoundPage = () => {
  return (
    <div className="h-4xl grid w-full items-center justify-center text-xl text-text xl:text-2xl">
      <h1>404: Page Not Found</h1>
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
  );
};

export default NotFoundPage;
