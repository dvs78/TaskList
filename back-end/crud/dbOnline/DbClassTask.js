import DbClass from "./DbClass.js";

class DbClassTask extends DbClass {
  // Pegar todas as tarefas
  async getAll() {
    try {
      return await super.getAll("tarefas", ["id", "usuario_id", "tarefa"]);
    } catch (error) {
      throw error;
    }
  }

  // Inserir tarefa
  async insert(dados) {
    try {
      // Validação mínima (opcional)
      if (!dados.usuario_id || !dados.tarefa) {
        throw new Error("Campos obrigatórios: usuario_id e tarefa");
      }

      const newtask = await super.insert("tarefas", dados);
      return newtask;
    } catch (error) {
      console.error("Erro ao inserir tarefa no banco:", error.message);
      throw error;
    }
  }
}

export default DbClassTask;
