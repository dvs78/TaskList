import "dotenv/config";
import express from "express";
import cors from "cors";
import rotaLogin from "../crud/rotas/rotaLogin.js";
import rotaTask from "../crud/rotas/rotaTask.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

display("DAniel");
app.use(express.json());
app.use(cors());

// Rotas de API
app.use("/api/login", rotaLogin);
app.use("/api/tarefas", rotaTask);

// Servir arquivos do frontend
app.use(express.static(path.join(__dirname, "../../front_end/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../front_end/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
