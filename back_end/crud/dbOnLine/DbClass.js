import pool from "./db.js";

class DbClass {
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
}

export default DbClass;
