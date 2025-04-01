import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskForm from "./components/TaskForm.js";
import TaskList from "./components/TaskList.js";
import DarkModeToggle from "./components/DarkModeToggle.js";
import "./App.css"; // Keep this for custom dark mode styles

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Pending") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "dueDate") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-vh-100 ${darkMode ? "dark" : "bg-light"}`}>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-6 fw-bold">Task Management App</h1>
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>

          {/* Task Form */}
          <TaskForm addTask={addTask} />

          {/* Filter and Sort Controls */}
          <div className="row mb-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <label htmlFor="filter" className="form-label">
                Filter:
              </label>
              <select style={{marginTop:'10px'}}
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="form-select"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="sortBy" className="form-label">
                Sort By:
              </label>
              <select style={{marginTop:'10px'}}
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>

          {/* Task List */}
          <TaskList
            tasks={sortedTasks}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
            editTask={editTask}
            moveTask={moveTask}
          />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;