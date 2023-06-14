import { IModpack } from '../UTILS/Interfaces'

const ModpackCard = ({ modpackId, name, imageUrl, color, voteCount, commentCount }: IModpack) => {
  return (
    <div
    key={modpackId}
    className={`flex items-start  justify-center overflow-hidden  rounded-md border-[3.5px] text-bkg-0 border-${color}-300 `}
  >
    <a
      href={`/pack-details/${modpackId}`}
      className={`grid h-full flex-1 relative  text-sm xl:text-base justify-items-center `}
    >
      {/* toggle images in production */}
        <img
          src={`https://www.trainjumper.com${imageUrl}`}
          alt="random"
          loading="lazy"
          className="  aspect-auto  w-full overflow-hidden object-cover  object-center"
          />

          <div className={`absolute flex rounded-r-full overflow-hidden  text-${color}-300 text-sm xl:text-base top-0 left-0 `}>


          <span className={`flex items-center    fill-blue-500 bg-current  justify-center bg-center bg-contain bg-no-repeat w-8 h-8 bg-heart`}>{voteCount}</span>
          <span className="flex items-center   justify-center bg-current text-center bg-center bg-contain bg-no-repeat w-8 h-8 bg-comment ">
                {commentCount}
          </span>
          </div>


      <p className="text-content  flex justify-center px-2 py-4 text-center    hyphens-auto  uppercase">
        {name}
      </p>
        
      </a>
  </div>
  )
}

export default ModpackCard