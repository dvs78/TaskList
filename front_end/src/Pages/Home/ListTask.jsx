import React, { useState, useEffect } from "react";
import { insertTask } from "../../../api_front/tarefas";
// import { deleteByIdTask, updateTask } from "../../../apiFrontEnd/tarefas";
// import { getTask } from "../../../api_front/tarefas";
import { notificar } from "../../components_temp/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faTrash,
  faPencil,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// import ModalConfirmacao from "../../components/Confirmacao";

const ListTask = ({ user, tasklist, setTasklist }) => {
  const [newTask, setNewTask] = useState("");

  const addNewTask = async () => {
    const nova = newTask.trim().toLowerCase();
    const jaExiste = tasklist.some(
      (t) => t.tarefa.trim().toLowerCase() === nova
    );

    if (jaExiste) {
      notificar("erro", "Tarefa já cadastrada!");
      return;
    }
    if (!newTask.trim()) return;

    try {
      const createTask = await insertTask({
        usuario_id: user.id, // 👈 Garantido como número
        tarefa: newTask,
      });

      setTasklist([...tasklist, createTask]);
      setNewTask("");
      notificar("sucesso", "Tarefa adicionada com sucesso!");
    } catch (error) {
      notificar("erro", "Erro ao adicionar tarefa.");
    }
  };

  // const [tasklist, setTasklist] = useState([]);
  // console.log("Usuário logado:", user.nome);

  // Placeholder para edição
  const iniciarEdicao = (task) => {
    console.log("Editar tarefa:", task);
  };

  // Placeholder para remoção
  const pedirConfirmacao = (task) => {
    console.log("Pedir confirmação para remover:", task);
  };

  // useEffect(() => {
  //   const loadTask = async () => {
  //     const tasks = await getTask();
  //     const userTasks = tasks.filter((f) => f.usuario_id === user.id);

  //     setTasklist(userTasks);
  //   };

  //   loadTask();
  // }, []);

  return (
    <>
      <div className="task__add">
        {/* <h1>{user?.nome ? `Olá, ${user.nome}` : "Usuário"}</h1> */}
        <input
          className="input__new-task"
          type="text"
          name="input__new-task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Digite a nova tarefa"
        />
        <button className="btn__add" onClick={addNewTask}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <div className="task__list">
        {tasklist.map((t, i) => (
          <div className="task__list-item" key={`task-${i}`}>
            <p>{t.tarefa}</p>
            <div className="btn__task">
              <button className="btn__edit" onClick={() => iniciarEdicao(task)}>
                <FontAwesomeIcon icon={faPencil} />
              </button>
              <button
                className="btn__remove"
                onClick={() => pedirConfirmacao(task)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ListTask;
