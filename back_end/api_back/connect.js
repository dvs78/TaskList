import pg from "pg";
import dotenv from "dotenv";

const isProduction = process.env.NODE_ENV === "production";

const pool = new pg.Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: "localhost",
        port: 5432,
        user: "postgres",
        password: "Limao_10",
        database: "TaskList",
      }
);

console.log("🌐 Ambiente:", process.env.NODE_ENV);
console.log("🔗 Conectando com:", isProduction ? "Render/Remoto" : "Local");

export default pool;
