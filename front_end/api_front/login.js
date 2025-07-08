// src/api/loginApi.js
import axios from "axios";

const API_URL = "http://localhost:3000/api/login";

// Buscar todos os usuários
export async function buscarLogins() {
  try {
    const resposta = await axios.get(API_URL);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar logins:", erro.message);
    return [];
  }
}

// // Buscar usuário por senha (exemplo)
// export async function buscarPorSenha(senha) {
//   try {
//     const resposta = await axios.get(API_URL, {
//       params: { params: senha },
//     });
//     return resposta.data;
//   } catch (erro) {
//     console.error("Erro ao buscar por senha:", erro.message);
//     return null;
//   }
// }

// // Criar novo usuário (exemplo POST)
// export async function cadastrarUsuario(dados) {
//   try {
//     const resposta = await axios.post(API_URL, dados);
//     return resposta.data;
//   } catch (erro) {
//     console.error("Erro ao cadastrar:", erro.message);
//     throw erro;
//   }
// }
