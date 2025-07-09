// import pg from "pg";

// const pool = new pg.Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

// export default pool;

// console.log((await pool.query("SELECT * FROM login")).rows);

// import pg from "pg";

// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export default pool;

// import pg from "pg";
// import dotenv from "dotenv";

// if (process.env.NODE_ENV !== "production") {
//   dotenv.config(); // só carrega o .env local se não estiver em produção
// }

// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export default pool;
