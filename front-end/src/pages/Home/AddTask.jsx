// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import axios from "axios";
// import { notificar } from "./Toast.jsx"; // ⬅️ importa a função

// const AddTask = ({ userId, onCreated }) => {
//   const [newTask, setNewTask] = useState("");
//   const [sending, setSending] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const tarefa = newTask.trim();
//     if (!tarefa) {
//       notificar("alerta", "Digite a tarefa antes de adicionar.");
//       return;
//     }

//     try {
//       setSending(true);
//       await axios.post("/api/task", { usuario_id: userId, tarefa });
//       setNewTask(""); // limpa o input
//       onCreated?.(); // avisa o pai para recarregar
//     } catch (err) {
//       alert(err.response?.data?.message || "Erro ao criar tarefa.");
//       console.error(err);
//     } finally {
//       setSending(false);
//     }
//   }

//   return (
//     <form className="task__add" onSubmit={handleSubmit}>
//       <input
//         className="input__new-task"
//         type="text"
//         value={newTask}
//         onChange={(e) => setNewTask(e.target.value)}
//         placeholder="Digite a nova tarefa"
//       />
//       <button
//         type="submit"
//         className="btn__add"
//         disabled={sending || !newTask.trim()}
//         title="Adicionar"
//       >
//         <FontAwesomeIcon icon={faPlus} className="btn__add--Aumentar" />
//       </button>
//     </form>
//   );
// };

// export default AddTask;
// src/components/AddTask.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { notificar } from "../../components/Toast.jsx";

const AddTask = ({ userId, onCreated }) => {
  const [newTask, setNewTask] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const tarefa = newTask.trim();
    if (!tarefa) {
      notificar("alerta", "Digite a tarefa antes de adicionar.");
      return;
    }

    try {
      setSending(true);

      const { data } = await axios.post("/api/task", {
        usuario_id: userId,
        tarefa,
      });

      // limpa e avisa o pai (se precisar atualizar a lista)
      setNewTask("");
      onCreated?.(data);

      // ✅ toast de sucesso
      notificar("sucesso", "Tarefa adicionada com sucesso!");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Erro ao criar a tarefa.";
      // ❌ toast de erro
      notificar("erro", msg);
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="task__add" onSubmit={handleSubmit}>
      <input
        className="input__new-task"
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Digite a nova tarefa"
      />
      <button
        type="submit"
        className="btn__add"
        disabled={sending || !newTask.trim()}
        title="Adicionar"
      >
        <FontAwesomeIcon icon={faPlus} className="btn__add--Aumentar" />
      </button>
    </form>
  );
};

export default AddTask;
