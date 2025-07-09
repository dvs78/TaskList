import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

// Buscar todos os usuários
export async function getLogin() {
  try {
    const resposta = await axios.get(`${BASE_URL}/login`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar logins:", erro.message);
    return [];
  }
}
