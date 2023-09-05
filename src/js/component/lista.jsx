import React, { useState, useEffect } from "react";

let apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/alexander";

export const Notes = () => {
  const [addTodolist, setAddTodolist] = useState("");
  const [todoList, setTodolist] = useState([]);
  const [tareasPendientes, settareasPendientes] = useState("");

  const handleList = async (e) => {
    if (e.key === "Enter" && addTodolist != "") {
      let newTask = [...todoList, { label: e.target.value, done: false }];
      const response = await fetch(apiUrl, {
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAddTodolist("");
      if (response.ok) {
        getTodoList();
      }
    }
  };

  const deleteTask = (position) => {
    let newTasks = todoList.filter((task, index) => index != position);
    setTodolist(newTasks);
  };

  //POST - create User
  const createUser = async () => {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      getTodoList();
    }
  };

  // GET - get Todolist from User
  const getTodoList = async () => {
    const response = await fetch(apiUrl);
    if (response.status == 404) {
      createUser();
    }
    if (response.ok) {
      const body = await response.json();
      console.log(body);
      setTodolist(body);
    }
  };
  // DELETE - deletes user with all tasks
  const deleteAll = async () => {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const body = await response.json();
      console.log(body);
      createUser(body);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="list-body">
      <div className="lista">
        <input
          id="input_1"
          onChange={(e) => setAddTodolist(e.target.value)}
          onKeyDown={(e) => handleList(e)}
          type="text"
          placeholder="What need to be done?"
          value={addTodolist}
        />

        <div className="row">
          {todoList.map((todolist, index) => {
            return (
              <div className="Task" key={index}>
                <span>{todolist.label}</span>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => {
                    deleteTask(index);
                  }}
                ></button>
              </div>
            );
          })}
        </div>

        <div className="contador">
          <>{tareasPendientes != "" ? "tareas por realizar" : ""}</>
          {tareasPendientes}
        </div>
        <button
          onClick={() => {
            deleteAll();
          }}
        >
          borrador
        </button>
      </div>
    </div>
  );
};
