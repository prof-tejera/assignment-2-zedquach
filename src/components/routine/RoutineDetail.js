import { useEffect, useRef } from "react";
import { useWorkoutContext } from "../../context/WorkoutProvider";
import styles from "./RoutineDetail.module.css";

const RoutineDetail = ({ name, type, targets, index, rounds }) => {
  const { currentIndex, removeTimer } = useWorkoutContext();
  const detailRef = useRef();

  useEffect(() => {
    if (currentIndex && currentIndex === index) {
      detailRef.current.scrollIntoView();
    }
  }, [currentIndex]);

  return (
    <div
      className={styles.wrapper}
      style={{ borderColor: index === currentIndex ? "red" : "white" }}
      ref={detailRef}
    >
      <div className={styles.title}>
        <div>{name.toUpperCase()}</div>
        <div>{type.toUpperCase()}</div>
        <div>Rounds: {rounds}</div>
      </div>
      <div>
        {targets.map((target, index) => (
          <div key={index}>{`${target / 1000}s`}</div>
        ))}
      </div>
      <div className={styles.closeBtn} onClick={() => removeTimer(index)}>
        X
      </div>
    </div>
  );
};

export default RoutineDetail;
