import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(120);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(0);

  const startCounter = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds <= 1) {
            clearInterval(timer);
            setIsRunning(false); 
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    setMinutes(Math.floor(seconds / 60));
  }, [seconds]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        {String(minutes).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}
        </h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={startCounter}
        disabled={isRunning}
      >
        Start
      </button>
    </div>
  );
};

export default Timer;