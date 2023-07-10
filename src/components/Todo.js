import React, { useEffect, useState } from "react";
//firebase
import {
  doc,
  deleteDoc,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../services/firebase.config";
import TodoLayout from "./TodoLayout";
import { Button, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {BsFillMoonFill , BsFillSunFill} from 'react-icons/bs'

import { signOut } from "firebase/auth";

const Todo = ({darkMode , setDarkMode}) => {
  const [createTodo, setCreateTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const collectionRef = collection(db, "todos");

  const [todoLoading,setTodoLoading] = useState()



  const navigation = useNavigate();

  //fetching
  useEffect(() => {
    async function getTodos() {
      await getDocs(collectionRef)
        .then((todo) => {
          let filteredTodos = todo.docs.filter(
            (todo) => todo.data().uid === auth.currentUser.uid
          );
          console.log(filteredTodos);
          let todosData = filteredTodos.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          const sortedTodosData = todosData.sort((a, b) => {
            return b.createdAt - a.createdAt;
          });
          setTodos(sortedTodosData);
        })
        .catch(() => {
          if (
            window.confirm(
              "You must be logged in to access your todos.Do you want to go to login section?"
            )
          ) {
            window.location.href = "/";
          }
        });
    }
    getTodos();
  }, []);

  //create todo
  const addTodo = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collectionRef, {
        todo: createTodo,
        isChecked: false,
        createdAt: serverTimestamp(),
        uid: auth.currentUser.uid,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //log out
  function logOutHandler() {
    signOut(auth)
      .then(() => navigation("/"))
      .catch((err) => {
        alert(err);
      });
  }

  async function deleteTodoHandler(id) {
    const todosRef = doc(db, "todos", id);
    await deleteDoc(todosRef);
    window.location.reload();
  }

  // //update Checked
  // const updateChecked = async (e, id , isCompleted) => {
  //   e.preventDefault()
  //   try {
  //     const todoDocument = doc(db, "todos", id);
  //     await updateDoc(todoDocument, {
  //       isChecked: isCompleted,
  //     });
  //     // await window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  console.log(auth.currentUser);


  if (todos.length === 0) {
    return (
      <div className="loading-container">
        {/* CREATE TODO */}
        {/* Modal açan button */}
        <div className="add-button-container">
          <button
            type="button"
            className=" addtodo-button btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addTodo"
          >
            + Add Todo
          </button>
        </div>

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
        <h1 className="loading-screen">Loading Todos</h1>
      </div>
    );
  }

  return (
    <div className={darkMode ? "todo-app" : "todo-app-light"}>
      <div className="dark-mode">
        <BsFillSunFill color={darkMode ? "yellow":"white"} size={22} />
        <Switch onClick={() => setDarkMode((prev) => !prev)} value={darkMode} />
        <BsFillMoonFill color={darkMode ? 'white':'black'} size={18} />
      </div>
      {/* CREATE TODO */}
      {/* Modal açan button */}
      <div className="add-button-container">
        <button
          type="button"
          className={darkMode ? "addtodo-button btn btn-primary":"addtodo-button btn btn-info border-1 border-white "}
          data-bs-toggle="modal"
          data-bs-target="#addTodo"
        >
          + Add Todo
        </button>
      </div>

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

      {todos.map((todo) => (
        <TodoLayout
          todo={todo.todo}
          id={todo.id}
          isChecked={todo.isChecked}
          deleteHandler={deleteTodoHandler}
          key={todo.id}
          darkMode={darkMode}
        />
      ))}
      <div className="logout-container">
        <Button
          variant={darkMode ? "outlined":"contained"}
          color="error"
          className="log-out"
          onClick={() => logOutHandler()}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Todo;
