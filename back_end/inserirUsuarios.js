// import pool from "./api_back/connect.js";

// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" }); // ou "../.env" se estiver em outra pasta

// const inserirUsuarios = async () => {
//   try {
//     const query = `
//       INSERT INTO login (senha, nome, email) VALUES
//       ('0000', 'Daniel', 'dvs.veiga78@gmail.com'),
//       ('0001', 'Tais', 'tr.abreuveiga@gmail.com')
//     `;
//     await pool.query(query);
//     console.log("Usuários inseridos com sucesso!");
//   } catch (err) {
//     console.error("Erro ao inserir usuários:", err.message);
//   } finally {
//     pool.end(); // fecha a conexão
//   }
// };

// inserirUsuarios();
