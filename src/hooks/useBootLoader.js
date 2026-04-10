import { useEffect, useRef, useState } from "react";

const DEFAULT_DELAY_MS = 1200;
const DEFAULT_EXIT_MS = 400;

function useBootLoader({
  delayMs = DEFAULT_DELAY_MS,
  exitMs = DEFAULT_EXIT_MS,
} = {}) {
  const [showLoader, setShowLoader] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const schedule = (cb, ms) => {
      const id = setTimeout(cb, ms);
      timeoutsRef.current.push(id);
    };

    schedule(() => {
      setIsExiting(true);
      schedule(() => {
        setShowLoader(false);
      }, exitMs);
    }, delayMs);

    return () => {
      timeoutsRef.current.forEach((id) => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, [delayMs, exitMs]);

  return { showLoader, isExiting };
}

export default useBootLoader;
