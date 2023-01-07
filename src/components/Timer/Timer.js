import React, { useState, useRef, useEffect } from "react";

const Timer = ({ endtime = 0 }) => {
  const [timeLeft, setTimeLeft] = useState(endtime - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endtime - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>{new Date(timeLeft).toISOString().substring(11, 19)}</div>;
};

export default Timer;
