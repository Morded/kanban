import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiGrid } from "react-icons/fi";
import { trpc } from "../utils/trpc";
import useUserId from "./hooks/useUserId";

type ChangeCategoryButtonProps = {
  id: string,
  categoryId: string,
  onClick: (id: string, newCategoryId: string) => void,
}

const ChangeCategoryButton = ({ id, categoryId, onClick }: ChangeCategoryButtonProps) => {
  const userId = useUserId()
  const categories = trpc.useQuery(["category.getAllActive", { userId: userId }]);
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
            initial={{
              translateX: '-100%',
            }}
            animate={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              boxShadow: "1px 1px 6px rgba(0, 0, 0, 0.2)",
              height: '13.5rem',
              opacity: 10,
              translateX: '-55%',
              translateY: '-95%',
            }}
            whileHover={{
              overflowY: 'auto'
            }}
            exit={{
              backgroundColor: "rgba(0, 0, 0, 0)",
              boxShadow: "1px 1px 6px rgba(0, 0, 0, 0)",
              opacity: 0,
              translateX: '-100%',
            }}
            className="absolute overflow-hidden opacity-0 rounded-xl rounded-br-none border border-slate-700 text-white text-lg bg-black bg-opacity-20">
            {categories.data && categories.data
              .map((category, i) =>
                <motion.button
                  key={category.id}
                  onClick={() => onClick(id, category.id)}
                  initial={{
                    opacity: 0,
                    translateY: '20px',
                  }}
                  animate={{
                    opacity: 1,
                    translateY: '0px',
                  }}
                  transition={{
                    delay: 0.1 * i
                  }}
                  exit={{ opacity: 0 }}
                  disabled={category.id === categoryId}
                  className={`
                  p-3 border-b last:border-b-0 border-slate-600 w-[12rem] opacity-0
                  font-bold w-content ${category.id === categoryId ? 'text-slate-700' : 'hover:text-violet-500'}
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
