import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Olá, mundo, estou aqui!");
});

app.post("/", (req, res) => {
  res.send("Informação nova criada com sucesso!");
});

app.listen(3000, () => {
  console.log("Meu servidor está rodando na porta https://localhost:3000");
});
