import express from "express";

import rotaLogin from "./crud/rotas/rotaLogin.js";
import rotaTask from "./crud/rotas/rotaTask.js";

const app = express();
app.use(express.json());

// REQUISIÇÕES
app.use("/api/login", rotaLogin);
app.use("/api/task", rotaTask);

// SERVIDOR ESCUTAR
const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Meu servidor está rodando na porta ${PORTA}`);
});
