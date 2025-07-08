import "dotenv/config";
import express from "express";
import cors from "cors";
import DbClass from "../crud/dbOnLine/DbClass.js";
import rotaLogin from "../crud/rotas/rotaLogin.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

// CRIAR A ROTA GET QUE IRÁ COMUNICAR O DB COM SERVIDOR
// app.get("/", async (req, res) => {
//   const result = await new DbClass().getAll("tarefas");
//   res.status(200).send(result);
// });

app.use("/api/login", rotaLogin);

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
