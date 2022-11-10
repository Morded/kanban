import React from "react"
import { FiEdit3 } from "react-icons/fi";

type TaskProps = {
  title: string,
  desc?: string
};

export const Task = ({ title, desc }: TaskProps) => {
  return (
    <div className="relative flex flex-col rounded-lg bg-gray-700 text-white w-8/12 mx-auto my-auto">
      <button title="Edit" className="absolute right-0 p-4 text-xl hover:text-yellow-200 transition-color delay-100 ease-in-out"><FiEdit3 /></button>
      <h2 className="text-xl p-2 font-bold" contentEditable="true">{title}</h2>
      <p className="m-1 p-1 bg-gray-700 break-all h-[200px] align-top truncate">{desc}</p>
    </div >
  )
};

