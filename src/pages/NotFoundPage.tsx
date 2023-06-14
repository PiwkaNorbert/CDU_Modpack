
const NotFoundPage = () => {
  return (
    <div className="text-bkg-100 text-xl xl:text-2xl  dark:text-bkg-0 h-screen w-full grid justify-center items-center">
      <h1>404: Page Not Found</h1>
      {/* button to return to homepage */}
      <button className=" rounded-md  bg-bkg-400 px-3 py-1 " onClick={()=>{
        window.location.href = "/"
      }}>Return to Homepage</button>

    </div>
  )
}

export default NotFoundPage