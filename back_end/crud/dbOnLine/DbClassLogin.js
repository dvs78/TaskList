import DbClass from "./DbClass.js";

class DbClassLogin extends DbClass {
  // Pegar todos usuários
  async getAll() {
    try {
      return await super.getAll("login", ["id", "senha", "nome"]);
    } catch (error) {
      throw error;
    }
  }
}

export default DbClassLogin;
