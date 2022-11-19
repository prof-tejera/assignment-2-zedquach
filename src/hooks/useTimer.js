import { useState, useEffect, useRef } from "react";
import { useWorkoutContext } from "../context/WorkoutProvider";

const useTimer = () => {
  const { currentTimer, nextTimer, isRunning, reset } = useWorkoutContext();
  const [currentTime, setCurrentTime] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentTarget, setCurentTarget] = useState(0);

  const timer = useRef();

  const root = document.querySelector(":root");

  const runTimer = () => {
    timer.currentTimer = setInterval(() => {
      setCurrentTime((currentTime) => currentTime + currentTimer.offset);
    }, 10);
  };

  const pauseTimer = () => {
    clearInterval(timer.currentTimer);
  };

  const resetTimer = () => {
    pauseTimer();
    reset();
    setCurrentRound(1);
    setCurentTarget(0);
    setCurrentTime(currentTimer.offset < 0 ? currentTimer.targets[0] : 0);
  };

  // Start from beginning of timer
  useEffect(() => {
    setCurrentRound(1);
    if (isRunning) {
      // Update interval to use new timer's offset
      pauseTimer();
      runTimer();
    }
  }, [currentTimer]);

  useEffect(() => {
    if (isRunning) {
      runTimer();
    } else {
      pauseTimer();
    }
  }, [isRunning]);

  // Move to next target when time reach the end
  useEffect(() => {
    if (
      currentTimer &&
      currentTime ===
        (currentTimer.offset < 0 ? 0 : currentTimer.targets[currentTarget])
    ) {
      setCurentTarget((prev) => prev + 1);
    }
  }, [currentTime, currentTimer]);

  // Start a round from beginning
  useEffect(() => {
    if (currentTimer) {
      if (currentRound <= currentTimer.rounds) {
        setCurentTarget(0);
        let width = (360 - currentTimer.rounds * 5) / currentTimer.rounds;
        let roundProgress = "";
        for (let i = 1; i <= currentRound; i++) {
          let start = (360 / currentTimer.rounds) * (i - 1);
          roundProgress += `white ${start}deg, white ${
            start + width
          }deg, #0a0240 ${start + width}deg, #0a0240 ${start + width + 5}deg,`;
        }
        root.style.setProperty("--round-progress", roundProgress.slice(0, -1));
      } else {
        nextTimer();
      }
    }
  }, [currentRound, currentTimer]);

  // Start a target from beginning
  useEffect(() => {
    if (currentTimer) {
      if (currentTarget < currentTimer.targets.length) {
        setCurrentTime(
          currentTimer.offset < 0 ? currentTimer.targets[currentTarget] : 0
        );
      } else {
        setCurrentRound((prev) => prev + 1);
      }
    }
  }, [currentTarget, currentTimer]);

  useEffect(() => {
    return () => clearInterval(timer.currentTimer);
  }, []);

  useEffect(() => {
    if (currentTimer) {
      root.style.setProperty(
        "--progress-deg",
        `${(currentTime / currentTimer.targets[currentTarget]) * 360 || 0}deg`
      );
    }
  }, [currentTime]);

  return [
    { currentTime, isRunning },
    {
      runTimer,
      pauseTimer,
      resetTimer,
    },
  ];
};

export default useTimer;
