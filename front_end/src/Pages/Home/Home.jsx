import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
// import AddTask from "./AddTask";
import ListTask from "./ListTask";
import { getTask } from "../../../api_front/tarefas.js";
import { notificar } from "../../components/Toast";
// import BoasVindas from "../../Components/BoasVindas";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [tasklist, setTasklist] = useState([]);

  // Carregar login do usuário
  useEffect(() => {
    if (!user) {
      notificar("erro", "Usuário não está logado");
      navigate("/"); // redireciona automaticamente
    } else {
      setUserName(user.nome);
    }
  }, [user, navigate]);

  // Carregar tarefas do usuário
  useEffect(() => {
    const loadTask = async () => {
      const tasks = await getTask();
      const userTasks = tasks.filter((f) => f.usuario_id === user.id);
      setTasklist(userTasks);
    };
    loadTask();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/");
  // };

  return (
    <>
      <Header user={user} />

      <div className="main">
        {/* <AddTask user={user} /> */}
        <ListTask user={user} tasklist={tasklist} setTasklist={setTasklist} />
        {/* <h1>Bem-vindo{userName && `, ${userName}`}!</h1>
      <p>Você está autenticado no sistema.</p> */}
        {/* <button className="btn__logout" onClick={handleLogout}>
        Sair
      </button> */}
      </div>
    </>
  );
};

export default Home;
