import React, { useEffect, useRef, useState } from "react"
import { FiEdit3 } from "react-icons/fi";
import { RiCheckLine } from "react-icons/ri";

type TaskProps = {
  title: string,
  description?: string
};

export const Task = ({ title, description }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, [isEditing]);

  return (
    <div className="relative flex flex-col rounded-lg bg-slate-700 text-white w-8/12 mx-auto my-auto">
      <div className="p-2">
        <h2 ref={titleRef} className="text-xl p-2 font-bold first-letter:uppercase" contentEditable={isEditing}>{title}</h2>
        <p className="m-1 p-1 bg-gray-700 break-word h-content align-top " contentEditable={isEditing}>{description}</p>
      </div>

      <div className="w-full border-t-2 text-slate-500 border-slate-800">
        <button
          title={isEditing ? "Done editing" : "Edit"}
          className={`p-3 text-xl transition-all delay-100 ease-in-out hover:text-yellow-200 ${isEditing && "text-yellow-200"}`}
          onClick={() => setIsEditing(prev => !prev)}
        >{isEditing ? <RiCheckLine /> : <FiEdit3 />}</button>

      </div>
    </div>
  )
};
