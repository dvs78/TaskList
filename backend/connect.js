// import pg from "pg";
// import "dotenv/config";

// // Acessar o BANCO DADOS
// const pool = new pg.Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// // console.log((await pool.query("SELECT * FROM login")).rows);

// export default pool;

import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;

const connStr =
  process.env.DATABASE_URL_INTERNAL || process.env.DATABASE_URL_EXTERNAL;

console.log("[DB] usando connectionString:", connStr?.slice(0, 35) + "...");

const pool = new Pool({
  connectionString: connStr,
  ssl: { rejectUnauthorized: false },
});

export default pool;

// import pkg from "pg";
// const { Pool } = pkg;

// const pool = new Pool({
//   connectionString:
//     process.env.DATABASE_URL_INTERNAL || process.env.DATABASE_URL_EXTERNAL,
//   ssl:
//     process.env.NODE_ENV === "production"
//       ? { rejectUnauthorized: false }
//       : false,
// });

// export default pool;
