import axios from "axios";

const BASE_URL = "https://tasklist-g5wi.onrender.com";
// const BASE_URL =
//   import.meta.env.MODE === "production"
//     ? import.meta.env.VITE_API_URL
//     : "http://localhost:3000";
// const BASE_URL = "http://localhost:3000";

// Buscar todos os usuários
export async function getLogin() {
  try {
    const resposta = await axios.get(`${BASE_URL}/api/login`);
    console.log("Resposta do backend:", resposta.data);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar logins:", erro.message);
    return [];
  }
}
