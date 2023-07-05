import React, { useEffect, useState } from "react";
//firebase
import { doc, deleteDoc, addDoc, collection, getTodos } from "firebase/firestore";
import { db } from "../services/firebase.config";

const Todo = () => {
  const [createTodo, setCreateTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const collectionRef = collection(db, "todos");

  //fetching
  useEffect(() => {
      async function getTodos(){
        await getDocs(collectionRef).then((todo) => {
        let todosData = todo.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setTodos(todosData);
          })
      }
      getTodos();
  }, []);

  //create todo
  const addTodo = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collectionRef, {
        task: createTodo,
        isChecked: false,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteTodoHandler(id) {
    const todosRef = doc(db, "todos", id);
    await deleteDoc(todosRef);
    window.location.reload();
  }
  return (
    <div>
      {/* CREATE TODO */}
      {/* Modal açan button */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addTodo"
      >
        Add Todo
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="addTodo"
        tabIndex="-1"
        aria-labelledby="addTodoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form onSubmit={addTodo} className="d-flex">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addTodoLabel">
                  Add Todo
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add a todo"
                  onChange={(e) => setCreateTodo(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add todo
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* CREATE TODO */}

      {/* <button onClick={()=> deleteTodoHandler('databaseden veri çekilme fonksiyonu bittiğinde buraya id gelecek')}>
        Delete DB
      </button> */}
    </div>
  );
};

export default Todo;
