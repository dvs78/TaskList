import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

const Home = () => {
  const location = useLocation();
  const usuario = location.state?.usuario || null;
  const usuarioFinal = usuario || usuarioPersistido;

  return (
    <div className="main">
      <Header userName={usuarioFinal?.nome ?? "Usuário"} />
      <AddTask usuario={usuarioFinal} />
      <TaskList userId={usuarioFinal.id} />
    </div>
  );
};

export default Home;
