import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const Home = () => {
  const location = useLocation();
  const usuario = location.state?.usuario || "Usuário"; // se não vier nada, mostra "Usuário"
  return (
    <div className="main">
      <Header nomeUsuario={usuario} />
      <AddTask />
      <TaskList />
    </div>
  );
};

export default Home;
