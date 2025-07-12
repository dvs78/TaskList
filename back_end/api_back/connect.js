// import pg from "pg";

// const pool = new pg.Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "Limao_10",
//   database: "TaskList_DB",
// });

// export default pool;
// import pg from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: { rejectUnauthorized: false },
// });

// export default pool;
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
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,

        // host: "localhost",
        // port: 5432,
        // user: "postgres",
        // password: "Limao_10",
        // database: "TaskList",
      }
);

console.log("🌐 Ambiente:", process.env.NODE_ENV);
console.log("🔗 Conectando com:", isProduction ? "Render/Remoto" : "Local");

export default pool;

// Esse código deu certo
// import path from "path";
// import { fileURLToPath } from "url";
// import dotenv from "dotenv";

// // Corrigir o caminho absoluto do .env
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ⚠️ Carrega o .env ANTES de qualquer uso do process.env
// dotenv.config({ path: path.resolve(__dirname, "../.env") });

// console.log("✔️ DB_USER:", process.env.DB_USER); // Agora vai funcionar

// import pg from "pg";

// console.log("🔐 Conectando com:", {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD ? "********" : "NÃO DEFINIDA",
// });

// const pool = new pg.Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
// });

// export default pool;

// const pool = new pg.Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
//   ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
// });

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

//  "postgresql://viveirolimeira_94ij_user:nZIDkx3o5NVVVs3fWEDpiSAjsBJYpmBz@dpg-d17k8evdiees7387e82g-a/viveirolimeira_94ij",
