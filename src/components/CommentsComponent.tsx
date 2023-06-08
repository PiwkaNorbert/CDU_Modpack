import React from "react";

export function CommentsComponent({ index, borderColor, username, comment }) {
  return (
    <div key={index} className="grid items-center justify-between">
      <div className="  flex items-center gap-4 pt-[1em] text-base">
        <p className={`"text-content  text-justify text-${borderColor}-600`}>
          {username}
        </p>
      </div>
      <p className="text-content p-[.5em] text-justify text-sm">{comment}</p>
    </div>
  );
}
