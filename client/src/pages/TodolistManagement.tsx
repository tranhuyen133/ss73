import React, { useEffect, useState } from 'react';
import "./todoListManagement.css";
import { useDispatch, useSelector } from 'react-redux';
import { checkTodo, getTodo, addTodo, deleteTodo, editTodo } from '../stores/reducers/todolistTodolist';

export default function TodolistManagement() {
  const [newTask, setNewTask] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<string>("All");
  const [editId, setEditId] = useState<number | null>(null);
  const [editTaskName, setEditTaskName] = useState<string>("");
  const stateTodo: any = useSelector((state: any) => state.todo.todo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodo());
  }, [dispatch]);

  const handleCheck = (id: number) => {
    dispatch(checkTodo(id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === "") {
      setError("Task name cannot be empty.");
      return;
    }
    dispatch(addTodo({ id: Date.now(), name: newTask, completed: false }));
    setNewTask("");
    setError(null);
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      dispatch(deleteTodo(id));
    }
  };

  const handleEdit = (id: number, name: string) => {
    setEditId(id);
    setEditTaskName(name);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editTaskName.trim() === "") {
      setError("Task name cannot be empty.");
      return;
    }
    if (editId !== null) {
      dispatch(editTodo({ id: editId, name: editTaskName }));
      setEditId(null);
      setEditTaskName("");
      setError(null);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTaskName("");
    setError(null);
  };

  const filteredTodos = stateTodo.filter((todo: any) => {
    if (currentView === "All") return true;
    if (currentView === "Active") return !todo.completed;
    if (currentView === "Completed") return todo.completed;
    return true;
  });

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={handleAddTask}>
                  <div data-mdb-input-init="" className="form-outline flex-fill">
                    <input type="text" id="form2" className="form-control" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                    <label className="form-label" htmlFor="form2">
                      New task...
                    </label>
                  </div>
                  <button type="submit" data-mdb-button-init="" data-mdb-ripple-init="" className="btn btn-info ms-2">
                    Add
                  </button>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}
                {/* Tabs navs */}
                <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${currentView === "All" ? "active" : ""}`}
                      id="ex1-tab-1"
                      data-mdb-tab-init=""
                      href="#ex1-tabs-1"
                      role="tab"
                      aria-controls="ex1-tabs-1"
                      aria-selected={currentView === "All"}
                      onClick={() => setCurrentView("All")}
                    >
                      All
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${currentView === "Active" ? "active" : ""}`}
                      id="ex1-tab-2"
                      data-mdb-tab-init=""
                      href="#ex1-tabs-2"
                      role="tab"
                      aria-controls="ex1-tabs-2"
                      aria-selected={currentView === "Active"}
                      onClick={() => setCurrentView("Active")}
                    >
                      Active
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${currentView === "Completed" ? "active" : ""}`}
                      id="ex1-tab-3"
                      data-mdb-tab-init=""
                      href="#ex1-tabs-3"
                      role="tab"
                      aria-controls="ex1-tabs-3"
                      aria-selected={currentView === "Completed"}
                      onClick={() => setCurrentView("Completed")}
                    >
                      Completed
                    </a>
                  </li>
                </ul>
                {/* Tabs navs */}
                {/* Tabs content */}
                <ul className="list-group">
                  {filteredTodos.map((item: any) => (
                    <li key={item.id} className="list-group-item d-flex align-items-center border-0 mb-2 rounded" style={{ backgroundColor: "#f4f6f7" }}>
                      <input className="form-check-input me-2" type="checkbox" aria-label="..." onChange={() => handleCheck(item.id)} checked={item.completed} />
                      {editId === item.id ? (
                        <form onSubmit={handleEditSubmit} className="d-flex align-items-center w-100">
                          <input
                            type="text"
                            value={editTaskName}
                            onChange={(e) => setEditTaskName(e.target.value)}
                            className="form-control me-2"
                          />
                          <button type="submit" className="btn btn-success me-2">Save</button>
                          <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                        </form>
                      ) : (
                        <>
                          {item.completed ? <s>{item.name}</s> : <span>{item.name}</span>}
                          <button onClick={() => handleEdit(item.id, item.name)} className="btn btn-warning ms-2">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="btn btn-danger ms-2">Delete</button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                {/* Tabs content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
