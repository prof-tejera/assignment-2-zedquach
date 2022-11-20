import { useWorkoutContext } from "../../context/WorkoutProvider";
import RoutineDetail from "./RoutineDetail";
import styles from "./RoutineList.module.css";

const RoutineList = () => {
  const { timers } = useWorkoutContext();

  return (
    <div className={styles.wrapper}>
      {timers.map((timer, index) => (
        <RoutineDetail {...timer} index={index} key={index} />
      ))}
    </div>
  );
};

export default RoutineList;
