// import express from "express";
// import cors from "cors";
// import pool from "./connect.js";

// import { fileURLToPath } from "url";
// import path, { dirname } from "path";

// const __fileName = fileURLToPath(import.meta.url);
// const __dirname = dirname(__fileName);
// const caminhoDist = path.join(__dirname, "../frontend/dist");
// console.log(caminhoDist);

// // Colocar todas as funções do express na variável app
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.static(caminhoDist));

// // Criando requisição get = endpoint com barra
// app.get("/api", async (req, res) => {
//   try {
//     const resultado = (await pool.query("SELECT * FROM login")).rows;
//     res.send(resultado);
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error.message);
//     throw error;
//   }
// });

// app.get("/api/health", (req, res) => res.json({ ok: true }));

// // async insert(tabela, dados) {
// //   try {
// //     const colunas = Object.keys(dados);
// //     const valores = Object.values(dados);

// //     const placeholders = colunas.map((_, i) => `$${i + 1}`).join(", ");
// //     const colunasFormatadas = colunas.map((col) => `"${col}"`).join(", ");

// //     const query = `INSERT INTO "${tabela}" (${colunasFormatadas}) VALUES (${placeholders}) RETURNING *`;

// //     const result = await pool.query(query, valores);
// //     return result.rows[0]; // Retorna o registro inserido
// //   } catch (error) {
// //     console.error("Erro ao inserir tarefa:", error.message);
// //     throw error;
// //   }
// // }

// app.post("/", (req, res) => {
//   const { body } = req; // o body é uma chave do objeto req
//   const { nome, idade } = body;
//   // console.log(body); // vai aparecer no terminal
//   // console.log(nome, idade); // vai aparecer no terminal
//   res.json({ nome, idade }); // vai aparecer no reqbin
// });

// // Parâmetros da requisição
// app.post("/produto/:id", (req, res) => {
//   const { body } = req;
//   const { nome, idade } = body;

//   // const id = req.params.id;
//   const { id } = req.params;
//   // console.log(id);

//   res.json({ nome, idade });
// });

// // console.log((await pool.query("SELECT * FROM login")).rows);

// // app.get((req, res) => {
// //   res.sendFile(path.join(caminhoDist, "index.html"));
// // });
// app.get("*", (req, res) => {
//   res.sendFile(path.join(caminhoDist, "index.html"));
// });

// // app.get("*any", (req, res) => {
// //   res.sendFile(path.join(caminhoDist, "index.html"));
// // });

// // Colocar o app para rodar, ou seja, receber pedidos ou enviar respostas

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

// // app.listen(3000, () => {
// //   console.log("Meu servidor está rodando na porta http://localhost:3000");
// // });

import express from "express";
import cors from "cors";
import pool from "./connect.js";

import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

// 🚩 Corrija o nome da pasta
const caminhoDist = path.join(__dirname, "../frontend/dist");

const app = express();
app.use(cors());
app.use(express.json());

// 🚩 Sirva o front buildado
app.use(express.static(caminhoDist));

app.get("/api/", async (req, res) => {
  try {
    const resultado = (await pool.query("SELECT * FROM login")).rows;
    res.send(resultado);
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    throw error;
  }
});

// opcional: healthcheck
app.get("/api/health", (req, res) => res.json({ ok: true }));

// 🚩 Rota curinga do SPA
app.get("*any", (req, res) => {
  res.sendFile(path.join(caminhoDist, "index.html"));
});

// 🚩 PORT dinâmica
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
