import React from "react";
import EditTodo from "./EditTodo";
import { BiTrash } from "react-icons/bi";

export default function TodoLayout({ todo, id, deleteHandler, isChecked }) {
  return (
    <div className="todo-container">
      <input type="checkbox" />
      <h3 className={isChecked ? "completed-text" : "normal-text"}>{todo}</h3>
      <div>
        <button
          className="del-button"
          onClick={() => {
            deleteHandler(id);
          }}
        >
          <BiTrash size={24} />
        </button>
      </div>
      <EditTodo todo={todo} id={id} />
    </div>
  );
}
