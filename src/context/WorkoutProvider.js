import { createContext, useContext, useState } from "react";

const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const addTimer = (newTimer) => setTimers((prev) => [...prev, newTimer]);

  const removeTimer = (index) => {
    setTimers((prev) => {
      let newTimers = [...prev];
      newTimers.splice(index, 1);
      return newTimers;
    });
  };

  const nextTimer = () => {
    if (currentIndex < timers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsRunning(false);
      setIsDone(true);
    }
  };

  const reset = () => {
    setIsDone(false);
    setIsRunning(false);
    setCurrentIndex(0);
  };

  return (
    <WorkoutContext.Provider
      value={{
        timers,
        currentIndex,
        currentTimer: timers[currentIndex],
        addTimer,
        removeTimer,
        nextTimer,
        isRunning,
        setIsRunning,
        isDone,
        setIsDone,
        reset,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkoutContext = () => useContext(WorkoutContext);

export { WorkoutProvider, useWorkoutContext };
