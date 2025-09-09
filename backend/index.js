// import express from "express";
// import cors from "cors";
// import pool from "./connect.js";

// import { fileURLToPath } from "url";
// import path, { dirname } from "path";

// const __fileName = fileURLToPath(import.meta.url);
// const __dirname = dirname(__fileName);

// // 🚩 Corrija o nome da pasta
// const caminhoDist = path.join(__dirname, "../frontend/dist");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // 🚩 Sirva o front buildado
// app.use(express.static(caminhoDist));

// app.get("/api/login", async (req, res) => {
//   try {
//     const resultado = (await pool.query("SELECT * FROM login")).rows;
//     res.send(resultado);
//   } catch (error) {
//     console.error("Erro ao buscar dados:", error.message);
//     throw error;
//   }
// });

// // opcional: healthcheck
// app.get("/api/health", (req, res) => res.json({ ok: true }));

// // 🚩 Rota curinga do SPA
// app.get("*any", (req, res) => {
//   res.sendFile(path.join(caminhoDist, "index.html"));
// });

// // 🚩 PORT dinâmica
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

import "dotenv/config"; // carrega o .env
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./connect.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// 1) ROTAS DE API PRIMEIRO
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/login", async (_req, res) => {
  try {
    // atenção ao nome da tabela com aspas
    const { rows } = await pool.query(
      'SELECT id, nome, senha FROM "login" ORDER BY id'
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro /api/login:", err);
    res.status(500).json({ error: String(err) });
  }
});

// opcional: 404 explícito para /api
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found" });
});

// 2) SÓ DEPOIS: estáticos do front
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../frontend/dist");

app.use(express.static(distPath));

// 3) catch-all para rotas do React, só entra se NÃO começar com /api
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
