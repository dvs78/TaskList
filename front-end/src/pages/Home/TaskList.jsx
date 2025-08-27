import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

const TaskList = () => {
  return (
    <div className="task__list">
      <p>tarefa</p>
      <div className="btn__task">
        <button className="btn__edit">
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button className="btn__remove">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default TaskList;
