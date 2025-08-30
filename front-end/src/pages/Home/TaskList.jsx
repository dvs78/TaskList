import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";

const TaskList = () => {
  // Variável de estado
  const [tarefas, setTarefas] = useState([]);

  // Hook
  useEffect(() => {
    const requisicaoAxios = async () => {
      const { data } = await axios.get("http://localhost:3000/api/task");
      console.log(data);

      setTarefas(data);
    };
    requisicaoAxios();
  }, []);
  return (
    <div className="task__list">
      {tarefas.map((t, i) => (
        <div className="task__list-item" key={`task-${i}`}>
          <p>{t.tarefa}</p>
          <div className="btn__task">
            <button className="btn__edit">
              <FontAwesomeIcon icon={faPencil} />
            </button>
            <button className="btn__remove">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
