import AddNewButton from "./addNew";
import { motion } from "framer-motion"

type CategoryProps = {
  name: string;
  index: number;
  children?: React.ReactNode;
  onAdd: () => void;
};

export const Category: React.FC<CategoryProps> = ({ name, index, children, onAdd }) => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.2 * index
      }}
      className="flex flex-col min-h-fit justify-center mb-20 sm:mb-0">
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
    </motion.div>
  )
};
