import pool from "../../connect.js";

class DbClass {
  // Buscar tudo
  async getAll(tableName, columnsArray = ["*"]) {
    try {
      const columns = columnsArray.map((col) => `"${col}"`).join(", ");
      const query = `SELECT ${columns} FROM "${tableName}"`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error("Erro ao buscar dados:", error.message);
      throw error;
    }
  }

  // Deletar por ID
  async deleteById(tabela, id) {
    try {
      const queryText = `DELETE FROM ${tabela} WHERE id = $1`;
      await pool.query(queryText, [id]);
    } catch (error) {
      throw error;
    }
  }

  // Inserir
  async insert(tabela, dados) {
    try {
      const colunas = Object.keys(dados);
      const valores = Object.values(dados);

      const placeholders = colunas.map((_, i) => `$${i + 1}`).join(", ");
      const colunasFormatadas = colunas.map((col) => `"${col}"`).join(", ");

      const query = `INSERT INTO "${tabela}" (${colunasFormatadas}) VALUES (${placeholders}) RETURNING *`;

      const result = await pool.query(query, valores);
      return result.rows[0]; // Retorna o registro inserido
    } catch (error) {
      console.error("Erro ao inserir tarefa:", error.message);
      throw error;
    }
  }

  // Editar
  async updateById(tabela, id, data) {
    const colunas = Object.keys(data);
    const valores = Object.values(data);

    if (colunas.length === 0) throw new Error("Nenhum campo para atualizar");

    const setClause = colunas
      .map((col, i) => `"${col}" = $${i + 1}`)
      .join(", ");

    const query = `UPDATE "${tabela}" SET ${setClause} WHERE id = $${
      colunas.length + 1
    } RETURNING *`;

    const { rows } = await pool.query(query, [...valores, id]);
    return rows[0];
  }
}

export default DbClass;
