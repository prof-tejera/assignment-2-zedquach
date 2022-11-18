import { useWorkoutContext } from "../../context/WorkoutProvider";
import RoutineDetail from "./RoutineDetail";

const RoutineList = () => {
  const { timers } = useWorkoutContext();

  return (
    <div>
      {timers.map((timer, index) => (
        <RoutineDetail {...timer} key={index} />
      ))}
    </div>
  );
};

export default RoutineList;
