import { Router } from "express";
import DbClassLogin from "../dbOnLine/DbClassLogin.js";

const rotas = Router();

// Buscar todos logins
rotas.get("/", async (req, res) => {
  try {
    const result = await new DbClassLogin().getAll();
    res.status(200).send(result);
  } catch (erro) {
    console.error("Erro na rota GET /login:", erro.message);
    res.status(500).send({ erro: "Erro ao buscar login" });
  }
});

export default rotas;
