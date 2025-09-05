import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { useState } from "react";

const Home = () => {
  const location = useLocation();
  const usuario = location.state?.usuario || null;
  const usuarioFinal = usuario || usuarioPersistido;

  const [reload, setReload] = useState(0);
  const handleCreated = () => setReload((n) => n + 1);

  return (
    <div className="main">
      <Header userName={usuarioFinal?.nome ?? "Usuário"} />
      <AddTask userId={usuarioFinal.id} onCreated={handleCreated} />
      <TaskList userId={usuarioFinal.id} reload={reload} />
    </div>
  );
};

export default Home;
