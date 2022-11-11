import React, { useEffect, useRef, useState } from "react"
import { FiEdit3 } from "react-icons/fi";
import { RiCheckLine } from "react-icons/ri";

type TaskProps = {
  title: string;
  description?: string;
  tags?: string[];
};

export const Task = ({ title, description, tags }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, [isEditing]);

  return (
    <div className={`relative flex flex-col rounded-lg bg-slate-700 
        text-white w-full border border-slate-700 transition-all 
        duration-100 ease-in-out hover:border-lime-700 glassmorph-dark
        ${isEditing ? 'border-lime-700' : ''}
      `}
    >
      <div className="p-2">
        <h2 ref={titleRef} className="text-xl p-2 font-bold first-letter:uppercase focus:outline-none" contentEditable={isEditing}>{title}</h2>
        <p className="m-1 p-1 bg-inherit text-gray-400 break-word h-content align-top focus:outline-none" contentEditable={isEditing}>{description}</p>
      </div>

      <div className="flex flex-row items-center px-3 py-2 justify-between w-full border-t-2 text-slate-500 border-slate-600">
        <button
          title={isEditing ? "Done editing" : "Edit"}
          className={`text-xl transition-all duration-100 ease-in-out hover:text-violet-700 ${isEditing && "text-lime-700"}`}
          onClick={() => setIsEditing(prev => !prev)}
        >{isEditing ? <RiCheckLine /> : <FiEdit3 />}</button>

        {(tags && tags.length > 0) &&
          <div className="flex flex-row gap-2">
            {tags.map(tag =>
              <div className="rounded-2xl px-2 py-0.5 text-sm bg-red-700 text-white even:bg-lime-700">{tag}</div>
            )
            }
          </div>
        }

      </div>
    </div >
  )
};
