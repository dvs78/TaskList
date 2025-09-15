import pool from "../connect.js";

async function main() {
  const nome = "Serginho";
  const senha = "0003";

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
