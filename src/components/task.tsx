import React, { useEffect, useRef, useState } from "react"
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { RiCheckLine } from "react-icons/ri";

type TaskProps = {
  id: string;
  order: number;
  title: string;
  description?: string;
  tags?: string[];
  onEdit: (id: string, title: string, description: string) => void;
  onDelete: () => void;
  isNew: boolean;
};

export const Task = ({ id, order, title, description, tags, onEdit, onDelete, isNew }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualTitle, setActualTitle] = useState(title)
  const [actualDesc, setActualDesc] = useState(description)
  const [titleHeight, setTitleHeight] = useState<number>()
  const titleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isNew) {
      setIsEditing(true);
    }
  }, [])

  useEffect(() => {
    if (!isEditing) {
      onEdit(id, actualTitle, actualDesc || '')
    }

    titleRef.current?.focus();
  }, [isEditing]);

  useEffect(() => {
    // TODO: Need to implement automatic height for both title and desc
    // setTitleHeight(titleRef.current?.scrollHeight);
  }, [actualTitle])

  const handleTitleChange = (value: string) => {
    setActualTitle(value);
  }

  return (
    <div className={`relative flex flex-col rounded-lg bg-slate-700 
        text-white w-full border border-slate-700 transition-all 
        duration-100 ease-in-out hover:border-lime-700 glassmorph-dark h-content
        ${isEditing ? 'border-lime-700' : ''}
      `}
    >
      <div className="p-2">

        <textarea
          ref={titleRef}
          name="title"
          readOnly={!isEditing}
          value={actualTitle}
          onChange={e => handleTitleChange(e.target.value)}
          className={`text-xl bg-inherit p-2 font-bold first-letter:uppercase focus:outline-none w-full resize-none text-ellipsis`}
          rows={1}
        />
        <textarea
          name="desc"
          readOnly={!isEditing}
          value={actualDesc}
          onChange={e => setActualDesc(e.target.value)}
          className="m-1 p-1 bg-inherit text-gray-400 break-word h-content align-top focus:outline-none w-full h-auto resize-none text-ellipsis"
          rows={2}
        />
      </div>

      <div className="flex flex-row items-center px-3 py-2 justify-between w-full border-t-2 text-slate-500 border-slate-600">
        <div className="flex gap-4">
          <button
            title={isEditing ? "Done editing" : "Edit"}
            className={`text-xl transition-all duration-100 ease-in-out hover:text-violet-700 ${isEditing && "text-lime-700"}`}
            onClick={() => setIsEditing(prev => !prev)}
          >{isEditing ? <RiCheckLine /> : <FiEdit3 />}</button>
          <button
            title="Delete"
            className={`text-xl transition-all duration-100 ease-in-out hover:text-red-700`}
            onClick={onDelete}
          > < FiTrash2 />

          </button>
        </div>

        {(tags && tags.length > 0) &&
          <div className="flex flex-row gap-2">
            {tags.map((tag, i) =>
              <div key={i} className="rounded-2xl px-2 py-0.5 text-sm bg-red-700 text-white even:bg-lime-700">{tag}</div>
            )
            }
          </div>
        }

      </div>
    </div >
  )
};
