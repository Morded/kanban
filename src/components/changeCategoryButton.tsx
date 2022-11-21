import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiGrid } from "react-icons/fi";
import { trpc } from "../utils/trpc";

type ChangeCategoryButtonProps = {
  id: string,
  categoryId: string,
  onClick: (id: string, newCategoryId: string) => void,
}

const ChangeCategoryButton = ({ id, categoryId, onClick }: ChangeCategoryButtonProps) => {
  const categories = trpc.useQuery(["category.getAllActive"]);
  const [isOpen, setIsOpen] = useState(false);
  const componentRef = useRef(null);
  useOutsideCloser(componentRef);

  function useOutsideCloser(ref: any) {
    useEffect(() => {
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div ref={componentRef} className="relative flex justify-center">
      <button onClick={() => setIsOpen(!isOpen)} className="text-xl hover:text-violet-500">
        <FiGrid />
      </button>
      <AnimatePresence>
        {isOpen &&
          <motion.div
            key="modal"
            animate={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              boxShadow: "1px 1px 6px rgba(0, 0, 0, 0.2)",
              height: '13.5rem',
              width: 'auto',
              opacity: 10,
              translateX: '-55%',
              translateY: '-95%',
              overflowY: 'auto'
            }}
            exit={{
              backgroundColor: "rgba(0, 0, 0, 0)",
              boxShadow: "1px 1px 6px rgba(0, 0, 0, 0)",
              height: 0,
              width: 0,
              opacity: 0
            }}
            className="absolute overflow-hidden h-0 w-0 opacity-0 rounded-xl rounded-br-none border border-slate-700 text-white text-lg bg-black bg-opacity-20">
            {categories.data && categories.data
              .map(category =>
                <motion.button
                  key={category.id}
                  onClick={() => onClick(id, category.id)}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 100,
                  }}
                  exit={{ opacity: 0 }}
                  disabled={category.id === categoryId}
                  className={`
                  p-3 border-b last:border-b-0 border-slate-600 w-[12rem] opacity-0
                  font-bold w-content ${category.id === categoryId ? 'text-slate-600' : 'hover:text-violet-500'}
                `}>
                  {category.name}
                </motion.button>
              )}
          </motion.div>
        }
      </AnimatePresence>
    </div >
  )
}

export default ChangeCategoryButton;
