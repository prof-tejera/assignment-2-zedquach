import { useEffect, useState } from "react";
import TimeSelector from "../components/input/TimeSelector";
import { useWorkoutContext } from "../context/WorkoutProvider";
import styles from "./AddTimer.module.css";

const AddTimer = () => {
  const { addTimer } = useWorkoutContext();
  const [name, setName] = useState("");
  const [rounds, setRounds] = useState("");
  const [timerType, setTimerType] = useState("stopwatch");
  const [numTarget, setNumTarget] = useState(1);
  const [targetTime, setTargetTime] = useState([0, 0, 0, 0, 0]);
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleAdd = () => {
    // Get raw value instead of state
    const targets = targetTime.slice(0, numTarget);
    if (targets.includes(0)) {
      setMessage({
        message: "Some of the target is 0. Please set all the target!",
        type: "error",
      });
      return;
    }

    if (name.length === 0) {
      setMessage({ message: "Please enter excercise's name!", type: "error" });
      return;
    }

    addTimer(
      JSON.parse(
        JSON.stringify({
          name,
          type: timerType,
          targets: targetTime.slice(0, numTarget),
          offset: timerType === "stopwatch" ? 10 : -10,
          rounds: parseInt(rounds) || 1,
        })
      )
    );

    setMessage({ message: "Timer added!", type: "confirm" });
  };

  useEffect(() => {
    if (timerType !== "tabata") {
      setNumTarget(1);
    }
  }, [timerType]);

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

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleRoundChange = (e) => {
    setRounds(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper}>
        <div>{message.message}</div>
        <select id="timerType" onChange={handleChangeType}>
          <option value="stopwatch">Stop Watch</option>
          <option value="countdown">Count down</option>
          <option value="xy">XY</option>
          <option value="tabata">TABATA</option>
        </select>

        {timerType === "tabata" && (
          <div>
            <label for="numTarget">Numer of target</label>
            <select id="numTarget" onChange={handleChangeNumTarget}>
              {[...Array(5).keys()].map((num) => (
                <option value={num + 1} key={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        )}

        <input
          placeholder="Excercise's name"
          value={name}
          onChange={handleChangeName}
        />
        {["xy", "tabata"].includes(timerType) && (
          <input
            placeholder="Number of rounds"
            value={rounds}
            onChange={handleRoundChange}
          />
        )}

        <button onClick={handleAdd}>Add Timer</button>
      </div>

      <div className={styles.timeWrapper}>
        {[...Array(numTarget).keys()].map((index) => (
          <TimeSelector
            setTime={(time) => handleSetTarget(index, time)}
            label={`Target Time #${index + 1}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default AddTimer;
