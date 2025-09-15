// export default pool;
import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const isProd = process.env.NODE_ENV === "production";
const connStr =
  process.env.DATABASE_URL_INTERNAL || process.env.DATABASE_URL_EXTERNAL;

let pool;

if (isProd && connStr) {
  // Render / produção
  pool = new Pool({
    connectionString: connStr,
    ssl: { rejectUnauthorized: false },
  });
} else {
  // Local (igual ao que você usa no pgAdmin)
  pool = new Pool({
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT) || 5432,
    user: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "",
    database: process.env.PGDATABASE || "TaskList",
    ssl: false,
  });
}

export default pool;

// Inserir um novo usuário
// scripts/seedLogin.js
// import pool from "../connect.js";

// async function main() {
//   const nome = "Serginho";
//   const senha = "0003";

//   try {
//     const sql = `
//       INSERT INTO public.login (nome, senha)
//       VALUES ($1, $2)
//       ON CONFLICT (nome)
//       DO UPDATE SET senha = EXCLUDED.senha
//       RETURNING id, nome;
//     `;
//     const { rows } = await pool.query(sql, [nome, senha]);
//     console.log("[seedLogin] Usuário inserido/atualizado ->", rows[0]);
//   } catch (err) {
//     console.error("[seedLogin] ERRO:", err.message);
//     process.exit(1);
//   } finally {
//     pool.end(); // encerra conexões
//   }
// }

// main();
