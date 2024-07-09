import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(12);
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

  const addSeconds = () => {
    setSeconds(seconds + 10);
  };

  const subtractSeconds = () => {
    setSeconds(seconds - 10);
  };

  const stopCounter = () => {
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-3">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addSeconds}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={startCounter} disabled={isRunning}>
          Start
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={stopCounter} disabled={!isRunning}>
          Stop
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={subtractSeconds}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
          </svg>
        </button>
      </div>
      <h1 className="text-6xl font-bold">
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