import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Item } from "../../Interface/Item"

export const TodoList: React.FC = () => {
  const [todo, setTodo] = useState<Item[]>([
    { id: 1, title: 'Learn TypeScript', completed: false },
    { id: 2, title: 'Learn React', description: 'need to do some labs on openclassroom', completed: false }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");


  const handleCheckboxChange = (id: number) => {
    const updatedTodo = todo.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed }; 
      }
      return item;
    });

    const sortedTodo = updatedTodo.sort((a, b) => (a.completed ? 1 : b.completed ? -1 : 0));

    setTodo(sortedTodo);
  };

  const TaskDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const taskId = id ? parseInt(id, 10) : -1;
    const task = todo.find((item) => item.id === taskId);
    
    if (!task) {
      return <div>Task not found</div>;
    }

    return (
      <div className="task-element">
        <h2>Task {task.id} : {task.title}</h2>
        {task.description && <p>{task.description}</p>}
      </div>
    );
  };

  const handleAddTask = (newTitle: string) => {
    if (newTitle.trim() === "") {
      alert("Task title is needeed.");
      return;
    }

    const newTask: Item = {
      id: todo.length + 1,
      title: newTitle,
      description: newTaskDescription,
      completed: false,
    };

    const updatedTodo = [newTask, ...todo];

    setTodo(updatedTodo);
    setNewTaskTitle(""); 
    setNewTaskDescription(""); 
  };


  return (
    <Router>
      <div className="main-container">
        <h1>TodoList</h1>
        <div className="input-container">
        <input type="text" id="taskTitle" placeholder="Enter task" value={ newTaskTitle } onChange={(e) => setNewTaskTitle(e.target.value)}/>
        <input type="text" placeholder="Enter description" value={ newTaskDescription } onChange={(e) => setNewTaskDescription(e.target.value)}/>
          <button id="btn" onClick={() => {
              const newTitle = (document.getElementById("taskTitle") as HTMLInputElement).value;
              handleAddTask(newTitle);}}>
                Add
          </button>
        </div>
        <ul>
          {todo.map((todos) => (
            <li key={todos.id} className={todos.completed ? "completed" : ""}>
              <Link to={`/tasks/${todos.id}`}>{todos.title}</Link>
              <input
                type="checkbox"
                checked={todos.completed}
                onChange={() => handleCheckboxChange(todos.id)}
              />
            </li>
          ))}
        </ul>
      </div>
      <Routes>
        <Route path="/tasks/:id" Component={TaskDetail} />
      </Routes>
    </Router>
  );
};