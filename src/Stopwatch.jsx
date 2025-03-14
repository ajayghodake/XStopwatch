import React, { useState, useRef } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  //to store the time when the stopwatch is started
  const watchTime = useRef(0);
  //to store the interval reference
  const intervalRef = useRef(null);

  const Start = () => {
    if (isRunning) {
      return;
    }
    setIsRunning(true);
    watchTime.current = new Date().getTime() - time;
    intervalRef.current = setInterval(() => {
      setTime(new Date().getTime() - watchTime.current);
    }, 10);
  };

  const Stop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const Reset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };

  const formateTime = () => {
    // 1 = 1000 ms => 1234  1234 % 1000 = 234 / 10 = 23.4
    // 1 = 1234s => 1234 / 60 = 20.5666
    // const ms = Math.floor((time % 1000) / 10)
    //   .toString()
    //   .padStart(2, "0"); // Milliseconds
    const s = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, "0"); // Seconds
    const m = Math.floor((time / (1000 * 60)) % 60); // Minutes
    // const h = Math.floor(time / (1000 * 60 * 60)); // Hours
    return `${m}:${s}`;
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <p>Time: {formateTime()}</p>
      <div className="controls">
        <button onClick={() => {isRunning ? Stop() : Start()}}>{isRunning ? "Stop" : "Start"}</button>
        {/* <button onClick={Stop}>Stop</button> */}
        <button onClick={Reset}>Reset</button>
      </div>
    </>
  );
};

export default Stopwatch;
