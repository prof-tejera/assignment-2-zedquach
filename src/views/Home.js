import RoutineList from "../components/routine/RoutineList";
import Clock from "../components/display/Clock";

const Home = () => {
  return (
    <>
      <div>
        <RoutineList />
      </div>
      <div>
        <Clock time={0} />
      </div>
    </>
  );
};

export default Home;
