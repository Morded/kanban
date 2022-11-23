import type { NextPage } from "next";
import Link from "next/link";
import { motion } from "framer-motion"

const initial = {
  opacity: 0,
  transformY: '-10px'
}

const animate = {
  opacity: 1,
  transformY: '0'
}

const animateButton = {
  opacity: 1,
  transformY: '0',
  scale: [1, 2, 1]
}

const Home: NextPage = () => {
  return (
    <div className="flex flex-col pt-20 sm:pt-0 justify-start sm:justify-center items-center w-full min-h-screen text-center">
      <motion.h1
        initial={initial}
        animate={animate}
        transition={{
          duration: 0.2
        }}
        className="text-4xl sm:text-5xl align-center md:text-[5rem] leading-normal font-extrabold text-white"
      >
        Morded Kanban
      </motion.h1>
      <motion.p
        initial={initial}
        animate={animate}
        transition={{
          delay: 0.2,
          duration: 0.2
        }}
        className="text-lg md:text-2xl align-center text-gray-100"
      >
        An excellent way to track your tasks
      </motion.p>

      <div className="p-6"></div>

      <Link href="/register">
        <motion.a
          initial={initial}
          animate={animateButton}
          transition={{
            delay: 0.4,
            duration: 0.3
          }}
          className="cursor-pointer text-white hover:shadow-md text-2xl shadow-md py-3 px-6 hover:bg-gray-700 transition-all hover:scale-105 duration-200 drop-shadow-2xl drop-shadow-2xl font-bold rounded-3xl bg-gradient-to-r from-violet-800 to-fuchsia-800
                duration-300 transition-all ease-in-out hover:from-violet-700 hover:to-fuchsia-700"
        >
          Get started
        </motion.a></Link>
    </div>
  );
};

export default Home;

