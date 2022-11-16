import { useEffect, useRef } from "react";

const useHasChanged = (val: any) => {
  const prevVal = usePrevious(val)
  return prevVal !== val
}

export default useHasChanged;

const usePrevious = (value: any) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

