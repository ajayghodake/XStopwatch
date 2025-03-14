import React, { useState, useRef } from "react";

const StopWatch1 = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const watchTime = useRef(0);

  const [laps, setLaps] = useState([]);

  const start = () => {
    if (isRunning) {
      return;
    }
    setIsRunning(true);
    watchTime.current = new Date().getTime() - time; // new Time - saved time
    intervalRef.current = setInterval(() => {
      setTime(new Date().getTime() - watchTime.current);
    }, 10);
  };

  const stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    watchTime.current = 0;
    setTime(0);
    setLaps([]);
  };

  // Lap Funtionality
  const lap = () => {
    if (!isRunning) return;
    setLaps((prevLap) => [...prevLap, formatTime()]);
    console.log(laps);
  };

  const formatTime = () => {
    const ms = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const s = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const m = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, "0");
    // const h = Math.floor(time / (1000 * 60 * 600)).toString().padStart(2, "0");
    return `${m}:${s}:${ms}`;
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <h2>{formatTime()}</h2>
      <div className="controls">
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <button onClick={lap}>Lap</button>

        <div className="lapsData">
          <h2>Laps</h2>
          <ul>
            {laps.map((item, index) => (
                <li key={index}>Lap {index+1}: {item}</li>
            ))}
          </ul>
        </div>

      </div>
    </>
  );
};

export default StopWatch1;

/* Milliseconds = ((1234 / 1000) % 10) =  */
