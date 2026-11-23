import { useEffect, useState } from "react";

const useCountdown = (seconds, isRunning) => {
  
  
  const [secondsLeft, setSecondsLeft] = useState(seconds);

  useEffect(() => {
    if (!isRunning || secondsLeft === 0) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setSecondsLeft((previousSeconds) => previousSeconds - 1);
    }, 1000);

    
    // si algo cambia -- se cancela el tic pend -- ver
    return () => clearTimeout(timeoutId);
  }, [isRunning, secondsLeft]);

  const reset = () => setSecondsLeft(seconds);

  return { secondsLeft, reset };
};

export default useCountdown;