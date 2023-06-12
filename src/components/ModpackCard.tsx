import { IModpack } from '../UTILS/Interfaces'

const ModpackCard = ({ modpackId, name, imageUrl, color, voteCount, commentCount }: IModpack) => {
  return (
    <div
    key={modpackId}
    className={`flex items-start  justify-center overflow-hidden  rounded-md border-[3.5px] text-bkg-0 border-${color}-300 `}
  >
    <a
      href={`/modpack/${modpackId}`}
      className={`grid h-full flex-1  text-sm justify-items-center `}
    >
      {/* toggle images in production */}
      <div className={` max-h-26 relative   w-full flex-1 text-${color}-300 text-sm`} >

        <img
          src={`https://www.trainjumper.com${imageUrl}`}
          alt="random"
          loading="lazy"
          className=" h-26 w-full object-fill  object-center"
          />
          <div className="absolute flex rounded-r-full overflow-hidden  -bottom-2 left-0 l">


          <span className={`flex items-center    fill-blue-500 bg-current  justify-center bg-center bg-contain bg-no-repeat w-8 h-8 bg-heart`}>{voteCount}</span>
          <span className="flex items-center   justify-center bg-current text-center bg-center bg-contain bg-no-repeat w-8 h-8 bg-comment ">
                {commentCount}
          </span>
          </div>

      </div>

      <p className="text-content  flex justify-center px-2 py-4 text-center    hyphens-auto  uppercase">
        {name}
      </p>
        
      </a>
  </div>
  )
}

export default ModpackCard