import { ICommentComponent } from "../UTILS/Interfaces";
import relativeDate from "../HELPER/relativeDate"

export function CommentsComponent({index, borderColor, comment} : ICommentComponent ) {

  
  return (
    <div key={index} className="grid items-center justify-between">
      <div className="  flex items-center gap-4 pt-[1em] text-base">
        <img className="w-10 h-10 rounded-full" src={comment.image} alt="user" />
        <div className="flex gap-2 items-center">
            <p className={`"text-content  text-justify text-${borderColor}-600`}>
              {comment.username}
            </p>
            <p className="text-content text-justify text-gray-400 text-xs">{relativeDate(comment.timestamp)}</p>
        </div>
      </div>
      <p className="text-content p-[.5em] text-justify text-sm">{comment.comment}</p>
    </div>
  );
}
