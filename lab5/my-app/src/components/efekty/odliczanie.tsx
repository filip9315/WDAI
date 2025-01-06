import React, { useState, useEffect } from "react";

export default function Odliczanie() {
  const [licznik, setLicznik] = useState(15);
  const [isRunning, setIsRunning] = useState(false);
  const [buttonText, setButtonText] = useState("START");

  useEffect(() => {

    if (isRunning && licznik > 0) {
      const interval = setInterval(() => {
        setLicznik(prevLicznik => Math.max(prevLicznik - 0.1, 0));
      }, 100);

      return () => clearInterval(interval);
    } else if (licznik <= 0) {
      setButtonText("Odliczanie zakończone");
    }
  }, [isRunning, licznik]);

  const handleButtonClick = () => {
    if (licznik == 0) return;

    if (isRunning) {
      setIsRunning(false);
      setButtonText("START");
    } else {
      setIsRunning(true);
      setButtonText("STOP");
    }
  };

  return (
    <div>
      <div>{licznik.toFixed(1)} s</div>
      <button onClick={handleButtonClick} disabled={licznik == 0}>
        {buttonText}
      </button>
    </div>
  );
}
