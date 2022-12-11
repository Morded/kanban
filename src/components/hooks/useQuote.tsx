import axios from "axios";
import { useEffect, useMemo, useState } from "react";

type Quote = {
  author: string;
  content: string;
}

const useQuote = () => {
  const [quote, setQuote] = useState<Quote>();

  const fetchRandomQuote = useMemo(() => async () => {
    if (quote === undefined) {
      await axios.get('https://api.quotable.io/random', { params: { tags: 'technology' } }).then((data) => {
        const { author, content } = data.data;
        setQuote({ author: author, content: content });
      })
    }
  }, [])

  useEffect(() => {
    fetchRandomQuote();
  }, [])

  return quote;
}

export default useQuote;
