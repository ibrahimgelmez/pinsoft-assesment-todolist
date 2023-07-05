import React from "react";

//firebase
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../services/firebase.config'

const Todo = () => {

  async function deleteTodoHandler(id) {
    const todosRef = doc(db, "todos", id )
    await deleteDoc(todosRef);
    window.location.reload();
  }
  return (
    <div>
      {/* <button onClick={()=> deleteTodoHandler('databaseden veri çekilme fonksiyonu bittiğinde buraya id gelecek')}>
        Delete DB
      </button> */}
    </div>
  );
};

export default Todo;
