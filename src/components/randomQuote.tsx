import { motion } from "framer-motion"
import useQuote from "./hooks/useQuote";
import { Spinner } from "./spinner";

const RandomQuote = () => {
  const quote = useQuote();

  return (
    quote ?
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-lg sm:text-2xl text-slate-600 flex flex-col w-3/4 gap-4 items-center justify-center text-center transition-opacity duration-300 ease-in-out">
        <p className="italic">
          &quot;{quote.content}&quot;
        </p>
        <p className="text-sm">
          {quote.author}
        </p>
      </motion.div>

      : <Spinner show={quote === undefined} />
  )
}

export default RandomQuote;
