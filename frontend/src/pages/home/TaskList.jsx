import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPencil,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons"; // ⬅️ novo
import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal.jsx";
import { notificar } from "../../components/Toast.jsx";

const TaskList = ({ userId, reload }) => {
  const [tarefas, setTarefas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [draftText, setDraftText] = useState("");
  const [savingId, setSavingId] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    (async () => {
      // const { data } = await axios.get("/api/task");
      const { data } = await axios.get("task");
      setTarefas(data.filter((t) => t.usuario_id === userId));
    })();
  }, [userId, reload]);

  const startEdit = (task) => {
    setEditingId(task.id);
    setDraftText(task.tarefa ?? "");
    notificar("info", "Editando tarefa…");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraftText("");
    notificar("alerta", "Edição cancelada.");
  };

  const saveEdit = async (task) => {
    const novo = draftText.trim();
    if (!novo) {
      notificar("alerta", "O texto da tarefa não pode ficar vazio.");
      return;
    }
    try {
      setSavingId(task.id);
      const id = task.id;
      setTarefas((list) =>
        list.map((t) => (t.id === id ? { ...t, tarefa: novo } : t))
      );
      // await axios.put(`/api/task/${id}`, { tarefa: novo });
      await axios.put(`task/${id}`, { tarefa: novo });
      setEditingId(null);
      setDraftText("");
      notificar("sucesso", "Tarefa atualizada com sucesso!");
    } catch (err) {
      // const { data } = await axios.get("/api/task");
      const { data } = await axios.get("task");
      setTarefas(data.filter((t) => t.usuario_id === userId));
      notificar("erro", "Falha ao atualizar a tarefa.");
    } finally {
      setSavingId(null);
    }
  };

  const askDelete = (task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };
  const cancelDelete = () => {
    setConfirmOpen(false);
    setTaskToDelete(null);
    notificar("info", "Exclusão cancelada.");
  };
  const confirmDelete = async () => {
    if (!taskToDelete) return;
    try {
      setDeleting(true);
      const id = taskToDelete.id;
      setTarefas((list) => list.filter((t) => t.id !== id));
      // await axios.delete(`/api/task/${id}`);
      await axios.delete(`task/${id}`);
      notificar("sucesso", "Tarefa excluída.");
    } catch (err) {
      // const { data } = await axios.get("/api/task");
      const { data } = await axios.get("task");
      setTarefas(data.filter((t) => t.usuario_id === userId));
      notificar("erro", "Não foi possível excluir a tarefa.");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  const onEditKeyDown = (e, task) => {
    if (e.key === "Enter") saveEdit(task);
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <>
      <div className="task__list">
        {tarefas.map((t) => {
          const isEditing = editingId === t.id;
          return (
            <div className="task__list-item" key={t.id}>
              {!isEditing ? (
                <p>{t.tarefa}</p>
              ) : (
                <input
                  className="task__input-edit"
                  value={draftText}
                  onChange={(e) => setDraftText(e.target.value)}
                  onKeyDown={(e) => onEditKeyDown(e, t)}
                  autoFocus
                />
              )}

              <div className="btn__task">
                {!isEditing ? (
                  <button
                    className="btn__edit"
                    onClick={() => startEdit(t)}
                    title="Editar"
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </button>
                ) : (
                  <>
                    <button
                      className="btn__save"
                      onClick={() => saveEdit(t)}
                      disabled={savingId === t.id}
                      title="Salvar"
                    >
                      <FontAwesomeIcon icon={faCircleCheck} /> {/* ⬅️ aqui */}
                      {/* <FontAwesomeIcon icon={faCheck} /> */}
                    </button>
                    <button
                      className="btn__cancel"
                      onClick={cancelEdit}
                      title="Cancelar"
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                      {/* <FontAwesomeIcon icon={faXmark} /> */}
                    </button>
                  </>
                )}

                {/* ⬇️ Oculta a lixeira durante a edição, mantendo o espaço */}
                <button
                  className={`btn__remove ${
                    isEditing ? "btn__remove--hidden" : ""
                  }`}
                  onClick={() => askDelete(t)}
                  title="Excluir"
                  disabled={savingId === t.id}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Excluir tarefa"
        message={`"${taskToDelete?.tarefa}"?`}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleting}
        danger
      />
    </>
  );
};

export default TaskList;
