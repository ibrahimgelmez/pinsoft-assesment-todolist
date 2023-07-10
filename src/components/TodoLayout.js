import { useEffect, useState } from "react";
import EditTodo from "./EditTodo";

//firebase
import { doc,updateDoc } from "firebase/firestore";
import { db } from "../services/firebase.config";

//icons
import { BiTrash } from "react-icons/bi";
import { BsCheckCircle, BsCheckCircleFill } from "react-icons/bs";

export default function TodoLayout({
  todo,
  id,
  deleteHandler,
  isChecked,
  darkMode
}) {
  const [isCompleted, setIsCompleted] = useState(isChecked);

  useEffect(() => {

    try {
      const todoDocument = doc(db, "todos", id);
      updateDoc(todoDocument, {
        isChecked: isCompleted,
      });
      // await window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }, [isCompleted]);


  return (
    <div className={darkMode ? "todo-container":"todo-container-light"}>
      <button className="check" onClick={()=>setIsCompleted(prev => !prev)}>
        {isCompleted ? <BsCheckCircleFill size={22} /> : <BsCheckCircle size={22} />}
      </button>
      <h3 className={isCompleted ? "completed-text" : "normal-text"}>{todo}</h3>
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
