import { Router } from "express";
import DbClassTask from "../dbOnline/DbClassTask.js";

const rotas = Router();

// GET
rotas.get("/", async (req, res) => {
  try {
    const result = await new DbClassTask().getAll();
    res.status(200).send(result);
  } catch (erro) {
    console.error("Erro na rota GET /tarefa:", erro.message);
    res.status(500).send({ erro: "Erro ao buscar tarefa" });
  }
});

// POST
rotas.post("/", async (req, res) => {
  const { usuario_id, tarefa } = req.body;

  if (!usuario_id || !tarefa) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: usuario_id e tarefa" });
  }

  try {
    const newTask = await new DbClassTask().insert({
      usuario_id,
      tarefa,
    });
    res.status(200).json(newTask);
  } catch (error) {
    console.error("Erro na rota POST /:", error.message);
    res.status(500).json({ erro: "Erro ao inserir tarefa" });
  }
});

export default rotas;
