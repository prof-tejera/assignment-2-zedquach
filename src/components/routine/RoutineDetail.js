const RoutineDetail = ({ name, timerType, targetTime }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{timerType}</div>
      <div>
        {targetTime.map((target, index) => (
          <div key={index}>{target}</div>
        ))}
      </div>
    </div>
  );
};

export default RoutineDetail;
