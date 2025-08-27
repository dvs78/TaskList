import Header from "../../components/Header";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const Home = () => {
  return (
    <div className="main">
      <Header />
      <AddTask />
      <TaskList />
    </div>
  );
};

export default Home;
