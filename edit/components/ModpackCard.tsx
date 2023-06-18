import { IModpack } from '../UTILS/Interfaces'

const ModpackCard = ({ modpackId, name, imageUrl, color, voteCount, commentCount }: IModpack) => {
  return (
    <div
    key={modpackId}
    className={`flex items-start z-10 justify-center overflow-hidden rounded-md border-[3.5px] text-text border-${color}-300 `}
    // onMouseEnter={() => {
    //   queryClient.prefetchQuery(['details', modpackId],()=>fetchPackDetail(modpackId as string, null))
    // }}
  >
    <a
      href={`/pack-details/${modpackId}`}
      className={`grid h-full flex-1 relative text-base/[1.25rem] justify-items-center `}
    >
      {/* toggle images in production */}
        <img
        src={`https://www.trainjumper.com${imageUrl}`}
          alt={name? name + " Image" : "Pack Image"}
          loading="lazy"
          width="275"
          height="155"
          // onLoad={(e) => {
          //   e.currentTarget.classList.remove('blur-md')
          // }}
          className={`aspect-auto text-right bg-${color}-300 border-b-[3.5px] border-${color}-300 w-full overflow-hidden object-cover object-center`}
          />

          <div className={`absolute flex rounded-r-full overflow-hidden text-bg dark:text-text bg-${color}-300 text-base leading-5 top-0 left-0 `}>

            <span className={`flex items-center   justify-center bg-transparent bg-center bg-contain bg-no-repeat w-8 h-8 bg-heart`}>{voteCount}</span>
            <span className="flex items-center justify-center bg-transparent text-center bg-center bg-contain bg-no-repeat w-8 h-8 bg-comment ">
                  {commentCount}
            </span>

          </div>

      <p className="text-content flex justify-center px-2 py-4 text-center hyphens-auto uppercase">
        {name}
      </p>
      
      </a> 
  </div>
  )
}

export default ModpackCard