import React from "react";
import EditTodo from "./EditTodo";

export default function TodoLayout({ todo, id, deleteHandler,isChecked }) {
  return (
    <div className="todo-container">
      <input type="checkbox" />
      <h3 className={isChecked ? "completed-text":"normal-text"}>{todo}</h3>
      <button onClick={() => deleteHandler(id)}>Delete</button>
      <EditTodo todo={todo} id={id} />
    </div>
  );
}
