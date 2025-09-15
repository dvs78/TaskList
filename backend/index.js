import "dotenv/config"; // carrega o .env
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./connect.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://tasklist-o2yv.onrender.com"],
    credentials: true,
  })
);

app.use(express.json());

// 1) ROTAS DE API PRIMEIRO
app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

// Get - Login
app.get("/api/login", async (_req, res) => {
  try {
    // atenção ao nome da tabela com aspas
    const { rows } = await pool.query(
      'SELECT id, nome, senha FROM "login" ORDER BY id'
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro /api/login:", error);
    res.status(500).json({ error: String(error) });
  }
});

// Todas as tarefas
app.get("/api/task", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT id, usuario_id, tarefa FROM "tarefa" ORDER BY tarefa'
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

// Tarefas de um usuário específico
app.get("/api/task/user/:usuarioId", async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const { rows } = await pool.query(
      'SELECT id, usuario_id, tarefa FROM "tarefa" WHERE usuario_id = $1 ORDER BY tarefa',
      [usuarioId]
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.post("/api/task", async (req, res) => {
  try {
    const { usuario_id, tarefa } = req.body;
    if (!usuario_id || !tarefa?.trim())
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: usuario_id e tarefa" });

    // existe usuário?
    const u = await pool.query('SELECT 1 FROM "login" WHERE id = $1 LIMIT 1', [
      usuario_id,
    ]);
    if (u.rowCount === 0)
      return res.status(400).json({ error: "usuario_id inexistente" });

    // evita duplicata por usuário (case-insensitive)
    const dup = await pool.query(
      'SELECT 1 FROM "tarefa" WHERE usuario_id = $1 AND LOWER(tarefa) = LOWER($2) LIMIT 1',
      [usuario_id, tarefa]
    );
    if (dup.rowCount)
      return res
        .status(409)
        .json({ error: "Tarefa já existe para esse usuário" });

    const { rows } = await pool.query(
      'INSERT INTO "tarefa"(usuario_id, tarefa) VALUES ($1, $2) RETURNING id, usuario_id, tarefa',
      [usuario_id, tarefa.trim()]
    );
    res.status(201).json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.put("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { tarefa } = req.body;

    if (!tarefa?.trim())
      return res.status(400).json({ error: "Campo obrigatório: tarefa" });

    // pega usuario_id da tarefa para validar duplicata
    const cur = await pool.query(
      'SELECT usuario_id FROM "tarefa" WHERE id = $1',
      [id]
    );
    if (cur.rowCount === 0)
      return res.status(404).json({ error: "Tarefa não encontrada" });

    const usuario_id = cur.rows[0].usuario_id;

    // duplicata para o mesmo usuário (exceto a própria)
    const dup = await pool.query(
      'SELECT 1 FROM "tarefa" WHERE usuario_id = $1 AND LOWER(tarefa) = LOWER($2) AND id <> $3 LIMIT 1',
      [usuario_id, tarefa, id]
    );
    if (dup.rowCount)
      return res
        .status(409)
        .json({ error: "Já existe tarefa igual para esse usuário" });

    const { rows } = await pool.query(
      'UPDATE "tarefa" SET tarefa = $1 WHERE id = $2 RETURNING id, usuario_id, tarefa',
      [tarefa.trim(), id]
    );
    res.json(rows[0]);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

app.delete("/api/task/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      'DELETE FROM "tarefa" WHERE id = $1',
      [id]
    );
    if (!rowCount)
      return res.status(404).json({ error: "Tarefa não encontrada" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: String(e) });
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
