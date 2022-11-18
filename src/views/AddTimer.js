import { useEffect, useState } from "react";
import TimeSelector from "../components/input/TimeSelector";
import { useWorkoutContext } from "../context/WorkoutProvider";

const AddTimer = () => {
  const { timers, addTimer } = useWorkoutContext();
  const [timerType, setTimerType] = useState("stopwatch");
  const [numTarget, setNumTarget] = useState(1);
  const [targetTime, setTargetTime] = useState([0, 0, 0, 0, 0]);

  const handleAdd = () => {
    console.log(timers);
    addTimer(
      JSON.parse(
        JSON.stringify({
          timerType,
          targetTime,
          countDown: timerType !== "stopwatch",
        })
      )
    );
  };

  const handleChangeType = (e) => {
    setTimerType(e.target.value);
  };

  const handleChangeNumTarget = (e) => {
    setNumTarget(parseInt(e.target.value));
  };

  const handleSetTarget = (index, time) => {
    setTargetTime((prev) => {
      prev[index] = time;
      return prev;
    });
  };

  return (
    <div>
      <div>
        <select id="timerType" onChange={handleChangeType}>
          <option value="stopwatch">Stop Watch</option>
          <option value="countdown">Count down</option>
          <option value="xy">XY</option>
          <option value="tabata">TABATA</option>
        </select>

        <select id="numTarget" onChange={handleChangeNumTarget}>
          {[...Array(5).keys()].map((num) => (
            <option value={num + 1} key={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>

        <button onClick={handleAdd}>Add Timer</button>
      </div>

      <div>
        {[...Array(numTarget).keys()].map((index) => (
          <TimeSelector
            setTime={(time) => handleSetTarget(index, time)}
            label={`Target Time #${index + 1}`}
            key={index}
          />
        ))}
      </div>

      {timers.map((e, i) => (
        <div key={i}>{JSON.stringify(e)}</div>
      ))}
    </div>
  );
};

export default AddTimer;
