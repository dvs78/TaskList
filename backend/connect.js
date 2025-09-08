import pg from "pg";
import "dotenv/config";

// Acessar o BANCO DADOS
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// console.log((await pool.query("SELECT * FROM login")).rows);

export default pool;
