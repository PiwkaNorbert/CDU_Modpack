
const NotFoundPage = () => {
  return (
    <div className="text-text text-xl xl:text-2xl h-screen w-full grid justify-center items-center">
      <h1>404: Page Not Found</h1>
      {/* button to return to homepage */}
      <button className=" rounded-m bg-bg px-3 py-1 " onClick={()=>{
        window.location.href = "/"
      }}>Return to Homepage</button>

    </div>
  )
}

export default NotFoundPage