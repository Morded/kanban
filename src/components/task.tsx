import React, { useEffect, useRef, useState } from "react"
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { RiCheckLine } from "react-icons/ri";
import TextareaAutosize from 'react-textarea-autosize';
import ChangeCategoryButton from "./changeCategoryButton";
import { AnimatePresence, motion } from "framer-motion";

type TaskProps = {
  id: string;
  title: string;
  description?: string;
  index: number;
  onEdit: (id: string, title: string, description: string, isNew: boolean) => void;
  onDelete: () => void;
  isNew: boolean;
  categoryId: string;
  onCategoryChange: (id: string, newCategoryId: string) => void;
};

export const Task = ({ id, title, description, index, onEdit, onDelete, isNew, categoryId, onCategoryChange }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [actualTitle, setActualTitle] = useState(title)
  const [actualDesc, setActualDesc] = useState(description)
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const original = { title: title, desc: description };

  useEffect(() => {
    if (isNew) {
      setIsEditing(true);
    }
  }, [])

  useEffect(() => {
    if (!isEditing && (original.title !== actualTitle || original.desc !== actualDesc)) {
      onEdit(id, actualTitle, actualDesc || '', isNew)
    }

    titleRef.current?.focus();
  }, [isEditing]);

  return (

    <AnimatePresence mode={"sync"}>
      <motion.div
        layout
        initial={{
          translateY: '10px',
          opacity: 0,
        }}
        animate={{
          translateY: '0px',
          opacity: 100,
        }}
        exit={{
          translateY: '10px',
          opacity: 0,
        }}
        transition={{ type: "spring", delay: 0.2 * index }}
        key={id}
        className={`relative flex flex-col rounded-lg
        text-white w-full border border-slate-800 
        hover:border-violet-700 glassmorph-dark h-content
        ${isEditing === true ? 'border-fuchsia-700' : ''}
      `}
      >
        <div className="p-2">
          <TextareaAutosize ref={titleRef} value={actualTitle} onChange={e => setActualTitle(e.target.value)}
            readOnly={!isEditing}
            className={`text-xl bg-inherit p-2 font-bold first-letter:uppercase focus:outline-none w-full resize-none text-ellipsis `}
          />
          <TextareaAutosize value={actualDesc} onChange={e => setActualDesc(e.target.value)}
            placeholder="Press TAB or click here for desc..."
            readOnly={!isEditing}
            className={`
            m-1 p-1 bg-inherit text-gray-400 break-word h-content align-top focus:outline-none w-full h-auto resize-none text-ellipsis
            ${actualDesc!.length > 0 ? 'h-auto' : 'h-8 opacity-50'} 
            ${isEditing ? 'focus:h-auto' : ''}
          `}
          />
        </div>

        <div className="flex flex-row items-center px-3 py-2 justify-between w-full text-slate-500 border-slate-800">
          <div className="flex gap-4">
            <button
              title={isEditing ? "Done editing" : "Edit"}
              className={`text-xl transition-all duration-100 ease-in-out hover:text-violet-700 ${isEditing && "text-fuchsia-700"}`}
              onClick={() => setIsEditing(prev => !prev)}
            >{isEditing ? <RiCheckLine /> : <FiEdit3 />}</button>
            <button
              title="Delete"
              className={`text-xl transition-all duration-100 ease-in-out hover:text-red-700`}
              onClick={onDelete}
            > < FiTrash2 />

            </button>
          </div>

          {isNew === false &&
            <ChangeCategoryButton
              id={id}
              categoryId={categoryId}
              onClick={onCategoryChange}
            />
          }


        </div>
      </motion.div >
    </AnimatePresence>
  )
};
