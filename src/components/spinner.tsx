import { AnimatePresence, motion } from "framer-motion"

type SpinnerProps = {
  show: boolean;
};

export const Spinner = ({ show }: SpinnerProps) => {
  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        className="flex justify-center items-center mt-16"
      >
        <div className="spinner w-8 h-8 border-4 rounded-full border-x-fuchsia-700 border-y-transparent"></div>
      </motion.div>
    </AnimatePresence>
  )
};
