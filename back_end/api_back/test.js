import path, { dirname } from "path";

const __dirname = path.resolve(".");
console.log("Diretório atual:", __dirname);

// import pool from "../crud/dbOnline/db.js";

try {
  const res = await pool.query('SELECT * FROM "login"');
  console.log(res.rows);
} catch (err) {
  console.error("Erro ao conectar ao banco:", err.message);
}
