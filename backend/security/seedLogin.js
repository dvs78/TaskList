import pool from "../connect.js";

async function main() {
  const nome = "Daniel";
  const senha = "0000";

  try {
    const sql = `
      INSERT INTO public.login (nome, senha)
      VALUES ($1, $2)
      ON CONFLICT (nome)
      DO UPDATE SET senha = EXCLUDED.senha
      RETURNING id, nome;
    `;
    const { rows } = await pool.query(sql, [nome, senha]);
    console.log("[seedLogin] Usuário inserido/atualizado ->", rows[0]);
  } catch (err) {
    console.error("[seedLogin] ERRO:", err.message);
    process.exit(1);
  } finally {
    pool.end();
  }
}

main();

// Rodar no Render, em Start Command: cd backend && npm run seed:login && npm run start
