// API significa Application Programing interface
// POST, GET, PUT, DELETE
// CRUD - CREATE, READ, UPDATE e DELETE
// Endpoint

import express from "express";

const app = express();

const PORT = 3000;

app.get("/", async (req, res) => {
  res.send("Por enquanto  '/login'");
});

app.listen(PORT, () => {
  console.log(`Servidor está escutando na porta ${PORT}`);
});
