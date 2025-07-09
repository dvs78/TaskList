import "dotenv/config";
import express from "express";
import cors from "cors";
import rotaLogin from "../crud/rotas/rotaLogin.js";
import rotaTask from "../crud/rotas/rotaTask.js";

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

app.use("/api/login", rotaLogin);

app.use("/api/tarefas", rotaTask);

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
