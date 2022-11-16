import { RiAddLine } from "react-icons/ri";
import { trpc } from "../utils/trpc";
import AddNewButton from "./addNew";

type CategoryProps = {
  name: string;
  children?: React.ReactNode;
  onAdd: () => void;
};

export const Category: React.FC<CategoryProps> = ({ name, children, onAdd }) => {

  return (
    <div className="flex flex-col min-h-screen justify-center">
      <h2 className="text-gray-200 text-xl font-extrabold ml-4 my-2">{name}</h2>
      <div className="flex flex-col gap-2 rounded bg-inherit text-white w-[20rem] shadow-sm border-slate-700 h-3/4 mx-2 p-2">
        <AddNewButton
          text="task"
          onAdd={() => onAdd()}
        />
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  )
};
