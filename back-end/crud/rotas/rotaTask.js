import { Router } from "express";
import DbClassTask from "../dbOnline/DbClassTask.js";

const rotas = Router();

// Get
rotas.get("/", async (req, res) => {
  try {
    const result = await new DbClassTask().getAll();
    res.status(200).send(result);
  } catch (erro) {
    console.error("Erro na rota GET /tarefa:", erro.message);
    res.status(500).send({ erro: "Erro ao buscar tarefa" });
  }
});

// Delete
rotas.delete("/:id", async (req, res) => {
  const { id } = req.params;

  await new DbClassTask().deleteById(id);
  res
    .status(200)
    .send({ message: "Produção de mudas excluída com sucesso!!!" });
});

// Post
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

// Put
rotas.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const db = new DbClassTask();
    const updated = await db.updateById(id, body); // já passa o objeto inteiro

    if (!updated) {
      return res.status(404).send({ message: "Tarefa não encontrada!" });
    }

    res.status(200).send({
      message: "Tarefa atualizada com sucesso!!!",
      tarefa: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Erro ao atualizar tarefa." });
  }
});

export default rotas;
