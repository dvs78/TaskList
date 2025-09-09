// import "dotenv/config";
// import pkg from "pg";
// const { Pool } = pkg;

// const connStr =
//   process.env.DATABASE_URL_INTERNAL || process.env.DATABASE_URL_EXTERNAL;

// console.log("[DB] usando connectionString:", connStr?.slice(0, 35) + "...");

// const pool = new Pool({
//   connectionString: connStr,
//   ssl: { rejectUnauthorized: false },
// });

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
