import axios from "axios";

const BASE_URL = "https://tasklist-g5wi.onrender.com";

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
