import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddTask = () => {
  return (
    <>
      <div className="task__add">
        <input
          className="input__new-task"
          type="text"
          name="input__new-task"
          // value={newTask}
          // onChange={(e) => setNewTask(e.target.value)}
          placeholder="Digite a nova tarefa"
        />
        <button className="btn__add">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  );
};

export default AddTask;
