import RoutineList from "../components/routine/RoutineList";
import Clock from "../components/display/Clock";
import useTimer from "../hooks/useTimer";
import styles from "./Home.module.css";

import { useWorkoutContext } from "../context/WorkoutProvider";
import { useEffect } from "react";

const Home = () => {
  let [timer, setter] = useTimer();
  const { timers, isRunning, setIsRunning, isDone, nextTimer } =
    useWorkoutContext();

  const toggleRun = () => {
    setIsRunning((prev) => !prev);
  };

  useEffect(() => {
    console.log(timers);
  }, [timers]);

  return (
    <div className={styles.wrapper}>
      <RoutineList />
      {timers.length > 0 && (
        <div>
          Total Time:
          {` ${
            timers.reduce(
              (total, timer) =>
                total +
                timer.targets.reduce(
                  (timerTotal, time) => timerTotal + time,
                  0
                ),
              0
            ) / 1000
          }`}
          s
        </div>
      )}
      <div>
        <button onClick={toggleRun} disabled={timers.length === 0 || isDone}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={setter.resetTimer} disabled={timers.length === 0}>
          Reset
        </button>
        <button onClick={nextTimer} disabled={timers.length === 0}>
          Next
        </button>
      </div>
      <div>
        <Clock time={timer.currentTime} />
      </div>
    </div>
  );
};

export default Home;
