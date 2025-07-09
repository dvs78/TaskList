// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
// // import { insertTask } from "../../../apiFrontEnd/tarefas";
// import { notificar } from "../../components/Toast";
// import { getTask } from "../../../api_front/tarefas";

// const AddTask = ({ user }) => {
//   const [newTask, setNewTask] = useState("");

//   const addNewTask = async () => {
//     const nova = newTask.trim().toLowerCase();
//     const jaExiste = tasklist.some(
//       (t) => t.tarefa.trim().toLowerCase() === nova
//     );

//     if (jaExiste) {
//       notificar("erro", "Tarefa já cadastrada!");
//       return;
//     }
//     if (!newTask.trim()) return;

//     try {
//       const createTask = await insertTask({
//         usuario_id: user.id, // 👈 Garantido como número
//         tarefa: newTask,
//       });

//       setTasklist([...tasklist, createTask]);
//       setNewTask("");
//       notificar("sucesso", "Tarefa adicionada com sucesso!");
//     } catch (error) {
//       notificar("erro", "Erro ao adicionar tarefa.");
//     }
//   };

//   return (
//     <></>
//     // <div className="task__add">
//     //   {/* <h1>{user?.nome ? `Olá, ${user.nome}` : "Usuário"}</h1> */}
//     //   <input
//     //     className="input__new-task"
//     //     type="text"
//     //     name="input__new-task"
//     //     // value={newTask}
//     //     // onChange={(e) => setNewTask(e.target.value)}
//     //     placeholder="Digite a nova tarefa"
//     //   />
//     //   <button className="btn__add" onClick={addNewTask}>
//     //     <FontAwesomeIcon icon={faPlus} />
//     //   </button>
//     // </div>
//   );
// };

// export default AddTask;
