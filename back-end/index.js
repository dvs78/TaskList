import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá, mundo, estou aqui agora!");
});

app.post("/", (req, res) => {
  const { body } = req; // o body é uma chave do objeto req
  const { nome, idade } = body;
  console.log(body); // vai aparecer no terminal
  console.log(nome, idade); // vai aparecer no terminal
  res.json({ nome, idade }); // vai aparecer no reqbin
});

app.listen(3000, () => {
  console.log("Meu servidor está rodando na porta https://localhost:3000");
});
