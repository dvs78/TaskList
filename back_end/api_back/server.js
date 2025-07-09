// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import rotaLogin from "../crud/rotas/rotaLogin.js";
// import rotaTask from "../crud/rotas/rotaTask.js";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// // console.log("__dirname", __dirname);

// const app = express();
// app.use(cors());
// app.use(express.json());
// const PORT = 3000;

// // Rotas
// app.use("/api/login", rotaLogin);
// app.use("/api/tarefas", rotaTask);

// app.use(express.static(path.join(__dirname, "../../front_end/dist")));
// app.get("*any", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../front_end/dist/index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Servidor está escutando na porta ${PORT}`);
// });

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
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Rotas de API
app.use("/api/login", rotaLogin);
app.use("/api/tarefas", rotaTask);

// Servir arquivos do frontend
app.use(express.static(path.join(__dirname, "../../front_end/dist")));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../front_end/dist/index.html"));
});

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../front_end/dist/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
