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

console.log((await pool.query("SELECT * FROM login")).rows);

export default pool;

// import dotenv from "dotenv";
// import pg from "pg";

// dotenv.config();

// const isProduction = process.env.NODE_ENV === "production";

// // psql "postgres:Limao_10@localhost:5432/ViveiroLimeira" --set=sslmode=require

// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: isProduction ? { rejectUnauthorized: false } : false,
// });

// pool
//   .connect()
//   .then(() => console.log("✅ Conectado ao PostgreSQL"))
//   .catch((err) => console.error("❌ Erro ao conectar ao PostgreSQL:", err));

// export default pool;
