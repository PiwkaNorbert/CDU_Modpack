import { ICommentComponent } from "../UTILS/Interfaces";
import relativeDate from "../HELPER/relativeDate"

import { useUser } from "../HELPER/UserContext";

export function CommentsComponent({ index, borderColor, comment} : ICommentComponent ) {

const {user} = useUser();

  return (
    <div key={index} className="grid items-center justify-between">
      <div className="  flex items-center gap-4 pt-[1em] text-base">
        <img className="w-10 h-10 rounded-full" src={comment?.avatar_url} alt="user" />
        <div className="flex gap-2 items-center">
            <p className={`text-content  text-justify text-${borderColor}-600`}>
              {comment.username}
            </p>
            <p className="text-content text-justify text-gray-400 text-xs xl:text-sm">{relativeDate(comment?.timestamp)}</p>
      {/* If userProfile is super user / moderator show delete comment button underneith */}
      {
    user?.isAdmin && (

          <div className="flex items-center gap-2">
            {/* <button className={`text-content text-justify text-${borderColor}-600 text-xs hover:bg-hover-1 px-3 py-1 rounded-md`}
            onClick={()=>{

              axios.delete(`http://trainjumper.com/api/delete-comment/${modpackId}/${comment._id}`,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                }
              }
              )}}>Delete</button> */}
          </div>
        )
      }
        </div>
      </div>
      <p className="text-content p-[.5em] text-justify text-sm xl:text-base  xl:text-base">{comment?.comment}</p>

    </div>
  );
}
