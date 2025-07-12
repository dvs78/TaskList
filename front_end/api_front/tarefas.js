import axios from "axios";

// const BASE_URL = "https://tasklist-g5wi.onrender.com";
// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000";

export async function getTask() {
  try {
    const resposta = await axios.get(`${BASE_URL}/api/tarefas`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar tarefas:", erro.message);
    return [];
  }
}

export async function insertTask(object) {
  try {
    const usuario = JSON.parse(localStorage.getItem("user"));
    console.log("usuario:", usuario);
    const newTask = {
      usuario_id: usuario.id,
      tarefa: object.tarefa,
    };

    const response = await axios.post(`${BASE_URL}/api/tarefas`, newTask);
    return response.data;
  } catch (error) {
    const msg =
      error.response?.data?.erro || error.message || "Erro desconhecido";
    console.error("Erro ao inserir tarefa:", msg);
    throw new Error(msg);
  }
}
