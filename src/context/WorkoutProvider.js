import { createContext, useContext, useState } from "react";

const WorkoutContext = createContext();

const WorkoutProvider = ({ children }) => {
  let [timers, setTimers] = useState([]);

  const addTimer = (newTimer) => setTimers((prev) => [...prev, newTimer]);

  return (
    <WorkoutContext.Provider value={{ timers, addTimer }}>
      {children}
    </WorkoutContext.Provider>
  );
};

const useWorkoutContext = () => useContext(WorkoutContext);

export { WorkoutProvider, useWorkoutContext };
